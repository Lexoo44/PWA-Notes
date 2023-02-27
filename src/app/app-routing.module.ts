import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotizenComponent } from './notizen/notizen.component';
import { ThemenComponent } from './themen/themen.component';

const routes: Routes = [
  { path: '', component: NotizenComponent, redirectTo: '' },
  { path: 'themen', component: ThemenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
