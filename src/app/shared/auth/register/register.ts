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
  selector: 'app-register',
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
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      name: '',
      email: '',
      password: '',
    });
  }

  register() {
    console.log('Form value:', this.registerForm.value); // Debug
    this.auth.register(this.registerForm.value).subscribe({
      next: () => {
        console.log('Cadastro bem-sucedido, redirecionando para /login'); // Debug
        this.router.navigate(['/login']); // Redireciona após cadastro bem-sucedido
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        alert('Erro no cadastro. Tente novamente.'); // Feedback básico para o usuário
      },
    });
  }
}
