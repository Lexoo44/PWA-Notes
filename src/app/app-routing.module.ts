import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NotizenComponent } from './notizen/notizen.component';
import { ThemenComponent } from './themen/themen.component';

const routes: Routes = [
  { path: '', redirectTo: '/title', pathMatch: 'full' },
  { path: 'themen', component: ThemenComponent },
  { path: 'new', component: NewNoteComponent },
  { path: 'edit/:id', component: NewNoteComponent },
  {
    path: '', component: NavigationComponent, children:
    [
      { path: ':sortOrder', component: NotizenComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
