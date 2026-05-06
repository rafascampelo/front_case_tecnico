import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deposit-dialog',
  imports: [],
  templateUrl: './deposit-dialog.html',
  styleUrl: './deposit-dialog.scss',
})
export class DepositDialog {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
