import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
const SCAN_UNIT = gql`
  mutation ScanUnit($sn: String!, $woId: String!, $step: String!, $opId: String!) {
    scanUnit(serialNumber: $sn, workOrderId: $woId, step: $step, operatorId: $opId) {
      id
      serialNumber
      currentStep
      # We ask for the WO count so the UI updates the progress bar
#      workOrder {
#        id
#        _count {
#          units
#        }
#      }
    }
  }
`;

@Injectable({ providedIn: 'root' })
export class UnitService {
  private apollo = inject(Apollo);
  scan(sn: string, woId: string, step: string, opId: string) {
    return this.apollo.mutate({
      mutation: SCAN_UNIT,
      variables: { sn, woId, step, opId },
      refetchQueries: ['FindAllWorkOrders'],
    });
  }
}
