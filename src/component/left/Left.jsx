import { faFeatherPointed, faHouseChimney, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState ,useRef } from "react";
import "./left.css";
import { useMediaQuery } from 'usehooks-ts';
import {motion} from "framer-motion";

function Left ({homeClick,aboutClick,contactClick,homeOpen,aboutOpen,contactOpen,leftOpen,leftChange,leftClose}) {

    const [offsetWidth,setOffsetWidth] = useState("");

    const leftRef = useRef();
    const matches = useMediaQuery("(max-width : 800px)");


    useEffect(() => {
        setOffsetWidth(leftRef.current.offsetWidth);
    },)
    
    return (
        <>
            <div  className={`leftContainer ${leftOpen? "leftOrigin" : ""}`} style={matches && !leftOpen? {transform:`translateX(-${offsetWidth}px)`} : {transform:`translateX(0px)`}} >
                <div className = "leftInnerContainer" ref = {leftRef}>
                    <div  className={`leftChild ${homeOpen? "blue" : ""}`} onClick={() =>{ homeClick(); leftClose();}}>
                        <div className="innerChild">
                            <FontAwesomeIcon icon={faHouseChimney} className="leftIcon"/>
                            <span className="leftInnerChild">HOME</span>
                        </div>
                    </div>
                    <div className={`leftChild ${aboutOpen? "blue" : ""}`} onClick={() =>{ aboutClick(); leftClose();}}>
                        <div className="innerChild">
                            <FontAwesomeIcon icon={faFeatherPointed} className="leftIcon"/>
                            <span className="leftInnerChild">About</span>
                        </div>
                    </div>
                    <div className={`leftChild ${contactOpen? "blue" : ""}`} onClick={() =>{ contactClick(); leftClose();}}>
                        <div className="innerChild">
                            <FontAwesomeIcon icon={faPaperPlane} className="leftIcon"/>
                            <span className="leftInnerChild">Contact</span>
                        </div>
                    </div>
                </div>
                <motion.div className="mobileLeftIcon" 
                    onClick={leftChange}
                    whileHover={{
                        position: "relative",
                        scale:[1,1.2,1],
                        transition:{duration: .2},
                        color: "#06DD8E",
                    }}>
                    <>
                    <motion.div className={`mLIcon ${leftOpen ? "ione" :""}`}></motion.div>
                    <motion.div className={`mLIcon ${leftOpen ? "itwo" :""}`}></motion.div>
                    <motion.div className={`mLIcon ${leftOpen ? "ithree" :""}`}></motion.div>
                    </>
                </motion.div>
            </div>
        </>
    )
}

export default Left;
