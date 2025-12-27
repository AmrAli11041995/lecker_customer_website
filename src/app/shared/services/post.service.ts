// Posts

import { Injectable } from '@angular/core';
// import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURl: string = environment.apiBaseUrlGateWay + '/Product/Posts';

 constructor(public httpClient: HttpClient) { }

  GetPosts(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiURl + '/GetList' 
    );
  }
}
