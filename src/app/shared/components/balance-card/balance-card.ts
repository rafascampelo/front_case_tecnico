import { Component } from '@angular/core';
import { ClientService } from '../../../core/services/client';
import { Client } from '../../../core/interfaces/client.interface';

@Component({
  selector: 'app-balance-card',
  imports: [],
  templateUrl: './balance-card.html',
  styleUrl: './balance-card.scss',
})
export class BalanceCard {

    balance = 0

  constructor(private clientService: ClientService){
  }
}
