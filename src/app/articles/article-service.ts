import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Environment} from '../environment/environment';
import {ArticleType} from './article-types';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  constructor(private http: HttpClient) {}

  public getPopularArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(Environment.api + 'articles/top');
  }
}
