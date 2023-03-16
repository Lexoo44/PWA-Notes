import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { EditThemeComponent } from '../edit/edit-theme.component';
import { DbService } from '../shared/dbService';
import { Theme } from '../shared/theme';

@Component({
  selector: 'no-themen',
  templateUrl: './themen.component.html',
  styleUrls: ['./themen.component.scss']
})
export class ThemenComponent implements OnInit {
  themes: Theme[] = [];
  error: string = '';
  constructor(private dialog: MatDialog, private dbService: DbService) { }

  ngOnInit(): void {
    this.dbService.getThemesByDescription().then((themes: Theme[]) => {
      this.themes = themes;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  async openModal(theme: Theme | undefined) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data! = theme;
    const dialogRef = this.dialog.open(EditThemeComponent, dialogConfig);
    const data = await dialogRef.afterClosed().toPromise();
    this.dbService.getThemesByDescription().then((themes: Theme[]) => {
      this.themes = themes;
    }).catch((err: any) => {
      this.error = err;
    });
  }
}

