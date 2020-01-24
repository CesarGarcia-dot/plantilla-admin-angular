import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserItem {
  name: string;
  action: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserItem[] = [
  {id: 1, name: 'Hydrogen', action: '<button></button>'},
  {id: 2, name: 'Helium', action: '<button></button>'},
  {id: 3, name: 'Lithium', action: '<button></button>'},
  {id: 4, name: 'Beryllium', action: '<button></button>'},
  {id: 5, name: 'Boron', action: '<button></button>'},
  {id: 6, name: 'Carbon', action: '<button></button>'},
  {id: 7, name: 'Nitrogen', action: '<button></button>'},
  {id: 8, name: 'Oxygen', action: '<button></button>'},
  {id: 9, name: 'Fluorine', action: '<button></button>'},
  {id: 10, name: 'Neon', action: '<button></button>'},
  {id: 11, name: 'Sodium', action: '<button></button>'},
  {id: 12, name: 'Magnesium',action: '<button></button>'},
  {id: 13, name: 'Aluminum', action: '<button></button>'},
  {id: 14, name: 'Silicon', action: '<button></button>'},
  {id: 15, name: 'Phosphorus', action: '<button></button>'},
  {id: 16, name: 'Sulfur', action: '<button></button>'},
  {id: 17, name: 'Chlorine', action: '<button></button>'},
  {id: 18, name: 'Argon', action: '<button></button>'},
  {id: 19, name: 'Potassium', action: '<button></button>'},
  {id: 20, name: 'Calcium', action: '<button></button>'},
];

/**
 * Data source for the User view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserDataSource extends DataSource<UserItem> {
  data: UserItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
