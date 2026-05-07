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

   getClient(id: number) {
    return this.http.get<Client>(`${this.api}/clients/${id}`);
  }

  getClients() {
    return this.http.get<Client[]>(`${this.api}/clients`);
  }

  updateClient(id: number, data: Partial<Client>) {
    return this.http.put<Client>(`${this.api}/clients/${id}`, data);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.api}/clients/${id}`);
  }

  searchClients(term: string) {
    const normalizedTerm = term.trim().toLowerCase();

    return this.getClients().pipe(
      map((clients) => {
        if (!normalizedTerm) {
          return [];
        }

        return clients.filter(
          (client) =>
            client.name.toLowerCase().includes(normalizedTerm) ||
            client.email.toLowerCase().includes(normalizedTerm),
        );
      }),
    );
  }
}
