import { createStore as createReduxStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'state/rootReducer'

export const createStore = initialState => {
  global.store = createReduxStore(rootReducer, initialState, applyMiddleware(thunk))
}

export const onStoreUpdate = callback => {
  let unsubscribe = store.subscribe(() => {
    callback(store.getState())
    unsubscribe()
  })
}
