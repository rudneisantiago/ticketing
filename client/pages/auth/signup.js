import { useState } from "react";
import axios from "axios";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });

      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <main className="d-flex p-4 vh-100 align-items-center justify-content-center">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Email Address
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            className="form-control"
          />
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger">
            <span>Ooops... </span>
            <ul className="my-0">
              {errors.map((error) => {
                return <li key={error.message}>{error.message}</li>;
              })}
            </ul>
          </div>
        )}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </main>
  );
};
