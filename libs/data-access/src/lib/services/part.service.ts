import { inject, Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { filter, map, Observable } from 'rxjs';
import { Part } from '@mes/db';
import { GetPartsQuery } from '../generated/graphql';


@Injectable({providedIn: 'root'})
export class PartService {
  private apollo = inject(Apollo);

  getParts(): Observable<Part[]> {
    const query = gql`
      query GetParts {
        findAllParts {
          description
          partNumber
          id
        }
      }
    `;

    return this.apollo
      .watchQuery<GetPartsQuery>({
        query: query,
      })
      .valueChanges.pipe(
        filter((result) => !!result.data),
        map((result) => (result.data.findAllParts ?? []) as Part[]),
      );
  }
}
