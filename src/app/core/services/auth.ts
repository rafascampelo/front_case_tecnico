import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Client } from '../interfaces/client.interface';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private api = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post<{ access_token: string; token_type: string }>(
      `${this.api}/auth/login`,
      data,
    );
  }

  register(data: { name: string; email: string; password: string }) {
    return this.http.post<Client>(`${this.api}/auth`, data);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const decoded: any = jwtDecode(token);
      const id = decoded.id ?? decoded.user_id ?? decoded.sub ?? null;

      return id ? Number(id) : null;
    } catch (error) {
      console.error('Erro ao decodificar token:', error);
      return null;
    }
  }

  logout() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem('token');
  }
}
