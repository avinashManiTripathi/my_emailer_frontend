import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./screens/Landing";
import Steps from "./screens/Steps";
import Form from "./screens/Form";
import Stores from "./screens/Stores";
import Step1 from "./screens/Step1";
import Step2 from "./screens/Step2";
import Share from "./screens/Share";
import Edit from "./screens/Edit";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import UpdateStore from "./screens/updateStore";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar></Navbar>
        <Route exact path="/" component={SignIn}></Route>
        <Route path="/SignIn" component={SignIn}></Route>
        <Route path="/SignUp" component={SignUp}></Route>
        <Route path="/landing" component={Landing}></Route>
        <Route path="/steps" component={Steps}></Route>
        <Route path="/form" component={Form}></Route>
        <Route path="/stores" component={Stores}></Route>
        <Route path="/step1" component={Step1}></Route>
        <Route path="/preview" component={Step2}></Route>
        <Route path="/share" component={Share}></Route>
        <Route path="/edit" component={Edit}></Route>
        <Route path="/logout" component={SignIn}></Route>
        <Route path="/update/store/:id" component={UpdateStore}></Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
