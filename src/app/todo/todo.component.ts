import {Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

interface ITodoList {
  title: string;
  isDone: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, OnChanges {

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    console.log(event.target)
  }

  @ViewChild('inputEl')
  inputElement: ElementRef;

  inputValue: string = '';
  title: string = 'Todo list';
  isEditMode: boolean = false;

  todoList: ITodoList[] = [
    {title: 'First item', isDone: false, isSelected: false},
    {title: 'Second item', isDone: false, isSelected: false},
    {title: 'Third item', isDone: false, isSelected: false},
    {title: 'Fourth item', isDone: false, isSelected: false},
    {title: 'Fifth item', isDone: false, isSelected: false},
    {title: 'Sixth item', isDone: false, isSelected: false},
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  onAddButtonClick(): void {
    if (this.inputElement.nativeElement.value !== '') {
      if (this.isEditMode) {
        const selectedItem: ITodoList = this.todoList.filter(item => item.isSelected)[0];
        selectedItem.title = this.inputValue;
        this.isEditMode = false;
        this.inputValue = '';
      } else {
        this.todoList.push({title: this.inputElement.nativeElement.value, isDone: false, isSelected: false});
        this.inputValue = '';
        this.isEditMode = false;
      }
    }
  }

  onDeleteButtonClick(): void {
    const selectedItem: ITodoList = this.todoList.filter(item => item.isSelected)[0];
    const index: number = this.todoList.indexOf(selectedItem);
    if (index > -1) {
      this.todoList.splice(index, 1);
      this.isEditMode = false;
      this.inputValue = '';
    }
  }

  onItemClick(item: ITodoList, index: number): void {
    if (this.todoList.some(item => item.isSelected)) {
      this.todoList.forEach(item => item.isSelected = false);
    }

    this.isEditMode = true;
    this.inputValue = item.title;
    this.todoList[index].isSelected = true;
  }

}
