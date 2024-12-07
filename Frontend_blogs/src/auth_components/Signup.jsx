import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from '../axios.js';
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        navigate("/");

      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0" style={{ width: "400px" }}>
        <div className="card-body p-4">
          <h2 className="text-center fs-4 fw-bold text-dark">Signup for Free</h2>
          <p className="text-center fs-6 text-muted">
            Or{" "}
            <Link
              to="/login"
              className="fw-medium text-primary text-decoration-none"
            >
              Login with your account
            </Link>
          </p>

          {error.__html && (
            <div
              className="alert alert-danger text-center"
              dangerouslySetInnerHTML={error}
            ></div>
          )}

          <form onSubmit={onSubmit} className="mt-4">
            <div className="mb-3">
              <label htmlFor="full-name" className="form-label">
                Full Name
              </label>
              <input
                id="full-name"
                name="name"
                type="text"
                required
                value={fullName}
                onChange={(ev) => setFullName(ev.target.value)}
                className="form-control"
                placeholder="Full Name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email-address" className="form-label">
                Email Address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="form-control"
                placeholder="Email Address"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password-confirmation" className="form-label">
                Password Confirmation
              </label>
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                className="form-control"
                placeholder="Password Confirmation"
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
