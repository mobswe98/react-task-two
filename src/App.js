import React from "react";
import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import FormPage from "./components/formPage";
import SuccessPage from "./components/successPage";

function App(){
  return (
    <Router>
     <Routes>
       <Route path = "/" element= {<FormPage />}></Route>
       <Route path = "/success" element={<SuccessPage/>} ></Route>
     </Routes>
    </Router>
  );
}

export default App;