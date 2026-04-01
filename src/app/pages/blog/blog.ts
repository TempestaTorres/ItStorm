import {Component, OnDestroy, OnInit} from '@angular/core';
import {FeaturedFilter} from '../../components/featured-filter/featured-filter';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ArticleImage, ArticlesType, ArticleType} from '../../articles/article-types';
import {ArticleService} from '../../articles/article-service';
import {Subscription} from 'rxjs';
import {QueryParamTypes} from '../../components/featured-filter/queryparam-type';
import {ScrollingService} from '../../services/scrolling-service';

@Component({
  selector: 'app-blog',
  imports: [
    FeaturedFilter,
    RouterLink
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.css',
})
export class Blog implements OnInit, OnDestroy {

  public currentPage: number = 0;
  public totalPages: number = 0;
  public items: ArticleType[] = [];

  public articleImgUrl: string = ArticleImage.path;
  public loading = false;

  private defSubscription: Subscription | undefined;
  private sortedSubscription: Subscription | undefined;
  private sortParams: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private articleService: ArticleService,
              private scrollingService: ScrollingService) {
  }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {

       this.sortParams = [];

      if (params['categories']) {

        let queryParams = params['categories'];

        if (!Array.isArray(queryParams)) {
          this.sortParams[0] = queryParams;
        }
        else {
          this.sortParams = params['categories'];
        }

      }
      else {
        this.sortParams[0] = 'default';
      }
      let page = Number(params['page']) || 1;

      this.loadArticles(page);
      this.scrollingService.toTop();
    });
  }

  ngOnDestroy() {

    if (this.defSubscription) {
      this.defSubscription.unsubscribe();
    }
    if (this.sortedSubscription) {
      this.sortedSubscription.unsubscribe();
    }
  }

  private loadArticles(page: number): void {

    if (this.sortParams.length === 1 && this.sortParams[0] === 'default') {

      this.defSubscription = this.articleService.getArticles(page).subscribe(articles => {

        this.totalPages = articles.pages;
        this.items = articles.items;
      });
    }
    else {
      let params: QueryParamTypes = {
        categories: this.sortParams,
        page: page
      }
      this.sortedSubscription = this.articleService.getArticlesSorted(params).subscribe(articles => {

        this.totalPages = articles.pages;
        this.items = articles.items;

      });
    }

    this.currentPage = page;
  }

  public prevButtonClick(target: HTMLElement): void {

    this.loading = true;
    this.currentPage--;

    setTimeout(() => {

      this.loading = false;
      this.loadArticles(this.currentPage);

      setTimeout(() => {
        this.scrollingService.toTarget(target);
      }, 700);

    }, 700);
  }
  public nextButtonClick(target: HTMLElement): void {

    this.loading = true;
    this.currentPage++;

    setTimeout(() => {

      this.loading = false;
      this.loadArticles(this.currentPage);

      setTimeout(() => {
        this.scrollingService.toTarget(target);
      }, 700);

    }, 700);
  }

  public pageClick(index: number, target: HTMLElement): void {

    this.loading = true;
    this.currentPage = index;

    setTimeout(() => {

      this.loading = false;
      this.loadArticles(this.currentPage);

      setTimeout(() => {
        this.scrollingService.toTarget(target);
      }, 700);

    }, 700);
  }
}
