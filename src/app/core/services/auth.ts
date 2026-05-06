import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    console.log('Enviando dados para login:', data); // Debug
    return this.http
      .post<{ access_token: string; token_type: string }>(`${this.api}/auth/login`, data)
      .pipe(
        tap((response) => {
          console.log('Resposta da API:', response); // Debug
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
            console.log('Token salvo:', response.access_token); // Debug
          }
        }),
        catchError((error) => {
          console.error('Erro no login:', error);
          throw error;
        }),
      );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<Client>(`${this.api}/auth`, data).pipe(
      tap((response) => {
        console.log('Resposta da API:', response); // Debug
      }),
      catchError((error) => {
        console.error('Erro no cadastro:', error);
        throw error;
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
