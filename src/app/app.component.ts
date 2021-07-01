import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  initialCounterValue: number = 0;

  currentCounterValue: number = 0;

  counterValueChanged(event: number): void {
    this.currentCounterValue = event;
  }
}
