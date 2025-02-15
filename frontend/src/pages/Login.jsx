import { useState } from "react";
import { loginUser } from "../api/api"; // ✅ Ensure `api.js` exists in `frontend/src/api/`

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password); // ✅ Call imported `loginUser()`
      alert(res.message);
      window.location.reload(); // Reload the app to update authentication state
    } catch (err) {
      alert(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
