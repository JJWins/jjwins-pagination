import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'jjwins-pagination',
  template: `
    <div class="pagination">
      <div>
        <a
          style="font-size: 16px !important; padding-top:6px !important;"
          [ngClass]="{ disabled: disablePrev }"
          (click)="getPageNumber(pageNumber - 1)"
          title="Previous"
          >&laquo;</a
        >
        <a (click)="getPageNumber(1)" [ngClass]="{ active: disablePrev }">1</a>
        <a *ngIf="showStartDots" class="disabled">...</a>
        <a
          [ngClass]="{ active: number == pageNumber }"
          *ngFor="let number of selectivePages"
          (click)="getPageNumber(number)"
          >{{ number }}</a
        >
        <a *ngIf="showEndDots" class="disabled">...</a>
        <a
          (click)="getPageNumber(arrayLength)"
          [ngClass]="{ active: disableNext }"
          >{{ arrayLength }}</a
        >
        <a
          style="font-size: 16px !important; padding-top:6px !important;"
          [ngClass]="{ disabled: disableNext }"
          (click)="getPageNumber(pageNumber + 1)"
          title="Next"
          >&raquo;</a
        >
      </div>
    </div>
  `,
  styles: [
    `
      .pagination {
        display: block;
      }
      .pagination a {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px !important;
        color: #105591;
        padding: 9px 13px;
        /* margin-left: -1px; */
        /* border: 0.5px solid #dddddd; */
        text-decoration: none;
        font-size: 12px;
        background-color: white;
        cursor: pointer;
      }
      .pagination a.active {
        background-color: #1e90ff;
        color: white;
        border-radius: 4px;
      }
      .pagination a:hover:not(.active) {
        background-color: #d4d5d2;
        border-radius: 4px;
      }
      .previous {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        padding: 10px 14px !important;
        font-size: 16px !important;
      }
      .next {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 10px 14px !important;
        font-size: 16px !important;
      }
      .disabled {
        pointer-events: none;
        cursor: default;
        color: #84757d !important;
      }
    `,
  ],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() data: any;
  @Input() displayData = { totalDataCount: 0, itemsPerPage: 0 };
  numberOfPagesArray: any = [];
  selectivePages: any = [];
  arrayLength = 0;
  pageNumber: any;
  latestData: any;
  disablePrev = true;
  disableNext = false;
  trimmedData: any;
  showStartDots = false;
  showEndDots = true;

  constructor(private paginationService: PaginationService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.pagination(
      this.displayData.totalDataCount,
      this.displayData.itemsPerPage
    );
  }

  pagination(dataCount: any, itemsPerPage: any) {
    let count = dataCount / itemsPerPage;
    let remainder = dataCount % itemsPerPage;
    let numberOfPages = 0;
    let numberOfPagesArray = [];
    // Calculating the total number of pages required to display all the data
    remainder > 0
      ? (numberOfPages = Math.floor(count) + 1)
      : (numberOfPages = Math.floor(count));
    for (let i = 1; i <= numberOfPages; i++) {
      numberOfPagesArray.push(i);
    }
    this.numberOfPagesArray = numberOfPagesArray;
    this.arrayLength = numberOfPagesArray.length; // Storing array length to new variable since the array gets reset
    this.getPageNumber(1);
  }

  getPageNumber(pageNumber: any) {
    // Disabling next and prev buttons
    this.pageNumber = pageNumber;
    if (this.arrayLength == 1) {
      this.disableNext = true;
      this.disablePrev = true;
    } else if (pageNumber == 1) {
      this.disablePrev = true;
      this.disableNext = false;
    } else if (pageNumber == this.arrayLength) {
      this.disableNext = true;
      this.disablePrev = false;
    } else {
      this.disablePrev = false;
      this.disableNext = false;
    }
    // Dynamic page number change
    if (pageNumber < 5) {
      this.showStartDots = false;
      this.showEndDots = true;
      this.selectivePages = this.numberOfPagesArray.slice(1, 7);
    } else if (pageNumber > this.arrayLength - 5) {
      this.showStartDots = true;
      this.showEndDots = false;
      this.selectivePages = this.numberOfPagesArray.slice(
        this.arrayLength - 6,
        this.arrayLength - 1
      );
    } else {
      this.showStartDots = true;
      this.showEndDots = true;
      this.selectivePages = this.numberOfPagesArray.slice(
        pageNumber - 3,
        pageNumber + 3
      );
    }
    this.onPageChange();
  }

  onPageChange() {
    let data = this.data;
    let itemsPerPage = this.displayData.itemsPerPage;
    let newData;
    if (this.data) {
      if (this.pageNumber == 1) {
        newData = data.slice(0, itemsPerPage);
      } else {
        newData = data.slice(
          itemsPerPage * (this.pageNumber - 1),
          itemsPerPage * this.pageNumber
        );
      }
    }
    this.paginationService.changedData(newData);
  }
}
