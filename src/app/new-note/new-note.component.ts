import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EditThemeComponent } from '../edit/edit-theme.component';
import { DbService } from '../shared/dbService';
import { Note } from '../shared/note';
import { Theme } from '../shared/theme';
import { User } from '../shared/user';

@Component({
  selector: 'no-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  note!: Note;
  errorMessage!: String;
  noteForm!: FormGroup;
  id!: String;
  themes: Theme[] = [];
  isNewNote: boolean = true;
  error: any;

  constructor(private fb: FormBuilder, private dbService: DbService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.dbService.getThemesByDescription().then((themes: Theme[]) => {
      this.themes = themes;
    }).catch((err: any) => {
      console.log(err);
    });


    this.id = this.route.snapshot.params.id
    if (this.id) {
      this.dbService.getNoteById(this.route.snapshot.params.id).then(
        (note) => {
          this.note = note;
          this.isNewNote = false;
          this.noteForm = this.fb.group({
            title: [this.note.title, [Validators.required, Validators.minLength(1)]],
            theme: [this.note.theme, [Validators.required, Validators.minLength(1)]],
            text: [this.note.text, [Validators.required, Validators.minLength(1)]],
          })
        },
      ).catch(
        (error) => {
          this.errorMessage = error.message;
        }
      )
    } else {
      this.note = Note.empty();
      this.noteForm = this.fb.group({
        title: [this.note.title, [Validators.required, Validators.minLength(1)]],
        theme: [this.note.theme, [Validators.required, Validators.minLength(1)]],
        text: [this.note.text, [Validators.required, Validators.minLength(1)]],
      })
    }
  }
  newNote() {
    Object.assign(this.note, this.noteForm.value);
    this.note.user = User.emptySepp();
    this.note.theme = Theme.empty()
    this.note.theme.description = this.noteForm.value.theme;
    console.log(this.note);
    this.dbService.addNote(this.note).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

  updateNote() {
    Object.assign(this.note, this.noteForm.value);
    this.note.user = User.emptySepp();
    this.note.theme = Theme.empty()
    this.note.theme.description = this.noteForm.value.theme;
    this.dbService.updateNote(this.note).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    )
  }
  deleteNote() {
    this.dbService.deleteNote(this.note).then(
      () => {
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }


  getNoteDate() {
    return new Date(this.note.creationDate).toLocaleString();
  }

  getNoteModDate(note: Note){
    return new Date(note.modificationDate).toLocaleString();
  }

  async openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(EditThemeComponent, dialogConfig);
    const data = await dialogRef.afterClosed().toPromise();
    var item = Theme.empty();
    item.description = data;
    this.dbService.addTheme(item).then((result: any) => {
    }).catch((err: any) => {
      this.errorMessage = err;
    });
    this.dbService.getThemesByDescription().then((themes: Theme[]) => {
      this.themes = themes;
    }).catch((err: any) => {
      this.error = err;
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
