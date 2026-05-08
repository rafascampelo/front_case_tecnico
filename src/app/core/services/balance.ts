import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private api = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  setDeposit(amount: number, id: number) {
    return this.http.post<{ transaction: Transaction }>(`${this.api}/clients/deposit/${id}`, {
      amount,
    });
  }

  withdraw(amount: number, id: number) {
    return this.http.post<{ transaction: Transaction }>(`${this.api}/clients/withdraw/${id}`, {
      amount,
    });
  }

  transfer(clientId: number, targetClientId: number, amount: number) {
    return this.http.post(`${this.api}/clients/transfer/${clientId}`, {
      target_client_id: targetClientId,
      amount,
    });
  }
}
