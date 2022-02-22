import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}

  private dataSource = new BehaviorSubject<any>({});
  latestData = this.dataSource.asObservable();

  changedData(data: any) {
    this.dataSource.next(data);
  }
}
