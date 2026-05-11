import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceService } from '../../../../core/services/balance';
import { AuthService } from '../../../../core/services/auth';
import { ClientService } from '../../../../core/services/client';

@Component({
  selector: 'app-deposit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './deposit-dialog.html',
  styleUrl: './deposit-dialog.scss',
})
export class DepositDialog {
  @Output() close = new EventEmitter<void>();
  private fb = inject(FormBuilder);

  constructor(
    private balanceService: BalanceService,
    private auth: AuthService,
  ) {}

  depositForm = this.fb.group({
    amount: [ 0, [Validators.required, Validators.min(1)]],
  });

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
          alert('Depósito realizado com sucesso!');
          this.closeModal();
        },
        error: (error) => {
          alert('Erro ao realizar depósito!');
        },
      });
    }
  }

  closeModal() {
    this.close.emit();
  }
}
