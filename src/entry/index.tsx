import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../modules/main/Main';
import ErrorBoundary from '@@components/errorBoundary';

ReactDOM.render(<ErrorBoundary><Main /></ErrorBoundary>, document.getElementById('root'));
