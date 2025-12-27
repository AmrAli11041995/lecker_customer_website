
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductTagsService {
  apiURl: string = environment.apiBaseUrlGateWay + '/Product/Tag';

 constructor(public httpClient: HttpClient) { }

  GetTags(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiURl + '/GetTagsLookup' 
    );
  }
}
