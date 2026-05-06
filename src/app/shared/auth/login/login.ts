import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  login() {
    console.log('Form value:', this.form.value); // Debug
    this.auth.login(this.form.value).subscribe({
      next: () => {
        console.log('Login bem-sucedido, redirecionando para /home'); // Debug
        this.router.navigate(['/home']); // Redireciona após login bem-sucedido
      },
      error: (err) => {
        console.error('Erro no login:', err);
        alert('Erro no login. Verifique suas credenciais.'); // Feedback básico para o usuário
      },
    });
  }
}
