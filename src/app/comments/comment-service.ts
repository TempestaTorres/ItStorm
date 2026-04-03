import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddCommentType, ApplyActionResponse, CommentAction, CommentResponse, CommentsType} from './comment-type';
import {Environment} from '../environment/environment';
import {AuthService} from '../services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getArticleCommentAction(articleId: string): Observable<CommentAction[]> {

    let tokens: {
      accessToken: string | null,
      refreshToken: string | null,
    } = this.authService.getTokens();

    if (tokens.accessToken) {
      return this.http.get<CommentAction[]>(Environment.api + 'comments/article-comment-actions',
        {
          params: {
            articleId: articleId
          },
          headers: {
            'x-auth': tokens.accessToken
          }
        });
    }
    else {
      return new Observable<CommentAction[]>(observer => {
        let actions: CommentAction[] = [];
        observer.next(actions);
      })
    }
  }

  public getComments(offset: number, id: string): Observable<CommentsType> {
    return this.http.get<CommentsType>(Environment.api + 'comments', {
      params: {
        offset: offset,
        article: id
      }
    });
  }

  public addComment(comment: AddCommentType): Observable<CommentResponse> {

    let tokens: {
      accessToken: string | null,
      refreshToken: string | null,
    } = this.authService.getTokens();

    if (tokens.accessToken) {
      return this.http.post<CommentResponse>(Environment.api + 'comments', comment,
        {
          headers: {
            'x-auth': tokens.accessToken,
          }});
    }
    else {
      return new Observable<CommentResponse>(observer => {
        observer.next({error: true, message: 'Unauthorized'});
      });
    }
  }

  public applyAction(action: string, id: string): Observable<ApplyActionResponse> {
    let tokens: {
      accessToken: string | null,
      refreshToken: string | null,
    } = this.authService.getTokens();

    if (tokens.accessToken) {
      return this.http.post<ApplyActionResponse>(Environment.api + 'comments/' + id + '/apply-action', {action: action},
        {
          headers: {
            'x-auth': tokens.accessToken,
          }});
    }
    else {
      return new Observable<CommentResponse>(observer => {
        observer.next({error: true, message: 'Unauthorized'});
      });
    }
  }
}
