## JJWINS-PAGINATION

**Pagination** library for use with angular projects.

---

#### Requirements

NPM - Node Package Manager

---

#### Demo

Click [here](https://angular-ivy-biiccx.stackblitz.io) to see the demo application

Checkout the code [here](https://stackblitz.com/edit/angular-ivy-biiccx?)

---

#### Installation

`npm install jjwins-pagination`

---

#### Importing

Import **PaginationModule** from **jjwins-pagination** in your module.ts file and add **PaginationModule** to the import array of module.ts file

```
import { PaginationModule } from 'jjwins-pagination'


imports: [
  ...
  PaginationModule
  ...
]
```

---

#### Usage

To render the pagination in your application add _<jjwins-pagination></jjwins-pagination>_ pto your component.html file

_<jjwins-pagination></jjwins-pagination>_ will take 2 input data **_[data] & [displayData]_**

> file.component.html
> `<jjwins-pagination [data]="data" [displayData]="displayData"></jjwins-pagination> `

In your component.ts file add properties **_data_** and **_displayData_**
**Important!**

- **_data_** takes an array as value
- **_displayData_** takes an object with key:value **_{totalDataCount: number, itemsPerPage: number}_**
  - _totalDataCount_ refers to the total number of data present in the array
  - _itemsPerPage_ refers to the number of data to be displayed on one page
    > Note: Provide these values in the component.ts file

##### IMPORTANT - To get the trimmed data according to the number of data per page

Import **_PaginationService_** from **_jjwins-pagination_** and inject in the constructor.
Then subscribe to the **_latestdata_** of the pagination service after a timeout of 300 millisecond to receive the latest data.

> Note: The timeout is required to avoid data changes after rendering the virtual DOM

**- Then use the latest data received from the pagination service to render the table in the template**

```
import { PaginationService } from 'jjwins-pagination'

 ...

 latestData: any;

 constructor( private _pagination: PaginationService) { }

 ngOnInit() {

  setTimeOut(() => {
   this._pagination.latestData.subscribe((data) => {
     this.latestData = data;
   })
  }, 300)

 }

 ...

```

##### Alignment options

- To align the pagination use html _'align'_ attribute
  > `<jjwins-pagination [data]="data" [displayData]="displayData" align="center"></jjwins-pagination> `
  - By default the pagination is left aligned
  - It can be center or right aligned with values _'center'_ or _'right'_ in the align attribute
