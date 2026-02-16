import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shell } from './src/components/shell/shell';
import { CatchHighlight } from './src/components/catch-highlight/catch-highlight';

@Component({
  selector: 'app-root',
  imports: [Shell, CatchHighlight, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

}
