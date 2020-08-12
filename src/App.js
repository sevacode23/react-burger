import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import ContactData from './containers/ContactData/ContactData'
import Orders from './containers/Orders/Orders'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/contact" component={ContactData} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
