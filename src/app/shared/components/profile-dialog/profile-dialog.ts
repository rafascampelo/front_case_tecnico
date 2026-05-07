import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth';
import { ClientService } from '../../../core/services/client';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-profile-dialog',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './profile-dialog.html',
  styleUrl: './profile-dialog.scss',
})
export class ProfileDialog {
  private dialogRef = inject(MatDialogRef<ProfileDialog>);
  data = inject(MAT_DIALOG_DATA);
  private router = inject(Router);
  form!: FormGroup;
  password = signal('');
  hidePassword = true;

  constructor(
    private auth: AuthService,
    private clientService: ClientService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: this.data?.name || '',
      email: this.data?.email || '',
      changePassword: [false],

      password: '',
    });
  }

  close() {
    this.dialogRef.close();
  }

  updateProfile() {
    const body = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    };
    const { changePassword, password } = this.form.value;
    
    if (changePassword && password && password.trim() !== '') {
      body.password = password;
    }

    this.clientService.updateClient(this.auth.getUserId(), body).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso!');
        this.close();
        window.location.reload();
      },
      error: (err) => {
        alert('Erro ao atualizar perfil:' + err.message);
      },
    });
  }

  deleteProfile() {
    const confirmDelete = confirm(
      'Tem certeza que deseja deletar seu perfil? Essa ação não pode ser desfeita.',
    );

    if (!confirmDelete) return;
    this.clientService.deleteClient(this.auth.getUserId()).subscribe({
      next: () => {
        this.auth.logout();
        console.log('Perfil deletado com sucesso!' + localStorage.getItem('token'));
        this.dialogRef.close();

        setTimeout(() => {
          this.router.navigateByUrl('/login');
        });
      },
      error: (err) => {
        alert('Erro ao deletar perfil:' + err.message);
      },
    });
  }
}
