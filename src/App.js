import React,{Fragment} from 'react';
import GlobalState from './context/globaState';
import  Navbar  from './components/Navbar';
import Search from './components/Search';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

function App() {
  return (
    <GlobalState>
        <Router>
        <Fragment>
            <Navbar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route  path="/repoadd" component={Search} />
            </Switch>
          </Fragment>
			</Router>
    </GlobalState>
  );
}

export default App;
