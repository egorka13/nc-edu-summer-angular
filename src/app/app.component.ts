import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  initialCounterValue: number = 0;

  currentCounterValue: number = 0;

  currentDate: Date;
  isAlive: boolean = true;

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000)

    // setTimeout(() => {
    //   this.isAlive = false;
    // }, 5000)
  }

  ngOnDestroy(): void {

  }

  counterValueChanged(event: number): void {
    this.currentCounterValue = event;
  }
}
