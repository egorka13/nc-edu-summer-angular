import {Injectable} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface ITodoList {
  id?: number;
  title: string;
  userId?: number;
  completed: boolean;
  isSelected: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList$: Subject<ITodoList[]> = new Subject<ITodoList[]>();

  public currentDate$: Observable<Date> = interval(1000).pipe(map(() => new Date()));

  public todoList: ITodoList[] = [
    {title: 'First item', completed: false, isSelected: false},
    {title: 'Second item', completed: false, isSelected: false},
    {title: 'Third item', completed: false, isSelected: false},
    {title: 'Fourth item', completed: false, isSelected: false},
    {title: 'Fifth item', completed: false, isSelected: false},
    {title: 'Sixth item', completed: false, isSelected: false},
  ];

  constructor(private http: HttpClient) {
  }

  public getTodoList(): Observable<ITodoList[]> {
    return this.http.get<ITodoList[]>('https://jsonplaceholder.typicode.com/todos');
  }

  public getTodoItem(id: number): Observable<ITodoList> {
    return this.http.get<ITodoList>('https://jsonplaceholder.typicode.com/posts', {
      params: {
        'userId': id
      }
    });
  }

  public updateTodoItem(): Observable<ITodoList> {
    return this.http.put<ITodoList>('https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'Tessssst',
      body: 'Test',
      userId: 13,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  addItem(item: ITodoList): void {
    this.todoList.push(item);
  }

  deleteItem(index: number): void {
    this.todoList.splice(index, 1);
  }
}
