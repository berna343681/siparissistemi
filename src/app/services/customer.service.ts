import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/ListResponseModel';
import { Customer } from '../models/customer';
import { environment } from 'src/environments/dev.environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(environment.apiUrl+"Customers/getall");
  }
  add(customer: Customer): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "Customers", customer, { responseType: 'text' });
  }
  deleteCustomer(createdUserId: number, customerId: number): Observable<any> {
    const body = {
      createdUserId: createdUserId,
      customerId: customerId
    };
  
    return this.httpClient.request('delete', `${environment.apiUrl}Customers`, {
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' // API'den dönen yanıt "Deleted" olduğu için metin bekleniyor
    });
  }
  
   // müşteriID'ye göre getiriyoruz
  getCustomerById(customerId: number): Observable<Customer> {
    return this.httpClient.get<Customer>(`${environment.apiUrl}Customers/${customerId}`);
  }
  
  updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "Customers", customer, { responseType: 'text' });
  }}
  


  
  



