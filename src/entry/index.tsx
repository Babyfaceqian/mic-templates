import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../modules/main/Main';
import 'core-js';
import ErrorBoundary from '@@components/errorBoundary';
import { Provider } from 'mobx-react';
import stores from '../model';

ReactDOM.render(<Provider {...stores}><ErrorBoundary><Main /></ErrorBoundary></Provider>, document.getElementById('root'));
