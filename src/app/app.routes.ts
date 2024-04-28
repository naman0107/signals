import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CartComponent } from './cart/cart.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
];
