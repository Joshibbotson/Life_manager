import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ilinks, LinksService } from 'src/app/services/links/links.service';
import { ChoresRestService } from 'src/app/services/rest/chores-rest.service';
import { selectChores } from 'src/app/store/selectors/chores.selectors';
import { IChore } from '../../../../../../../api/dist/chores';
import * as ChoresActions from '../../../../store/actions/chores.actions'
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-chores',
  templateUrl: './chores.component.html',
})
export class ChoresComponent {
  public loading = true;
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }];
  readonly nameControlGroup: FormControl = new FormControl('');
  readonly descriptionControlGroup: FormControl = new FormControl('');
  readonly createdByControlGroup: FormControl = new FormControl('');
  readonly assignedToControlGroup: FormControl = new FormControl('');
  readonly completedControlGroup: FormControl<boolean | null> = new FormControl(
    false
  );
  readonly choreFormGroup: FormGroup = new FormGroup({
    name: this.nameControlGroup,
    description: this.descriptionControlGroup,
    createdBy: this.createdByControlGroup,
    assignedTo: this.assignedToControlGroup,
    completed: this.completedControlGroup,
  });
  public showForm: boolean = false;
  public  chores$;

  constructor(
    private rest: ChoresRestService,
    private links: LinksService,
    private router: Router,
    private store: Store
  ) {
    this.chores$ = this.store.select(selectChores)
  }

  ngOnInit(){
    this.links.updateLinks(this.homeLinks);
    this.loadChores()

  }

  loadChores(){
    this.store.dispatch(ChoresActions.loadChores())
    this.loading = false;
  }

  createChore(chore: IChore){
    this.store.dispatch(ChoresActions.createChore({ chore }))
  }

  toggleShowForm() {
    this.showForm = !this.showForm;
    console.log(this.showForm);
  }
  navigate(id: number) {
    this.router.navigate([`chores/${id}`]);
  }

  async handleSubmit() {
    this.choreFormGroup.patchValue({
      completed: this.choreFormGroup.value.completed === 'true' ? true : false,
    });
    try {
      (await this.rest.create(this.choreFormGroup.value)).subscribe(() =>
      console.log("reloaded")
        )
        this.toggleShowForm()
    
    } catch (error) {
      console.log(error);
    }
  }
}
