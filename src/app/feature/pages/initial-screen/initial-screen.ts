import { Component } from '@angular/core';
import { TransactionList } from "../../../shared/components/transaction-list/transaction-list";
import { BalanceCard } from "../../../shared/components/balance-card/balance-card";
import { ProfileDialog } from "../../../shared/components/profile-dialog/profile-dialog";
import { UserSearch } from '../../../shared/components/user-search/user-search';

@Component({
  selector: 'app-initial-screen',
  imports: [TransactionList, BalanceCard, ProfileDialog, UserSearch],
  templateUrl: './initial-screen.html',
  styleUrl: './initial-screen.scss',
})
export class InitialScreen {}
