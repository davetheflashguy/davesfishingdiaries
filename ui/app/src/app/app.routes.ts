import { Routes } from '@angular/router';
import { GettingStarted } from './src/components/getting-started/getting-started';
import { Catches } from './src/components/catches/catches';

export const routes: Routes = [
    { path: '', component: Catches },
	{ path: 'getting-started', component: GettingStarted },
];
