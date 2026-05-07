import { Component, Output, EventEmitter, OnInit, Signal, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BalanceService } from '../../../core/services/balance';
import { AuthService } from '../../../core/services/auth';
import { ClientService } from '../../../core/services/client';


@Component({
  selector: 'app-deposit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './deposit-dialog.html',
  styleUrl: './deposit-dialog.scss',
})
export class DepositDialog implements OnInit {
  @Output() close = new EventEmitter<void>();
   depositForm!: FormGroup;

   constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private auth: AuthService,
    private clientService: ClientService,
  ) {}

  ngOnInit() {
    this.depositForm = this.fb.group({
      amount: '',
    });
  }

  deposit() {
    const id = this.auth.getUserId();
    const amount = this.depositForm.value.amount;

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
