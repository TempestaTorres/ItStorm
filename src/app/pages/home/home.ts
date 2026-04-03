import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {SlickService} from '../../services/slick-service';
import {ModalService} from '../../modals/modal-service/modal-service';
import {RouterLink} from '@angular/router';
import {ArticleService} from '../../articles/article-service';
import {ArticleImage, ArticleType} from '../../articles/article-types';
import {Subscription} from 'rxjs';
// @ts-ignore
import {isArray} from '@angular/compiler-cli/src/ngtsc/annotations/common';
import {ReviewsSlider} from '../../components/reviews-slider/reviews-slider';
import {ScrollingService} from '../../services/scrolling-service';
import {requestTypes} from '../../requests/request-type';

@Component({
  selector: 'app-home',
  imports: [
    ModalService,
    RouterLink,
    ReviewsSlider,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {

  public serviceOpen: boolean = false;
  private slick: any;
  private articleSubscription: Subscription | undefined;

  public articles: ArticleType[] = [];
  public articleImgUrl: string = ArticleImage.path;


  constructor(private slickService: SlickService, private articleService: ArticleService,
              private scrollingService: ScrollingService) {
  }

  ngOnInit() {
    this.articleSubscription = this.articleService.getPopularArticles().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.articles = data;
        }
      },
      error: err => {
        console.log(err);
      }
    });
    this.scrollingService.toTop();
  }

  ngAfterViewInit(): void {
    this.slick = this.slickService.slickMount('MadJun-slider');
  }

  ngOnDestroy() {
    if (this.slick) {
      this.slickService.unslick(this.slick);
    }
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }

  public dialogOpen(): void {
    this.serviceOpen = true;
  }
  public close(status: boolean): void {
    this.serviceOpen = status;
  }

  protected readonly requestTypes = requestTypes;
}
