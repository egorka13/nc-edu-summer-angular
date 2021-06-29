import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';

interface ITodoList {
  title: string;
  isDone: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, OnChanges {

  @ViewChild('inputEl')
  inputElement: ElementRef;

  title: string = 'Todo list';

  todoList: ITodoList[] = [
    {title: 'First item', isDone: false},
    {title: 'Second item', isDone: false},
    {title: 'Third item', isDone: false},
    {title: 'Fourth item', isDone: false},
    {title: 'Fifth item', isDone: false},
    {title: 'Sixth item', isDone: false},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log()
  }

  onButtonClick(): void {
    if (this.inputElement.nativeElement.value !== '') {
      this.todoList.push({title: this.inputElement.nativeElement.value, isDone: false});
      this.inputElement.nativeElement.value = '';
    }
    console.log(this.todoList);
  }

}
