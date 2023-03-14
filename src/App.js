import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Header1 from './components/Header1';
import Join from './components/Join';

function App() {
  return (
    <div className="App">
      <Header1></Header1>
      <Switch>
        <Route path='/' component={Home} exact={true}></Route>     
        <Route path='/login' component={Login}></Route> 
        <Route path='/join' component={Join}></Route>     
      </Switch>

    </div>
  );
}

export default App;
