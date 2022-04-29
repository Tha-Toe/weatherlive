import React from "react";
import "./contact.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser,faSquarePhone,faMapLocationDot,faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faGithub,faFacebook} from "@fortawesome/free-brands-svg-icons";
import {useInView} from "react-intersection-observer";
import {useEffect,useState} from "react";


export default function Contact () {

    const [viewed,setViewed] = useState(false);

    const {ref: lgRef, inView: lgVisible} = useInView();
  
    useEffect(() => {
      if(lgVisible) {
        setViewed(true);
      }
    },[lgVisible])

    return(
        <div className="contactContainer">
            <div className="contactHeader">Contact Developer</div>
            <div className="contactMid"  ref={lgRef}>
                <div className={`${"contactLeft"} ${viewed? "cLAnimation" : ""}`}>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faUser} className="addressIcon" />
                            <div className="addressNote">Tha Toe Saung</div>
                    </div>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faSquarePhone} className="addressIcon" />
                            <div className="addressNote">09773159335</div>
                    </div>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faMapLocationDot} className="addressIcon" />
                            <div className="addressNote">Taungoo, Myanmar</div>
                    </div>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faEnvelope} className="addressIcon" />
                            <div className="addressNote">thatoesaung510dev@gmail.com</div>
                    </div>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faGithub} className="addressIcon" />
                            <a className="addressNote addressLink" href="https://github.com/Tha-Toe">Tha-Toe</a>
                    </div>
                    <div className="addressContainer">
                        <FontAwesomeIcon icon = {faFacebook} className="addressIcon" />
                            <a href="https://www.facebook.com/tha.toe.906" className="addressNote addressLink">Tha Toe</a>
                    </div>
                </div>
            </div>
        </div>
    )
}