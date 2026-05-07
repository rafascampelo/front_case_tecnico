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
      email: '',
      amount: '',
    });
  }

 deposit() {
  if (this.depositForm.invalid) {
    alert('Preencha um email válido e um valor para depósito.');
    return;
  }

  const email = this.depositForm.value.email;
  const amount = Number(this.depositForm.value.amount);
  const currentUserId = Number(this.auth.getUserId());

  this.clientService.getClientIdByEmail(email).subscribe({
    next: (clientId) => {
      if (!clientId) {
        alert('Nenhum cliente encontrado com esse email.');
        return;
      }

      const depositUserId = Number(clientId);

      if (depositUserId === currentUserId) {
        this.makeDeposit(amount, depositUserId);
        return;
      }

      this.clientService.getBalance(currentUserId).subscribe({
        next: (balanceResponse) => {
          const currentBalance = Number(balanceResponse.balance);

          if (currentBalance < amount) {
            alert('Saldo insuficiente para depositar na conta de outra pessoa.');
            return;
          }

          this.makeDeposit(amount, depositUserId);
        },
        error: (error) => {
          console.error('Balance error:', error);
          alert('Erro ao verificar saldo.');
        },
      });
    },
    error: (error) => {
      console.error('Client search error:', error);
      alert('Erro ao procurar cliente pelo email.');
    },
  });
}

private makeDeposit(amount: number, userId: number) {
  this.balanceService.setDeposit(amount, userId).subscribe({
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
  closeModal() {
    this.close.emit();
  }
}
