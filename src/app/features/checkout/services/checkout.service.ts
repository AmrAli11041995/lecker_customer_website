import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
apiURl: string = environment.apiBaseUrlGateWay + '/Order/Order';
apiCustomerURl: string = environment.apiBaseUrlGateWay + '/Order/Customer';
  private jwtHelper = new JwtHelperService();

 constructor(public httpClient: HttpClient) { }

  addOrder(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiURl + '/Create', body 
    );
  }

  getUserDetails(token: string){
    let userDetails = this.jwtHelper.decodeToken(token);
    let Email = (userDetails?.Email as string);
return this.httpClient.get<any>(
      this.apiCustomerURl + '/GetCustomerByEmail?Email='+ Email
    );
  }
  
}
