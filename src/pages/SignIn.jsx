import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Home from "./Home";
import AddEdit from "./AddEdit";
import Header from "../components/Header";
import About from "./About";
import View from "./View";
import { toast, ToastContainer } from "react-toastify";
import "./SignIn.css";

const SignIn = () => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const searchUser = async (user,pass) => {
    const body = {user,pass}
    const res = await axios.post("http://localhost:8000/login/searchUser", body);
    if (res.status === 200) {
      return (
        <>
          <BrowserRouter>
            <div className="App">
              <Header />
              <ToastContainer position="top-center" />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/add" component={AddEdit} />
                <Route path="/update/:id" component={AddEdit} />
                <Route path="/view/:id" component={View} />
                <Route path="/about" component={About} />
              </Switch>
            </div>
          </BrowserRouter>
        </>
      );
    } else {
      toast.error("Error!");
    }
  };

  const userLogin = (e) => {
    e.preventDefault();
    if (!user || !pass) {
      toast.error("Please provide value into each input field");
    } else {
      searchUser(user, pass);
    }
  };

  useEffect(() => {
    console.log("Done");
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={userLogin}
      >
        <label htmlFor="user">User</label>
        <input
          type="text"
          id="user"
          name="user"
          placeholder="User or mail here..."
          onChange={(e) => setUser(e.target.value)}
        />
        <br />

        <label htmlFor="pass">Password</label>
        <input
          type="password"
          id="pass"
          name="pass"
          placeholder="Type your password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SignIn;
