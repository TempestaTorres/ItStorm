import { Injectable } from '@angular/core';
import {RequestType, ResponseType} from './request-type';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Environment} from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class Request {

  constructor(private http: HttpClient) { }

  public sendRequest(req: RequestType): Observable<ResponseType> {
    return this.http.post<ResponseType>(Environment.api + 'requests',req);
  }
}
