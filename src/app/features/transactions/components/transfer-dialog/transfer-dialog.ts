import { Component, Output, EventEmitter } from '@angular/core';
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
  transferForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private auth: AuthService,
    private clientService: ClientService,
  ) {
    this.transferForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      amount: ['', [Validators.required]],
    });
  }

  transfer() {
    if (this.transferForm.invalid) {
      alert('Preencha um email válido e um valor para transferência.');
      return;
    }

    const email = this.transferForm.value.email;
    const amount = Number(
      String(this.transferForm.value.amount ?? '')
        .replace(/\./g, '')
        .replace(',', '.'),
    );

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

  formatMoney(event: Event) {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, '');

    if (!value) {
      this.transferForm.patchValue({ amount: '' }, { emitEvent: false });
      return;
    }

    const numberValue = Number(value) / 100;

    const formatted = numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    this.transferForm.patchValue({ amount: formatted }, { emitEvent: false });
  }

  closeModal() {
    this.close.emit();
  }
}
