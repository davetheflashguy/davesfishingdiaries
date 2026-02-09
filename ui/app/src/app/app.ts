import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shell } from './src/components/shell/shell';
import { CatchHighlight } from './src/components/catch-highlight/catch-highlight';
import { CatchFilters } from './src/components/catch-filters/catch-filters';

@Component({
  selector: 'app-root',
  imports: [Shell, CatchHighlight, CatchFilters, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

}
