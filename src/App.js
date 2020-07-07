import React, {Component} from 'react';
import logo from './logo.svg';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/layout'
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders';

class App extends Component {
  render(){
  return (
    <div>
      <Layout>
        <Switch>
      <Route path="/checkout"  component={Checkout} />
      <Route path="/orders"  component={Orders} />
       <Route path="/" exact component={Burgerbuilder} />
       </Switch>
      </Layout>
    </div>
  );
  }
}

export default App;
