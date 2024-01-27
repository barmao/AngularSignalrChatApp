import { Component, OnInit } from '@angular/core';
import { SignalrService } from '../signalr.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: string[] = [];
  public userName: string = '';
  public message: string = '';

  constructor(public signalrService: SignalrService) { }

  // Inside ChatComponent
  ngOnInit(): void {
    this.signalrService.startConnection();
    this.signalrService.onReceiveMessage((user, message) => {
      this.messages.push(user + ": " + message);
    });
  }


  sendMessage(): void {
    this.signalrService.sendMessage(this.userName, this.message);
  }
}
