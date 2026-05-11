import { Component } from '@angular/core';
import { BalanceCard } from '../../components/balance-card/balance-card';
import { DepositDialog } from '../../../transactions/components/deposit-dialog/deposit-dialog';
import { WithdrawDialog } from '../../../transactions/components/withdraw-dialog/withdraw-dialog';
import { HomeHeader } from '../../components/home-header/home-header';
import { CurrentClientService } from '../../../../core/services/current-client';
import { TransferDialog } from '../../../transactions/components/transfer-dialog/transfer-dialog';

@Component({
  selector: 'app-initial-screen',
  imports: [BalanceCard, HomeHeader, DepositDialog, WithdrawDialog, TransferDialog],
  templateUrl: './initial-screen.html',
  styleUrl: './initial-screen.scss',
})
export class InitialScreen {
  showDepositModal = false;
  showWithdrawModal = false;
  showTransferModal = false;
  constructor(public currentClient: CurrentClientService) {}

  ngOnInit() {
    this.currentClient.loadCurrentClient();
  }

  openDepositModal() {
    this.showDepositModal = true;
  }

  openTransferModal() {
    this.showTransferModal = true;
  }

  openWithdrawModal() {
    this.showWithdrawModal = true;
  }

  closeModal() {
    this.showDepositModal = false;
    this.showWithdrawModal = false;
    this.refreshPage();
  }

  refreshPage() {
    location.reload();
  }
}
