import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientService {
  private api = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  getClient(id: number) {
    return this.http.get<{ balance: number }>(`${this.api}/client/${id}`);
  }
}
