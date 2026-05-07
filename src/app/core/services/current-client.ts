// src/app/core/services/current-client.ts

import { Injectable, signal } from '@angular/core';
import { ClientService } from './client';
import { AuthService } from './auth';
import { Client } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrentClientService {
  client = signal<Client | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(
    private clientService: ClientService,
    private auth: AuthService,
  ) {}

  loadCurrentClient() {
    const id = this.auth.getUserId();

    if (!id) {
      this.client.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.clientService.getClient(id).subscribe({
      next: (client) => {
        this.client.set(client);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Erro ao buscar cliente atual:', error);
        this.error.set('Erro ao carregar cliente.');
        this.loading.set(false);
      },
    });
  }

  refresh() {
    this.loadCurrentClient();
  }

  clear() {
    this.client.set(null);
    this.error.set(null);
    this.loading.set(false);
  }
}
