import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../../../shared/models/apiResponse.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 apiURl: string = environment.apiBaseUrlGateWay + '/Order/Customer';

  constructor(public httpClient: HttpClient) { }

  createCustomer(body: any): Observable<ApiResponse<string>> {
    return this.httpClient.post<ApiResponse<string>>(
      this.apiURl + '/Create',body 
    );
  }

  // Read - جلب كل العملاء
  getCustomers(params?: any): Observable<any> {
    return this.httpClient.get<any>(`${this.apiURl}/GetList`, { params });
  } 
}