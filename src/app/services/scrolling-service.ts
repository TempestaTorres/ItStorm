import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollingService {
  scrollingStarted: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    document.addEventListener('scroll', () => {
      this.keepTrack();
    });
  }

  private keepTrack(): void {

    let start: boolean = window.scrollY >= window.innerHeight / 2;
    this.scrollingStarted.next(start);
  }

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
  public toTopSmooth(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
  public toTarget(target: HTMLElement): void {

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
