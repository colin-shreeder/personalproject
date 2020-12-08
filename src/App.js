import logo from './logo.svg';
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes.js';
import {withRouter} from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
     {routes}
     {props.location.pathname==='/'
     ? null
     : <Nav />
    }
    </div>
  );
}

export default withRouter(App);
