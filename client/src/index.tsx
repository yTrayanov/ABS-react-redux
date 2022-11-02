import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/store';
import { getInitialStat } from './actions/auth.actions';

store.dispatch(getInitialStat);

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
reportWebVitals();