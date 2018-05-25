import './initializeAppData';
import React from 'react';
import {render} from 'react-dom';
import RootComponent from './Components/RootComponent';
import {createStore} from 'redux';
import rootReducer from './Reducer/rootReducer';

let store = createStore(rootReducer);

render(
  <RootComponent store={store} />,
  document.getElementById('app')
)
