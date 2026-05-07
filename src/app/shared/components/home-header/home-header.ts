import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../../core/services/client';
import { BalanceService } from '../../../core/services/balance';
import { Client } from '../../../core/interfaces/client.interface';

@Component({
  selector: 'app-home-header',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home-header.html',
  styleUrl: './home-header.scss',
})
export class HomeHeader {}
