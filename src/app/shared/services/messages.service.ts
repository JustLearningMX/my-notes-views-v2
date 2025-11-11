import {inject, Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messageService = inject(MessageService);

  showMessage(message: string, summary: string, severity: string): void {
    this.messageService.add({
      key: 'toast',
      severity: severity,
      summary: summary,
      detail: message,
    });
  }
}
