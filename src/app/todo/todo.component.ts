import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDO } from '../interface/Todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  task = '';
  todos = [
    {
      id: 1,
      todo: 'Do something nice for someone I care about',
      completed: false,
    },
    {
      id: 2,
      todo: 'Memorize the fifty states and their capitals',
      completed: false,
    },
    {
      id: 3,
      todo: 'Watch a classic movie',
      completed: false,
    },
    {
      id: 4,
      todo: 'Contribute code or a monetary donation to an open-source software project',
      completed: false,
    },
    {
      id: 5,
      todo: "Solve a Rubik's cube",
      completed: false,
    },
  ];
  todosList = signal<ToDO[]>(this.todos);
  isEdit = false;
  editTodo: ToDO | undefined = undefined;

  constructor() {
    effect(() => {
      console.log(this.todosList());
    });
  }

  addTodo(): void {
    // cretae a new todo
    const newTodo: ToDO = {
      id: this.todosList().length + 1,
      todo: this.task,
      completed: false,
    };

    if (newTodo?.todo) {
      // Update the todosList signal by adding new todo
      this.todosList.update((values) => [...values, newTodo]);
    }
    this.task = '';
  }

  deleteTodo(id: number): void {
    // Update the todosList signal by removing the selected todo
    this.todosList.update((todos) =>
      todos.filter((values) => values.id !== id)
    );
  }

  updateTodo(): void {
    const todo = this.editTodo;
    if (todo) {
      todo.todo = this.task;

      this.todosList.update((todos) =>
        todos.map((value) => (value.id === todo.id ? todo : value))
      );

      this.isEdit = false;
      this.task = '';
    }
  }

  checkboxToggle(todo: ToDO): void {
    todo.completed = !todo.completed;

    this.todosList.update((todos) =>
      todos.map((value) => (value.id === todo.id ? todo : value))
    );
  }
}
