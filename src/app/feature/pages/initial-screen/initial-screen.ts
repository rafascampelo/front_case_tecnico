import { Component } from '@angular/core';
import { BalanceCard } from '../../../shared/components/balance-card/balance-card';
import { DepositDialog } from '../../../shared/components/deposit-dialog/deposit-dialog';
import { WithdrawDialog } from '../../../shared/components/withdraw-dialog/withdraw-dialog';
import { HomeHeader } from '../../../shared/components/home-header/home-header';
import { CurrentClientService } from '../../../core/services/current-client';
import { TransferDialog } from "../../../shared/components/transfer-dialog/transfer-dialog";

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
  constructor(private currentClient: CurrentClientService) {}

  ngOnInit() {
    this.currentClient.loadCurrentClient();
  }
  
  openDepositModal() {
    console.log('openDepositModal called');
    this.showDepositModal = true;
  }

  openTransferModal() {
    console.log('openTransferModal called');
    this.showTransferModal = true;
  }

  openWithdrawModal() {
    console.log('openWithdrawModal called');
    this.showWithdrawModal = true;
  }

  closeModal() {
    console.log('closeModal called');
    this.showDepositModal = false;
    this.showWithdrawModal = false;
    this.refreshPage();
  }

  refreshPage() {
    console.log('Recarregando página...');
    location.reload();
  }
}
