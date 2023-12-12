import { Injectable, OnDestroy } from '@angular/core'
import { signal, WritableSignal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService implements OnDestroy {
  private resizeListener: () => void
  public windowSize: WritableSignal<{ width: number; height: number }>

  constructor() {
    // Initialize the signal with the current window size
    this.windowSize = signal({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Listen for window resize events and update the signal
    this.resizeListener = () =>
      window.addEventListener('resize', this.onResize.bind(this))
    this.resizeListener()
  }

  private onResize(): void {
    this.windowSize.set({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  ngOnDestroy() {
    // Remove the event listener to prevent memory leaks
    window.removeEventListener('resize', this.onResize.bind(this))
  }
}
