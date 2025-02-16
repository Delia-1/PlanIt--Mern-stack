import { useState } from "react";
import { loginUser, registerUser } from "../api/api"; // ✅ API functions
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ For sign-up
  const [isRegistering, setIsRegistering] = useState(false); // ✅ Toggle login/register

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(username, email, password);
        alert("✅ Account created successfully! Please log in.");
      } else {
        await loginUser(email, password);
        navigate("/"); // ✅ Redirect to main page after login
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Something went wrong.");
    }
  };

  return (
    <div className="login-container mt-5 d-flex flex-column align-items-center">
      <h2>{isRegistering ? " Please Sign Up and create you Todo List" : "Please Login to access your Todo list!🤘"}</h2>
      <form className="formGroup d-flex flex-column align-items-center m-3 w-50" onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            className="form-control mb-2 "
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input
          className="form-control mb-2 "
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="form-control mb-2 "
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="btn btn-success" type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
      </form>
      <p
        onClick={() => setIsRegistering(!isRegistering)}
        style={{ cursor: "pointer", color: "blue" }}
      >
        {isRegistering ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Login;
