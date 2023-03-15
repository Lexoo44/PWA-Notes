import { Component, OnInit } from '@angular/core';
import { DbService } from '../shared/dbService';
import { Note } from '../shared/note';

@Component({
  selector: 'no-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {

  }


}
