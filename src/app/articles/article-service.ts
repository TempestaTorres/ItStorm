import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {debounceTime, Observable} from 'rxjs';
import {Environment} from '../environment/environment';
import {ArticlesType, ArticleType, SingleArticle} from './article-types';
import {QueryParamTypes} from '../components/featured-filter/queryparam-type';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  public getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(Environment.api + 'articles/top');
  }

  public getArticles(page: number): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(Environment.api + 'articles', {params: {page: page}});
  }

  public getArticlesSorted(params: QueryParamTypes): Observable<ArticlesType> {
    return this.http.get<ArticlesType>(Environment.api + 'articles', {params: params}).pipe(
      debounceTime(500),
    );
  }

  public getArticle(url: string): Observable<SingleArticle> {
    return this.http.get<SingleArticle>(Environment.api + 'articles/' + url);
  }
  public getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(Environment.api + 'articles/related/' + url);
  }
}
