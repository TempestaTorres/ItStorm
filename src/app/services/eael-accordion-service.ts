import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EaelAccordionService {

  private isClosing: boolean = false;
  private isExpanding: boolean = false;
  private animation!: Animation | null;

  public onAccordionItemClick(item: HTMLElement ,header: HTMLElement, content: HTMLElement): boolean {

    item.style.overflow = "hidden";

    if (this.isClosing || this.isExpanding) {
      return false;
    }

    if (!item.classList.contains('show-this')) {
      this.open(item, header,content);
      return true;
    } else {
      this.shrink(item, header, content);
      return false;
    }

  }

  private shrink(item: HTMLElement, header: HTMLElement,content: HTMLElement): void {
    this.isClosing = true;

    const startHeight = `${item.offsetHeight}px`;
    const endHeight = `${header.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = item.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 300,
        easing: "ease",
      }
    );

    this.animation.onfinish = (): void => {
      this.onAnimationFinish(false, item , header, content);
    };
    this.animation.oncancel = (): void => {
      this.isClosing = false;
    };
  }

  private open(item: HTMLElement, header: HTMLElement,content: HTMLElement): void {

    item.style.height = `${item.offsetHeight}px`;
    header.classList.add('active');
    content.classList.add('active');

    window.requestAnimationFrame(() => this.expand(item, header,content));
  }

  private expand(item: HTMLElement, header: HTMLElement, content: HTMLElement): void {

    this.isExpanding = true;

    const startHeight = `${item.offsetHeight}px`;
    const endHeight = `${item.offsetHeight + content.offsetHeight}px`;

    if (this.animation) {
      this.animation.cancel();
    }

    this.animation = item.animate(
      {
        height: [startHeight, endHeight],
      },
      {
        duration: 400,
        easing: "ease-out",
      }
    );

    this.animation.onfinish = () => this.onAnimationFinish(true, item, header, content);
    this.animation.oncancel = (): void => {
      this.isExpanding = false;
    };
  }

  private onAnimationFinish(open: boolean, item: HTMLElement, header: HTMLElement, content: HTMLElement): void {
    if (open) {
      item.classList.add('show-this');
    }
    else {
      item.classList.remove('show-this');
      header.classList.remove('active');
      content.classList.remove('active');
    }
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    item.style.height = item.style.overflow = "";
  }
}
