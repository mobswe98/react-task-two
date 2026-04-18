import react from "react";
import { useLocation } from "react-router-dom";

function SuccessPage(){
    const location = useLocation();
    const name = location.state?.name || "User";

    return (
        <div style={{ textAlign:"center", marginTop: "100px" }}>
            <h1>Welcome, {name}</h1>
            <p> Your Data submitted Successfully!!</p>
        </div>
    );

}
export default SuccessPage;