import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
apiURl: string = environment.apiBaseUrlGateWay + '/Order/Order';

 constructor(public httpClient: HttpClient) { }

  addOrder(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiURl + '/Create', body 
    );
  }
}
