import { Component, OnInit, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client';
import { AuthService } from '../../../core/services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { sign } from 'crypto';

@Component({
  selector: 'app-balance-card',
  imports: [MatButtonModule, MatIconModule, DecimalPipe, DatePipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard implements OnInit {
  balance = signal(0);
  ultimaAtualizacao = signal(new Date());
  constructor(
    private clientService: ClientService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.getBalance();
  }

  getBalance() {
    const id = this.auth.getUserId();
    console.log('BalanceCard.getBalance id:', id);

    if (id) {
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
    }
  }
}
