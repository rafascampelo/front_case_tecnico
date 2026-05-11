import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BalanceService } from '../../../../core/services/balance';
import { AuthService } from '../../../../core/services/auth';
import { ClientService } from '../../../../core/services/client';
@Component({
  selector: 'app-transfer-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './transfer-dialog.html',
  styleUrl: './transfer-dialog.scss',
})
export class TransferDialog {
  @Output() close = new EventEmitter<void>();
  private fb = inject(FormBuilder);

  constructor(
    private balanceService: BalanceService,
    private auth: AuthService,
    private clientService: ClientService,
  ) {}

  transferForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    amount: [0, [Validators.required, Validators.min(1)]],
  });

  transfer() {
    if (this.transferForm.invalid) {
      alert('Preencha um email válido e um valor para transferência.');
      return;
    }

    const { email, amount } = this.transferForm.getRawValue();

    if (!amount || amount <= 0) {
      alert('Informe um valor válido para transferência.');
      return;
    }

    const currentUserId = Number(this.auth.getUserId());

    this.clientService.getClientIdByEmail(email).subscribe({
      next: (clientId) => {
        if (!clientId) {
          alert('Nenhum cliente encontrado com esse email.');
          return;
        }

        const targetClientId = Number(clientId);

        if (targetClientId === currentUserId) {
          alert('Não é possível transferir para a própria conta.');
          return;
        }

        this.balanceService.transfer(currentUserId, targetClientId, amount).subscribe({
          next: () => {
            alert('Transferência realizada com sucesso!');
            this.closeModal();
          },
          error: (error) => {
            alert(error.error?.detail || 'Erro ao realizar transferência.');
          },
        });
      },
      error: (error) => {
        alert('Erro ao procurar cliente pelo email.');
      },
    });
  }

  closeModal() {
    this.close.emit();
  }
}
