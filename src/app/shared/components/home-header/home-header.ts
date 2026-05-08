import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Client } from '../../../core/interfaces/client.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialog } from '../profile-dialog/profile-dialog';
import { CurrentClientService } from '../../../core/services/current-client';
import { ClientService } from '../../../core/services/client';

@Component({
  selector: 'app-home-header',
  imports: [
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './home-header.html',
  styleUrl: './home-header.scss',
})
export class HomeHeader implements OnInit {
  private dialog = inject(MatDialog);
  searchTerm = signal('');
  searchResults = signal<Client[]>([]);
  name = signal('');
  email = signal('');
  hasSearched = signal(false);

  constructor(
    public currentClient: CurrentClientService,
    private auth: AuthService,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
    this.loadCurrentClient();
  }

  onSearchTermChange(value: string) {
    const term = value.trim();
    this.searchTerm.set(value);

    if (!term) {
      this.searchResults.set([]);
      this.hasSearched.set(false);
    }
  }

  search() {
    const term = this.searchTerm().trim();

    if (!term) {
      this.searchResults.set([]);
      this.hasSearched.set(false);
      return;
    }

    this.hasSearched.set(true);

    this.clientService.searchClients(term).subscribe({
      next: (clients) => {
        this.searchResults.set(clients);
      },
      error: (error) => {
        console.error('Search error:', error);
        this.searchResults.set([]);
      },
    });
  }

  refreshSearch() {
    if (this.hasSearched() && this.searchTerm().trim()) {
      this.search();
    }
  }

  loadCurrentClient() {
    const userId = this.auth.getUserId();

    if (!userId) {
      this.name.set('');
      this.email.set('');
      return;
    }

    this.clientService.getClient(userId).subscribe({
      next: (client) => {
        this.name.set(client.name);
        this.email.set(client.email);
      },
      error: (error) => {
        console.error('HomeHeader getClient error:', error);
        this.name.set('');
        this.email.set('');
      },
    });
  }

  openProfileDialog() {
    const dialogRef = this.dialog.open(ProfileDialog, {
      data: {
        name: this.name(),
        email: this.email(),
      },
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) {
        this.loadCurrentClient();
        this.refreshSearch();
      }
    });
  }

  logOut() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}
