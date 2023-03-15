import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DbService } from '../shared/dbService';
import { Note } from '../shared/note';

@Component({
  selector: 'no-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {

  note!: Note;
  errorMessage!: String;
  noteForm!: FormGroup;

  constructor(private fb: FormBuilder, private dbService: DbService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.dbService.getNoteById(this.route.snapshot.params.id).then(
      (note) => {
        this.note = note;
        console.log(this.note);
      },
    )
    const note: Note = Note.empty()
    this.noteForm = this.fb.group({
      title: [note.title, [Validators.required, Validators.minLength(1)]],
      theme: [note.theme, [Validators.required, Validators.minLength(1)]],
      creationDate: [note.creationDate, [Validators.required]],
      modificationDate: [note.modificationDate, [Validators.required]],
      text: [note.text, [Validators.required, Validators.minLength(1)]],
    }

    )
  }
  newNote() {
    this.dbService.addNote(this.noteForm.value).then(
      () => {
        this.router.navigate(['/notizen'])
      }
    ).catch(
      (error) => {
        this.errorMessage = error.message;
      }
    )
  }

}
