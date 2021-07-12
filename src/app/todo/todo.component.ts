import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostListener, Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {ITodoList, TodoService} from '../todo.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit, AfterViewInit, OnChanges {

  @HostListener('document:click', ['$event.target'])
  onDocumentClick(event: MouseEvent) {
    console.log(event)
  }

  @Input()
  date: Date;

  @ViewChild('inputEl')
  inputElement: ElementRef;

  @ContentChild('todoTitle')
  todoTitle: ElementRef;

  inputValue: string = '';
  title: string = 'Todo list';
  isEditMode: boolean = false;

  todoList: ITodoList[] = [];

  constructor(public todoService: TodoService) {
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.todoService.currentDate$.subscribe((value: Date) => console.log(value));

    this.todoService.getTodoList()
      .pipe(
        filter(value => !!value)
      )
      .subscribe((todoList: ITodoList[]) => {
        this.todoList = [...todoList];
      });

    this.todoService.getTodoItem(1)
      .pipe(
        filter(value => !!value)
      )
      .subscribe((todoItem: ITodoList) => {
        console.log(todoItem);
      });

    this.todoService.updateTodoItem().subscribe();
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
    this.todoTitle.nativeElement.textContent = this.todoTitle.nativeElement.textContent + '123';
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('ngOnChanges', changes)
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

  onAddButtonClick(): void {
    if (this.inputElement.nativeElement.value !== '') {
      if (this.isEditMode) {
        const selectedItem: ITodoList = this.todoService.todoList.filter(item => item.isSelected)[0];
        selectedItem.title = this.inputValue;
        this.isEditMode = false;
        this.inputValue = '';
      } else {
        this.todoService.addItem({title: this.inputElement.nativeElement.value, completed: false, isSelected: false});
        this.inputValue = '';
        this.isEditMode = false;
      }
    }
  }

  onDeleteButtonClick(): void {
    const selectedItem: ITodoList = this.todoService.todoList.filter(item => item.isSelected)[0];
    const index: number = this.todoService.todoList.indexOf(selectedItem);
    if (index > -1) {
      this.todoService.deleteItem(index);
      this.isEditMode = false;
      this.inputValue = '';
    }
  }

  onItemClick(item: ITodoList, index: number): void {
    if (this.todoService.todoList.some(item => item.isSelected)) {
      this.todoService.todoList.forEach(item => item.isSelected = false);
    }

    this.isEditMode = true;
    this.inputValue = item.title;
    this.todoService.todoList[index].isSelected = true;
  }

}
