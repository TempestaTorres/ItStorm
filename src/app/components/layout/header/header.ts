import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MenuDropdown} from '../../menu-dropdown/menu-dropdown';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    MenuDropdown
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('header') header!: ElementRef;

  public loginStatus: boolean = false;
  private loginSubscription: Subscription | undefined;

  private headerBounds: any = {};
  private currentScrollTop: number = 0;
  private preventReveal: boolean = false;
  private isScrolling: number = 0;

  constructor( private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.loginSubscription = this.authService.loginStatus.subscribe(value => {
      this.loginStatus = value;
    });

    this.loginStatus = this.authService.isLoggedIn();
  }

  ngAfterViewInit() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    this.createObserver();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  private createObserver() {
    let observer = new IntersectionObserver((entries, observer) => {
      this.headerBounds = entries[0].intersectionRect;

      if (this.headerBounds.top === 0 && this.headerBounds.bottom === 0) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const boundingClientRect = entries[0].boundingClientRect;

        this.headerBounds = {
          top: scrollTop + boundingClientRect.top,
          bottom: scrollTop + boundingClientRect.bottom
        };
      }
      observer.disconnect();
    });

    observer.observe(this.header.nativeElement);
  }

  private onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      requestAnimationFrame(this.hide.bind(this));
    } else if (scrollTop < this.currentScrollTop && scrollTop > this.headerBounds.bottom) {
      if (!this.preventReveal) {
        requestAnimationFrame(this.reveal.bind(this));
      } else {
        window.clearTimeout(this.isScrolling);

        this.isScrolling = setTimeout(() => {
          this.preventReveal = false;
        }, 66);

        requestAnimationFrame(this.hide.bind(this));
      }
    } else if (scrollTop <= this.headerBounds.top) {
      requestAnimationFrame(this.reset.bind(this));
    }

    this.currentScrollTop = scrollTop;
  }

  private hide(): void {
    this.header.nativeElement.classList.add('it-storm-section-header-hidden', 'it-storm-section-header-sticky');
  }

  private reveal(): void {
    this.header.nativeElement.classList.add('it-storm-section-header-sticky', 'animate');
    this.header.nativeElement.classList.remove('it-storm-section-header-hidden');
  }

  reset() {
    this.header.nativeElement.classList.remove('it-storm-section-header-hidden', 'it-storm-section-header-sticky', 'animate');
  }

  public onLinkClick(id: string): void {

    this.router.navigate([''], { fragment: id }).then(() => {});

  }
}
