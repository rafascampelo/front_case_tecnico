import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceService } from '../../../../core/services/balance';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-withdraw-dialog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './withdraw-dialog.html',
  styleUrl: './withdraw-dialog.scss',
})
export class WithdrawDialog {
  @Output() close = new EventEmitter<void>();
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private auth: AuthService,
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1.0)]],
    });
  }

  withdraw() {
    const id = this.auth.getUserId();
    const amount = this.form.value.amount;

    if (this.form.invalid) {
      alert('Preencha um valor para saque.');
      return;
    }

    if (id && amount) {
      this.balanceService.withdraw(amount, id).subscribe({
        next: (response) => {
          alert('Saque realizado com sucesso!');
          this.closeModal();
        },
        error: (error) => {
          alert('Erro ao realizar saque!');
        },
      });
    }
  }
  closeModal() {
    this.close.emit();
  }
}
