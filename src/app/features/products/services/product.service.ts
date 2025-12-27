import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURl: string = environment.apiBaseUrlGateWay + '/Product/Product';

 constructor(public httpClient: HttpClient) { }

  GetProducts(): Observable<any> {
    return this.httpClient.post<any>(
      this.apiURl + '/Site/List',{pageNumber:1,pageSize:10} 
    );
  }
  
  GetTopSellerProducts(): Observable<any> {
    return this.httpClient.get<any>(
      this.apiURl + '/Site/GetTopSellerProductList'
    );
  }
}
