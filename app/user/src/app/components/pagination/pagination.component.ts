import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectChores } from 'src/app/store/selectors/chores.selectors';
import * as ChoresActions from '../../store/actions/chores.actions'
import { Observable, map } from 'rxjs';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',

})
export class PaginationComponent {
  readonly paginationData: any;
  readonly currentPage$: Observable<number>;
  readonly take$: Observable<number>;
  readonly pageCountArr$: Observable<number[]>;
  readonly count$: Observable<number>;
  constructor( private store: Store
    ){
      this.store.dispatch(ChoresActions.loadChores())
      const paginationData = this.store.select(selectChores)
      this.currentPage$ = paginationData.pipe(map(x => x.page))
      this.take$ = paginationData.pipe(map(x => x.take))
      this.count$ = paginationData.pipe(map(x => x.count))
      this.pageCountArr$ = paginationData.pipe(
        map(data => Array.from({ length: Math.ceil(data.count / data.take) }, (_, index) => index + 1))
      );  }
  ngOnInit(){
    this.loadChores()
  }

  loadChores(){
    this.store.dispatch(ChoresActions.loadChores())
  }





}
