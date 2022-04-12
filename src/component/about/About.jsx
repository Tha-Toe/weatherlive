import React from "react";
import "./about.css"

function About () {
    return(
        <div className="abContainer">
            <div className="abHeader">About web</div>
            <span className="abH"><span className="abHi">Hi, </span>I'm Tha Toe,developer of this web.</span>
            <span className="abHistoryP">Web History</span>
            <p className="abHistoryC">This web used open weather Api. 
                It took 2 days to create this web. 
                I was used HTML, Css, JavaScript, React to create it.
                Some of the libraries included are React-Router-Dom, React-Redux-Toolkit, React-Intersection-Observer, 
                Framer-Motion, Font-awesome, axios.
            </p>
            <span className="abHistoryP">How to save city without backend?</span>
            <p className="abHistoryC">
                I use localStorage to save data.
            </p>
            <span className="abThank">Thank you for visit.</span>
        </div>
    )
}
export default About;