import { inject, Injectable, signal } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { filter, map, Observable } from 'rxjs';
import { FindAllWorkOrdersQuery, WorkOrder } from '../generated/graphql';


const UPDATE_STATUS = gql`
  mutation UpdateStatus($id: String!, $status: String!) {
    updateWorkOrderStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
const CREATE_WORK_ORDER = gql`
  mutation CreateWorkOrder($partId: String!, $quantity: Int!) {
    createWorkOrder(partId: $partId, quantity: $quantity) {
      id
      workOrderNumber
      status
      quantity
      part {
        description
      }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class WorkOrderService {
  private apollo = inject(Apollo);
  selectedOrder = signal<WorkOrder | null>(null);

  getWorkOrders(): Observable<WorkOrder[]> {
    return this.apollo
      .watchQuery<FindAllWorkOrdersQuery>({
        query: gql`
          query FindAllWorkOrders {
            findAllWorkOrders {
              id
              status
              part {
                description
              }
              quantity
              unitCount
              workOrderNumber
              units {
                id
                serialNumber
                currentStep
              }
            }
          }
        `,
      })
      .valueChanges.pipe(
        filter((result) => !!result.data),
        map((result) => (result.data?.findAllWorkOrders ?? []) as WorkOrder[]),
      );
  }

  createWorkOrder(partId: string, quantity: number) {
    return this.apollo.mutate({
      mutation: CREATE_WORK_ORDER,
      variables: { partId, quantity },
      refetchQueries: ['FindAllWorkOrders'],
    });
  }

  updateStatus(id: string, newStatus: string) {
    console.log('updating', id, newStatus);

    return this.apollo.mutate({
      mutation: UPDATE_STATUS,
      variables: { id, status: newStatus },
      refetchQueries: ['FindAllWorkOrders'],
    });
  }

  processScan(sn: string, woId: string, station: string, operatorId: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Scan(
          $sn: String!
          $woId: String!
          $step: String!
          $operatorId: String!
        ) {
          scanUnit(
            serialNumber: $sn
            workOrderId: $woId
            step: $step
            operatorId: $operatorId
          ) {
            id
            serialNumber
            currentStep
          }
        }
      `,
      variables: { sn, woId, step: station, operatorId },
      refetchQueries: ['FindAllWorkOrders'],
    });
  }

  setSelectedOrder(data: WorkOrder) {
    this.selectedOrder.update(() => data);
  }
}
