import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home-header',
  imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './home-header.html',
  styleUrl: './home-header.scss',
})
export class HomeHeader {

}
