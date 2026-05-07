import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { AuthService } from '../../../core/services/auth';
import { ClientService } from '../../../core/services/client';
import { warn } from 'console';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-profile-dialog',
  imports: [FormsModule],
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.scss',
})
export class ProfileDialog {
  private dialogRef = inject(MatDialogRef<ProfileDialog>);
  data = inject(MAT_DIALOG_DATA);

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
  ) {}

  name = signal(this.data.name);
  email = signal(this.data.email);
  password = signal('');

  close() {
    this.dialogRef.close();
  }

  updateProfile() {
    const id = this.auth.getUserId();
    if (!id) {
      return;
    }

    this.clientService
      .updateClient(id, {
        name: this.name(),
        email: this.email(),
        password: this.password(),
      })
      .subscribe({
        next: (response) => {
          console.log('Perfil atualizado:', response);
          this.dialogRef.close(response);
          
        },
        error: (error) => {
          console.table(error.error.detail);
        },
      });
  }

  deleteProfile() {
    console.log('Deletar perfil');

    // depois você chama seu service aqui
    // this.clientService.deleteProfile(...)

    this.dialogRef.close({
      action: 'delete',
    });
  }
}
