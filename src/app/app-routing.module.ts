import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetListComponent } from './mtg/core/demo/set-list/set-list.component';

const routes: Routes = [
  { path: 'demo/setList', component: SetListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
