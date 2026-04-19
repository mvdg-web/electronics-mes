import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

@Injectable() export class UserService {
  private apollo = inject(Apollo);


}
