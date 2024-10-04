import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';
import { edit } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @ViewChild('textBox') txtInputBox!: ElementRef;

  chkCompleted!: FormControl;
  txtInput!: FormControl;

  editing: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.chkCompleted = new FormControl(this.todo.completed);
    this.txtInput = new FormControl(this.todo.text, Validators.required);
    this.chkCompleted.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggle({id: this.todo.id}));
    });
  }

  editTodo() {
    this.editing = true;
    this.txtInput.setValue(this.todo.text);

    setTimeout( () =>{
      this.txtInputBox.nativeElement.select();
    }, 1);
  }

  finishEdit() {
    this.editing = false;

    if (this.txtInput.invalid) {return;}
    if (this.txtInput.value === this.todo.text) {return;}
    
    this.store.dispatch(actions.edit({
      id: this.todo.id,
      text: this.txtInput.value
    }));
  }

  removeTodo() {
    this.store.dispatch(actions.remove({id: this.todo.id}));
  }
}
