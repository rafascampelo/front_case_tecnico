import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  getBalance(id: number) {
    console.log('ClientService.getBalance request:', `${this.api}/clients/${id}`);
    return this.http.get<{ balance: number }>(`${this.api}/clients/${id}`);
  }


}