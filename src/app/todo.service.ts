import {Injectable} from '@angular/core';

export interface ITodoList {
  title: string;
  isDone: boolean;
  isSelected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList: ITodoList[] = [
    {title: 'First item', isDone: false, isSelected: false},
    {title: 'Second item', isDone: false, isSelected: false},
    {title: 'Third item', isDone: false, isSelected: false},
    {title: 'Fourth item', isDone: false, isSelected: false},
    {title: 'Fifth item', isDone: false, isSelected: false},
    {title: 'Sixth item', isDone: false, isSelected: false},
  ];

  addItem(item: ITodoList): void {
    this.todoList.push(item);
  }

  deleteItem(index: number): void {
    this.todoList.splice(index, 1);
  }
}
