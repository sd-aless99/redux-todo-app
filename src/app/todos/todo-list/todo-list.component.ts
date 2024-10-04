import { Component } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { validFilters } from '../../filter/filter.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

  todos: Todo[] = [];
  currentFilter!: validFilters;

  constructor(private store: Store<AppState>) {
    // this.store.select('todos').subscribe(todos => this.todos = todos);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.store.subscribe( state => {
      this.todos = state.todos;
      this.currentFilter = state.filter;
    });
  }
}
