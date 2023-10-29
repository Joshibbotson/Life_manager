import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ilinks, LinksService } from 'src/app/services/links/links.service';
import { ChoresRestService } from 'src/app/services/rest/chores-rest.service';

@Component({
  selector: 'app-chore',
  templateUrl: './chore.component.html',
})
export class ChoreComponent {
  public readonly chore$: any;
  public homeLinks: Ilinks[] = [{ url: '/chores', name: 'Chores' }];

  constructor(
    private rest: ChoresRestService,
    private activatedRoute: ActivatedRoute,
    private links: LinksService
  ) {
    this.chore$ = this.rest.readById(this.activatedRoute.snapshot.params['id']);
    this.links.updateLinks(this.homeLinks);
  }

  async deleteChore(id:number){
    console.log("called delete")
    try {
      (await this.rest.delete(id)).subscribe((x) =>
        console.log(x)
      );
    } catch (error) {
      console.log(error);
    }
  }
}
