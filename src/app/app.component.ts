import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {PrimeNGConfig} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FooterComponent} from "./shared/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  private primengConfig = inject(PrimeNGConfig);

  constructor() {
    this.primengConfig.ripple = true;
  }
}
