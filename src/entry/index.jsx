import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../modules/main/Main';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from '../model';

let store = createStore(reducers)

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('root'));
