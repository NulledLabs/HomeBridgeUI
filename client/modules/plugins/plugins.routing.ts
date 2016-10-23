import { Routes, RouterModule } from '@angular/router';

import { PluginsComponent } from './plugins.component';

export const routes: Routes = [
    { path: 'plugins', component: PluginsComponent }
];

export const routing = RouterModule.forChild(routes);