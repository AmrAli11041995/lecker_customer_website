
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  apiURl: string = environment.apiBaseUrlGateWay + '/Email';

  constructor(public httpClient: HttpClient) { }

  sendEmail(body: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiURl + '/Send' ,body
    );
  }
}
