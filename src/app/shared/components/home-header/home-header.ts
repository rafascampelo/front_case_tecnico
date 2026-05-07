import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ClientService } from '../../../core/services/client';
import { Client } from '../../../core/interfaces/client.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile-dialog';

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
  private dialog = inject(MatDialog);
  searchTerm = signal('');
  searchResults: Client[] = [];
  name = signal('');
  email = signal('');
  hasSearched = false;

  constructor(
    private clientService: ClientService,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.getName();
    this.getEmail();
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

  getName() {
    const userId = this.auth.getUserId();
    this.clientService.getClient(userId).subscribe((client) => {
      console.log('HomeHeader getClient response:', client.name);
      this.name.set(client.name);
    });
  }

  getEmail() {
    this.auth.getUserId()
      ? this.clientService.getClient(this.auth.getUserId()).subscribe((client) => this.email.set(client.email))
      : '';

  }
  openProfileDialog() {
    this.dialog.open(ProfileDialog, {
      width: '420px',
      maxWidth: '92vw',
      panelClass: 'profile-dialog',
      data: {
        name: this.name(),
        email: this.email()
      },
    });
  }
}
