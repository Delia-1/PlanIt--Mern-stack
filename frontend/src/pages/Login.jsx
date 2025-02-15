import { useState } from "react";
import { loginUser } from "../api/api"; // ✅ Ensure API call works
import { registerUser } from "../api/api"; // ✅ Import register function
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // ✅ Add username for sign-up
  const [isRegistering, setIsRegistering] = useState(false); // ✅ Toggle between login/register

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(username, email, password);
        alert("✅ Account created successfully! Please log in.");
      } else {
        const res = await loginUser(email, password);
        alert(res.message);
        navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "❌ Something went wrong.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? "Sign Up" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
      </form>
      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegistering ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </p>
    </div>
  );
};

export default Login;
