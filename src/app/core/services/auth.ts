import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Client } from '../interfaces/client.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<{ access_token: string; token_type: string }>(
      `${this.api}/auth/login`,
      data
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<Client>(`${this.api}/auth`, data);
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.id ?? decoded.user_id ?? decoded.sub ?? null;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }
}
