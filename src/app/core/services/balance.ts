import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BalanceService {
  private api = 'http://127.0.0.1:8000';  
  constructor(private http: HttpClient) {}

    setDeposit(amount: number, id: number) {
    return this.http.post(`${this.api}/clients/deposit/${id}`, { amount });
    }

    withdraw(amount: number, id: number) {
    return this.http.post<{ amount : number, id: number }>(`${this.api}/clients/withdraw/${id}`, { amount });
    }

}
