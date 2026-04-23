import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase_config";
import { useNavigate } from "react-router-dom";
import "./form.css";

function FormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if(name.trim().length <= 3){
      newErrors.name = "Please enter a valid name";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const newUser = { name, email };
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      console.log("Saved Users:", updatedUsers);
      navigate("/success");
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const newUser = {
        name: user.displayName,
        email: user.email,
      };

      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      if (storedUsers.some((u) => u.email === newUser.email)) {
        alert("User already exists");
        navigate("/success");
        return;
      }
      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      navigate("/success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Students Data Sheet</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p className="error">{errors.name}</p>}
        <div className="input-group">
          <label>Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
        <button type="submit">Submit</button>
        <p style={{ textAlign: "center", margin: "10px 0" }}> OR </p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="google-btn"
        >
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default FormPage;
