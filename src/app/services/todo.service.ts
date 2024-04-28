import { HttpClient } from '@angular/common/http';
import { Injectable, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Observable,
  catchError,
  filter,
  map,
  retry,
  take,
  tap,
  throwError,
} from 'rxjs';
import { ToDO } from '../interface/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'https://dummyjson.com/todos?limit=5';

  constructor(private http: HttpClient) {
    effect(() => {
      console.log('New value added', JSON.stringify(this.todos()));
    });
  }

  private todos$ = this.http
    .get<ToDO[]>(this.url)
    .pipe(map((res: any) => res.todos));

  todos = toSignal<ToDO[], ToDO[]>(this.todos$, { initialValue: [] });

  updateTodos$ = (todo: ToDO) => {
    this.http
      .post<ToDO>('https://dummyjson.com/todos/add', todo)
      .pipe(
        take(1),
        retry(3),
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong');
        }),
        map((todo: ToDO) => this.todos().push(todo))
      )
      .subscribe();
  };

  deleteTodos$ = (id: number) => {
    this.http
      .delete<ToDO>(`https://dummyjson.com/todos/${id}`)
      .pipe(
        take(1),
        retry(3),
        catchError((error: any) => {
          console.error('An error occurred:', error);
          return throwError('Something went wrong');
        }),
        map((todo: ToDO) => this.todos().filter((res) => res.id !== todo.id))
      )
      .subscribe();
  };
}
