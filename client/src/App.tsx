import React, { useEffect } from "react";
import "./App.css"
import { useProvider } from "./context/Provider";
import { AllRoutes } from "./Page/AllRoutes";
import { useNavigate } from "react-router-dom";

const App = () => {

     const navigate = useNavigate()
     const { user } = useProvider()
     console.log('user: ', user);

     useEffect(() => {
          if (!user) return navigate("/register")
     }, [user])

     return (
          <div>
               <AllRoutes />
          </div>
     )
}
export default App