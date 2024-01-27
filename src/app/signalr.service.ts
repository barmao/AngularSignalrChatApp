import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  
  private hubConnection!: signalR.HubConnection; // Non-null assertion operator

  constructor() {
    // Initialize the hub connection in the constructor
    this.initHubConnection();
  }

    // Retrieve the token from localStorage
  private getAuthToken(): string {
    const userData = localStorage.getItem('userData');
    console.log('User Data from localStorage:', userData); // For debugging
    const user = JSON.parse(userData || '{}');
    return user.token || '';
}

  private initHubConnection(): void {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5268/chatHub', {
        accessTokenFactory: () => this.getAuthToken()
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    // Event handlers
    this.hubConnection.onreconnecting(error => {
      console.log(`Connection lost due to error "${error}". Reconnecting.`);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log(`Connection reestablished. Connected with connectionId "${connectionId}".`);
    });

    this.hubConnection.onclose(error => {
      console.log(`Connection closed due to error "${error}". Try refreshing this page to restart the connection.`);
    });
  }
  
  public startConnection(): void {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.error('Error while starting connection: ' + err));
  }

  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message)
      .catch(err => console.error(err));
  }

  public onReceiveMessage(callback: (user: string, message: string) => void): void {
    this.hubConnection.on('ReceiveMessage', callback);
  }
}
