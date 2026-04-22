import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./success.css";

function SuccessPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try{
        const data = localStorage.getItem("users");
        const parsed = data ? JSON.parse(data) : [];
        setUsers(parsed);
    }catch(e){
        console.error("Invalid JSON , resetting");
        localStorage.removeItem("users");
        setUsers([]);
    }
   
  }, []);

  return (
    <div className="container">
      <div className="form" style={{ width: "600px" }}>
        <h2>Registered Users</h2>
        {users.length === 0 ? (
          <p>No Users yet</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>SNo</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button style={{marginTop: "20px"}}
        onClick={() => navigate("/")}
        >Add More Users</button>
      </div>
    </div>
  );
}
export default SuccessPage;
