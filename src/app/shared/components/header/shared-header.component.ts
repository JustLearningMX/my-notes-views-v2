import {Component, inject, OnInit, signal} from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../modules/auth/services/auth.service";
import {MenubarModule} from "primeng/menubar";
import {MenuModule} from "primeng/menu";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";

@Component({
  selector: 'shared-header',
  templateUrl: './shared-header.component.html',
  standalone: true,
  imports: [
    ToolbarModule,
    ButtonModule,
    RouterLink,
    MenubarModule,
    MenuModule
  ],
  styleUrl: './shared-header.component.css'
})
export class SharedHeaderComponent implements OnInit {

  private router = inject(Router);
  authService = inject(AuthService);
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Notes',
        icon: 'pi pi-fw pi-file',
        command: () => this.router.navigate(['/'])
      },
      {
        label: 'Archived Notes',
        icon: 'pi pi-fw pi-file',
        command: () => this.router.navigate(['/notes/archived'])
      }
    ];
  }

}
