import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface Ilinks {
  url: string
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  private linksData = new BehaviorSubject<Ilinks[]>([
    { url: '/', name: 'home' },
  ])
  constructor() {}

  getLinks() {
    return this.linksData.asObservable()
  }

  updateLinks(newLinks: Ilinks[]) {
    this.linksData.next(newLinks)
  }
}
