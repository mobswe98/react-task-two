import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

function FormPage(){
    const[name , setName] = useState("");
    const[email, setEmail] = useState("");
    const[errors, setErrors] = useState("");

    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};

        if(!name.trim()){
            newErrors.name= "Name is required";
        }else if(!/\S+@\S+\.\S+/.test(email)){
            newErrors.email = "Invalid email format";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(validate()){
            const newUser = {name,email};
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

            const updatedUsers = [...storedUsers,newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            console.log("Saved Users:", updatedUsers);
            navigate("/success");
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Students Data Sheet</h2>

         <div className= "input-group">
            <label>Name</label>
            <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
         </div>

         <div className="input-group">
         
         <label>Email</label>
         <input
         type="text"
         value={email}
         onChange={(e) => setEmail(e.target.value)}/></div>
         {errors.email && <p className="error">{errors.email}</p>}
          <button type="submit">Submit</button>
            </form>
        </div>
       
    );
}

export default FormPage;