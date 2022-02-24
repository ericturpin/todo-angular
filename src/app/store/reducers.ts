import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export let metaReducers: MetaReducer<any>[] = !environment.production ? [logger] : [];

export const appReducers: ActionReducerMap<any> = {};
