import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NewNoteComponent } from '../new-note/new-note.component';
import { DbService } from '../shared/dbService';
import { Note } from '../shared/note';

@Component({
  selector: 'no-notizen',
  templateUrl: './notizen.component.html',
  styleUrls: ['./notizen.component.scss']
})
export class NotizenComponent implements OnInit {
  notes: Note[] = [];
  sortOrder: string = '';

  constructor(private dbService: DbService, private route: ActivatedRoute, private router: Router,/* private dialog: MatDialog*/) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.sortOrder = params.sortOrder;
      this.dbService.getNotesByOrder(this.sortOrder).then(notes => this.notes = notes).catch(err => console.log(err));

    });
  }

  getNoteDate(note: Note) {
    return new Date(note.creationDate).toLocaleString();
  }

  getNoteModDate(note: Note){
    return new Date(note.modificationDate).toLocaleString();
  }

  handleNewNote() {
    this.router.navigate(['new']);
  }

  handleNoteSelected(note: Note) {
    this.router.navigate(['edit', note.id]);
  }

  /*
    async openModal(note: Note | undefined) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data! = note;
      dialogConfig.width = '95%';
      dialogConfig.height = '100%';
      const dialogRef = this.dialog.open(NewNoteComponent, dialogConfig);
      const data = await dialogRef.afterClosed().toPromise();
      this.dbService.getAllNotes().then(notes => this.notes = notes).catch(err => console.log(err));
    }
    */
}
