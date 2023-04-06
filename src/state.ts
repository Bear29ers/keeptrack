import { AnyAction, EmptyObject, PreloadedState, Store, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const reducer = combineReducers({});

const configureStore = (preloadedState: PreloadedState<any>): Store<EmptyObject, AnyAction> => {
  const middlewares = [ReduxThunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // Thunk is middleware
  // DevTools is an enhancer (actually changes Redux)
  // applyMiddleware wraps middleware and returns an enhancer

  // to use only thunk middleware
  // const enhancer = compose(middlewareEnhancer)

  // to use thunk & devTools
  const enhancer = composeWithDevTools(middlewareEnhancer);

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const initialAppState: AppState = {};

export const store = configureStore(initialAppState);
