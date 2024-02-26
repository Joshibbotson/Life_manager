import { Injectable, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService implements OnDestroy {
  private windowSizeSubject = new Subject<{ width: number; height: number }>()
  public windowSize = this.windowSizeSubject.asObservable()
  private resizeListener: () => void

  constructor() {
    this.emitWindowSize()

    this.resizeListener = () =>
      window.addEventListener('resize', this.onResize.bind(this))
    this.resizeListener()
  }

  private onResize(): void {
    this.emitWindowSize()
  }

  private emitWindowSize() {
    this.windowSizeSubject.next({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this))
    this.windowSizeSubject.complete()
  }
}
