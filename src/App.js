import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes.js';
import {withRouter} from 'react-router-dom';

function App(props) {
  return (
    <div className="App">
     {props.location.pathname==='/'
     ? null
     : <Nav />
    }
    {routes}

    </div>
  );
}

export default withRouter(App);
