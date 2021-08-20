import React from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import Form from "./Components/Form/Form";

const App = () => {
  return (
    <div className='container'>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/pizza'>
          <Form />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
