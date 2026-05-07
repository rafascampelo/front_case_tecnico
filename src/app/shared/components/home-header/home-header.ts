import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../../core/services/client';
import { Client } from '../../../core/interfaces/client.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { get } from 'http';

@Component({
  selector: 'app-home-header',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './home-header.html',
  styleUrl: './home-header.scss',
})
export class HomeHeader {
  searchTerm = signal('');
  searchResults: Client[] = [];
  name = '';
  hasSearched = false;

  constructor(
    private clientService: ClientService,
    private auth: AuthService,
  ) {}

  getName(){
    const userId = this.auth.getUserId();
    if (!userId) {
      return;
    }
    this.clientService.getClient(userId).subscribe((client) => {
    this.name = client.name;
    });
  }

  onSearchTermChange(value: string) {
    this.searchTerm.set(value);

    if (!value.trim()) {
      this.searchResults = [];
      this.hasSearched = false;
    }
  }
  
  search() {
    this.hasSearched = true;
    this.clientService.searchClients(this.searchTerm()).subscribe({
      next: (clients) => {
        this.searchResults = clients;
      },
      error: (error) => {
        console.error('Search error:', error);
      },
    });
  }
}
