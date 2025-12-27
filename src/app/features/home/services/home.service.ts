import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiURl: string = environment.apiBaseUrlGateWay + '/Product/Category';

  constructor(public httpClient: HttpClient) { }

  GetCategories(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiURl + '/GetList' 
    );
  }
}
