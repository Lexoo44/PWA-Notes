import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { NewNoteComponent } from './new-note/new-note.component';
import { NotizenComponent } from './notizen/notizen.component';
import { ThemenComponent } from './themen/themen.component';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: ':sortOrder', component: NotizenComponent },
      { path: ':sortOrder/:id', component: NewNoteComponent },
      { path: 'new', component: NewNoteComponent }
    ]
  },
  { path: 'themen', component: ThemenComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
