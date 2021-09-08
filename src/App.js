import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./screens/Landing";
import Steps from "./screens/Steps";
import Stores from "./screens/Stores";
import Step1 from "./screens/Step1";
import Share from "./screens/Share";
import Edit from "./screens/Edit";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import UpdateStore from "./screens/updateStore";
import Protected from "./Protected/Protected";

import "react-toastify/dist/ReactToastify.css";
import Preview from "./screens/Preview";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component={SignIn}></Route>
          <Route path="/SignIn" component={SignIn}></Route>
          <Route path="/SignUp" component={SignUp}></Route>
          <Route path="/landing">
            <Protected Cmp={Landing}></Protected>
          </Route>
          <Route path="/steps">
            <Protected Cmp={Steps}></Protected>
          </Route>
          {/* <Route path="/form">
            <Protected Cmp={Form}></Protected>
          </Route> */}
          <Route path="/stores">
            <Protected Cmp={Stores}></Protected>
          </Route>
          <Route path="/step1">
            <Protected Cmp={Step1}></Protected>
          </Route>
          <Route path="/preview">
            <Protected Cmp={Preview}></Protected>
          </Route>
          <Route path="/share">
            <Protected Cmp={Share}></Protected>
          </Route>
          <Route path="/edit">
            <Protected Cmp={Edit}></Protected>
          </Route>
          <Route path="/logout">
            <Protected Cmp={SignIn}></Protected>
          </Route>
          <Route path="/update/store/:id">
            <Protected Cmp={UpdateStore}></Protected>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
