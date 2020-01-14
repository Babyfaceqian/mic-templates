import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../containers/main/views/Main';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'mobx-react';
import stores from '../models';

ReactDOM.render(<Provider {...stores}><ErrorBoundary><Main /></ErrorBoundary></Provider>, document.getElementById('root'));
