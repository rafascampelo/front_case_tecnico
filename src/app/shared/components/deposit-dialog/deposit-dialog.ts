import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceService } from '../../../core/services/balance';
import { AuthService } from '../../../core/services/auth';
import { ClientService } from '../../../core/services/client';

@Component({
  selector: 'app-deposit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './deposit-dialog.html',
  styleUrl: './deposit-dialog.scss',
})
export class DepositDialog {
  @Output() close = new EventEmitter<void>();
  depositForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private auth: AuthService,
  ) {
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required]],
    });
  }

  deposit() {
    const id = this.auth.getUserId();
    const amount = this.depositForm.value.amount;

    if (this.depositForm.invalid) {
      alert('Preencha um valor para depósito.');
      return;
    }
    
    if (id && amount) {
      this.balanceService.setDeposit(amount, id).subscribe({
        next: (response) => {
          console.log('Deposit response:', response);
          alert('Depósito realizado com sucesso!');
          this.closeModal();
        },
        error: (error) => {
          console.error('Deposit error:', error);
          alert('Erro ao realizar depósito!');
        },
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
