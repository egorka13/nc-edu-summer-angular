import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent {

  @Input()
  counter: number = 0;

  @Output()
  counterValueChanged: EventEmitter<number> = new EventEmitter<number>();

  onIncrement(): void {
    ++this.counter;
    this.counterValueChanged.emit(this.counter);
  }

  onDecrement(): void {
    --this.counter;
    this.counterValueChanged.emit(this.counter);
  }

}
