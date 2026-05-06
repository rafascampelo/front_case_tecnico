import { Component, OnInit, signal } from '@angular/core';
import { ClientService } from '../../../core/services/client';
import { AuthService } from '../../../core/services/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-balance-card',
  imports: [MatButtonModule, MatIconModule, DecimalPipe],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard implements OnInit {
  balance = signal(0);

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
      this.clientService.getClient(id).subscribe({
        next: (client) => {
          console.log('BalanceCard client response:', client);
          this.balance.set(client.balance);
        },
        error: (error) => {
          console.error('BalanceCard getClient error:', error);
        },
      });
    }
  }
}
