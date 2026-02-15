import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-getting-started',
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.scss',
})
export class GettingStarted {

}
