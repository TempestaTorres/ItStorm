import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleImage, ArticleType, SingleArticle} from '../../articles/article-types';
import {ArticleService} from '../../articles/article-service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {
  AddCommentType,
  ApplyActionResponse,
  CommentAction,
  CommentType,
  UserCommentActions
} from '../../comments/comment-type';
import {AuthService} from '../../services/auth-service';
import {ScrollingService} from '../../services/scrolling-service';
import {CommentService} from '../../comments/comment-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
// @ts-ignore
import {HttpErrorResponse} from '@angular/common/module.d';

@Component({
  selector: 'app-article',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './article.html',
  styleUrl: './article.css',
})
export class Article implements OnInit, OnDestroy {

  public articleUrl: string = '';
  public articleImgUrl: string = ArticleImage.path;
  public article: SingleArticle = {
    text: '',
    comments: [],
    commentsCount: 0,
    id: '',
    title: '',
    description: '',
    image: '',
    date: '',
    category: '',
    url: '',
  };

  public relatedArticles: ArticleType[] = [];
  public comments: CommentType[] = [];
  public allComments: number = 0;
  public articleCommentsActions: CommentAction[] = [];

  protected offset: number = 0;

  private articleSubscription: Subscription | undefined;
  private relatedArticleSubscription: Subscription | undefined;
  private commentsSubscription: Subscription | undefined;
  private addCommentsSubscription: Subscription | undefined;
  private articleCommentActionSubscription: Subscription | undefined;
  private applyActionSubscription: Subscription | undefined;

  public commentForm: FormGroup = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  public processing: boolean = false;
  public loading: boolean = false;
  public formError: boolean = false;
  public formResponse: boolean = false;
  public errorMsg: string = '';

  constructor(public articleService: ArticleService, private activatedRoute: ActivatedRoute,
              private authService: AuthService, private scrollingService: ScrollingService,
              private commentService: CommentService,) {}

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params['url']) {

        this.articleUrl = params['url'];

        this.getArticle(this.articleUrl);

        this.articleSubscription = this.articleService.getRelatedArticles(this.articleUrl).subscribe(articles => {
          this.relatedArticles = articles;

        });

      }
    });
  }

  ngOnDestroy() {
    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
    if (this.relatedArticleSubscription) {
      this.relatedArticleSubscription.unsubscribe();
    }
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
    if (this.addCommentsSubscription) {
      this.addCommentsSubscription.unsubscribe();
    }
    if (this.articleCommentActionSubscription) {
      this.articleCommentActionSubscription.unsubscribe();
    }
    if (this.applyActionSubscription) {
      this.applyActionSubscription.unsubscribe();
    }
  }

  get comment() {return this.commentForm.get('comment');}

  public onSubmit(): void {

    this.processing = true;

    if (this.commentForm.status === 'VALID') {

      this.formError = false;

      setTimeout(() => {
        this.processing = false;

        let dataComment: AddCommentType = {
          text: this.commentForm.value.comment,
          article: this.article.id
        }

        this.addCommentsSubscription = this.commentService.addComment(dataComment).subscribe(commentResponse => {

          if (!commentResponse.error) {
            this.errorMsg = "Ваш комментарий успешно добавлен!";
            this.formResponse = true;
            this.commentForm.reset();

            this.getArticle(this.articleUrl);
          }
          else {
            this.errorMsg = "Опубликовать не удалось.";
            this.formError = true;
          }


        });

      }, 500);
    }
    else {
      setTimeout(() => {
        this.processing = false;
        this.formError = true;
        this.errorMsg = "Заполните Ваш комментарий!";
      }, 500);
    }

  }

  public isUserLiked(id: string): boolean {
    let isLike = false;

    for (let i: number = 0; i < this.articleCommentsActions.length; i++) {

      if (this.articleCommentsActions[i].comment === id && this.articleCommentsActions[i].action === 'like') {
        isLike = true;
        break;
      }
    }

    return isLike;
  }

  public isUserDisliked(id: string): boolean {
    let isDislike = false;

    for (let i: number = 0; i < this.articleCommentsActions.length; i++) {

      if (this.articleCommentsActions[i].comment === id && this.articleCommentsActions[i].action === 'dislike') {
        isDislike = true;
        break;
      }
    }

    return isDislike;
  }

  public applyAction(action: string, id: string): void {

    this.applyActionSubscription = this.commentService.applyAction(action,id).subscribe( {

      next: (response: ApplyActionResponse) => {

        if (!response.error) {

          this.getComments();
          this.getCommentsActionsArticle(this.article.id);
        }
      },
      error: (response: HttpErrorResponse) => {
        console.log(response.error.message);

        if (action === UserCommentActions.violate) {
          console.log('Violate', response.error.message);
        }
      }
    });
  }

  public applyActionViolate(id: string, target: HTMLElement): void {

    this.applyActionSubscription = this.commentService.applyAction(UserCommentActions.violate, id).subscribe( {

      next: (response: ApplyActionResponse) => {

        if (!response.error) {

          this.showResponse(response.message, target);
        }
      },
      error: (response: HttpErrorResponse) => {

        this.showResponse(response.error.message, target, true);

      }
    });
  }

  private showResponse(message: string, target: HTMLElement, error: boolean = false): void {

    let childe: Element | null = target.firstElementChild;

    if (childe) {
      childe.textContent = message;
    }
    else {
      target.textContent = message;
    }
    target.classList.add('active');

    if (error) {
      target.classList.add('error');
    }

    setTimeout(() => {

      target.classList.remove('active');

      if (error) {
        target.classList.remove('error');
      }
    }, 3000);

  }

  public loadComments(): void {

    this.loading = true;
    this.offset += this.comments.length;

    setTimeout(() => {
      this.loading = false;


    }, 700);
  }

  private getArticle(url: string): void {

    this.articleSubscription = this.articleService.getArticle(url).subscribe(article => {
      this.article = article;

      this.getComments();

      this.getCommentsActionsArticle(article.id);

      this.toTop();
    });
  }

  private getComments(): void {
    this.commentsSubscription = this.commentService.getComments(this.offset, this.article.id).subscribe(comments => {
      this.comments = comments.comments;
      this.allComments = comments.allCount;
    });
  }

  private getCommentsActionsArticle(id: string): void {
    this.articleCommentActionSubscription = this.commentService.getArticleCommentAction(id).subscribe(comments => {
      this.articleCommentsActions = comments;
    });
  }

  private toTop(): void {
    setTimeout(() => {
      this.scrollingService.toTop();
    }, 500);
  }

  public isLogged(): boolean {
    return this.authService.isLoggedIn();
  }

  protected readonly UserCommentActions = UserCommentActions;
}
