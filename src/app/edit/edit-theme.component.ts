import { Component, Inject, OnInit } from '@angular/core';
import { Theme } from '../shared/theme';
import { Note } from '../shared/note';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbService } from '../shared/dbService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeValidator } from '../shared/themeValidator';
@Component({
  selector: 'no-edit-theme',
  templateUrl: './edit-theme.component.html',
  styleUrls: ['./edit-theme.component.scss']
})

export class EditThemeComponent implements OnInit {

  item: any = this.data;
  errorMessage: string = '';
  themeForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Theme | Note, private dbService: DbService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.themeForm = this.fb.group({
    description: [this.item?.description, [Validators.required, /*ThemeValidator.themeExists(this.dbService) */]],
    })
  }

  isTheme(): boolean {
    return this.item != null && this.item.hasOwnProperty('description') ? true : false;
  }

  handleUpdateTheme(description: string) {
    this.item.description = description;
    this.dbService.updateTheme(this.item).then((result: any) => {
    }).catch((err: any) => {
      this.errorMessage = err;
    });
  }

  handelDeleteTheme() {
    this.dbService.deleteTheme(this.item).then((result: any) => {
    }).catch((err: any) => {
      this.errorMessage = err;
    });
  }

  handleAddTheme(description: string) {
    if (description == null || description == '') {
      this.errorMessage = 'Bitte geben Sie einen Themenamen ein!';
    } else {
      this.item = Theme.empty();
      this.item.description = description;
      this.dbService.addTheme(this.item).then((result: any) => {
      }).catch((err: any) => {
        this.errorMessage = err;
      });
    }
  }


}
