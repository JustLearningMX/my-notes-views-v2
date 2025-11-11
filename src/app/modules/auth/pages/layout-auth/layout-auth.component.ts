import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../../../shared/components/footer/footer.component";
import {SharedHeaderComponent} from "../../../../shared/components/header/shared-header.component";

@Component({
  selector: 'app-layout-auth',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    SharedHeaderComponent
  ],
  templateUrl: './layout-auth.component.html',
  styleUrl: './layout-auth.component.css'
})
export default class LayoutAuthComponent {

}
