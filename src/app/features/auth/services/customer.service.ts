import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 apiURl: string = environment.apiBaseUrlGateWay + '/Order/Customer';

  constructor(public httpClient: HttpClient) { }

  createCustomer(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiURl + '/Create',body 
    );
  }
}