import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Environment} from '../environment/environment';

export type FilterType = {
  id: string,
  name: string,
  url: string,
}
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private http: HttpClient) {
  }

  public getFilterCategories(): Observable<FilterType[]> {
    return this.http.get<FilterType[]>(Environment.api + 'categories');
  }
}
