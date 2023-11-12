import React, { useState } from "react";
import "../../scss/login.scss";
import {userLogin} from "../api/login.api";
export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin(login)
      .then((res) => {
        console.log("Login successful:", res);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input
                type="email"
                name="email"
                required
                onChange={(e) =>
                  setLogin((preState) => ({
                    ...preState,
                    email: e.target.value,
                  }))
                }
              />
              <label htmlFor="">Email</label>
            </div>
            <div className="inputbox">
              <ion-icon name="lock-closed-outline"></ion-icon>
              <input
                type="password"
                name="password"
                required
                onChange={(e) =>
                  setLogin((preState) => ({
                    ...preState,
                    password: e.target.value,
                  }))
                }
              />
              <label htmlFor="">Password</label>
            </div>
            <div className="forget">
              <label htmlFor="">
                <input type="checkbox" />
                Remember Me <a href="#">Forget Password</a>
              </label>
            </div>
            <button type="submit">Log in</button>
            <div className="register">
              <p>
                Don't have a account <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
