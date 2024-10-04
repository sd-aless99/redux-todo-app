import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../../filter/filter.actions';
import { remove } from '../todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrl: './todo-footer.component.css'
})
export class TodoFooterComponent {

  currentFilter: actions.validFilters = 'all';
  filterArray: actions.validFilters[] = ['all','active','completed'];
  todos: Todo[] = [];

  activeTodo: number = 0;

  constructor(private store: Store<AppState>) {
    // this.store.select('filtro').subscribe( filtro => { this.filtroActual = filtro;});
    this.store.subscribe( state => {
      this.currentFilter = state.filter;
      this.activeTodo = state.todos.filter(todo => !todo.completed).length;
      this.todos = state.todos;
    });
  }

  changeFilter( filter: actions.validFilters) {
    this.store.dispatch(actions.setFilter({filter: filter}))
  }

  removeCompleted() {
    this.todos.filter(todo => {
      if (todo.completed) {
        this.store.dispatch(remove({id: todo.id}));
      }
    })
  }
}