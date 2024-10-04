import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState : Todo[] = [];

const _todoReducer = createReducer(
    initialState,
    //el {} y [...state] es desestructuracion, asi devuelve algo nuevo en lugar de mutar
    on(actions.add, (state, {text}) => [...state, new Todo(text)]),
    //state.filter devuelve todos los elementos de un array que cumplen la condicion establecida
    //en este caso devuelve todos los todos cuyo id es diferente al que le paso
    on(actions.remove, (state, {id}) => state.filter(todo=>todo.id != id)),
    on(actions.toggle, (state, {id}) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                ...todo,
                completed: !todo.completed
                }
            } else {
                return todo;
            }
        });
    }),
    on(actions.edit, (state, {id, text}) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                ...todo,
                text: text
                }
            } else {
                return todo;
            }
        });
    }),
    on(actions.toggleAll, state => state.map(todo => {
        return {
        ...todo,
        completed: !todo.completed
        }
    }))
);

//IMPORTANTE declarar tipos de los parametros
export function todoReducer(state: Todo[] = initialState , action: Action){
    return _todoReducer(state, action);
}