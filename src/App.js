import React from 'react';
import Navbar from './Components/Navbar'
import {Switch , Route} from 'react-router-dom'
import AppTemplate from './Components/AppTemplate'
import Dashboard from './Components/Dashboard'
import Invoices from './Components/Invoices'

import './App.css';
import Home from './Components/Home';
import Integrations from './Components/Integrations';


const App = () => {
  return (
    <div>
      <Navbar/>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/app" component={AppTemplate}/>
        <Route path="/invoices" component={Invoices}/>
        <Route path="/integrations" component={Integrations} />
    </Switch>
    </div>
  );
}

export default App;
