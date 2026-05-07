import { Component, OnInit, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client';
import { AuthService } from '../../../core/services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';
import { CurrentClientService } from '../../../core/services/current-client';

@Component({
  selector: 'app-balance-card',
  imports: [MatButtonModule, MatIconModule, CommonModule, DatePipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard  {
  ultimaAtualizacao = new Date();

  constructor(public currentClient: CurrentClientService) {}

  refreshBalance() {
    this.currentClient.refresh();
    this.ultimaAtualizacao = new Date();
  }

  /* getBalance() {
    const id = this.auth.getUserId();
    console.log('BalanceCard.getBalance id:', id);

    if (!id) {
      console.warn('Sem id, não vou buscar saldo.');
      return;
    }

    this.clientService.getBalance(id).subscribe({
      next: (client) => {
        console.log('BalanceCard client response:', client);
        this.balance.set(client.balance);
        this.ultimaAtualizacao.set(new Date());
      },
      error: (error) => {
        console.error('BalanceCard getBalance error:', error);
      },
    });
  } */
}
