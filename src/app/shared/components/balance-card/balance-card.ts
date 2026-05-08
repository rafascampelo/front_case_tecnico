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

}
