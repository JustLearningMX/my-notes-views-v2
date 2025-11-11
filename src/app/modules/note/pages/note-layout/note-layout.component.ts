import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SharedHeaderComponent} from "../../../../shared/components/header/shared-header.component";

@Component({
  selector: 'app-note-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedHeaderComponent
  ],
  templateUrl: './note-layout.component.html',
  styleUrl: './note-layout.component.css'
})
export default class NoteLayoutComponent {

}
