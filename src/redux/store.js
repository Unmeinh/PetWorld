import { createStore } from 'redux';
import rootReducer from './reducers/allReducers';
const store  = createStore(rootReducer);
export default store;