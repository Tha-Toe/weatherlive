import React, { useEffect, useState ,useRef } from "react";
import "./right.css";
import SaveItem from "./SaveItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from 'usehooks-ts';
import {motion} from "framer-motion";

function Right ({saveName,deleteSave,openSave}) {

    const [open,setOpen] = useState(false);
    const [offsetWidth,setOffsetWidth] = useState("");

    const rightRef = useRef();
    const matches = useMediaQuery("(max-width : 800px)");


    const leftChange = () => {
        setOpen(!open);
    }
    const close = () => {
        setOpen(false);
    }
    useEffect(() => {
        setOffsetWidth(rightRef.current.offsetWidth);
    },)


    return(
        <div className="right" style={matches && !open? {transform:`translateX(${offsetWidth}px)`} : {transform:`translateX(0px)`}}>
            <motion.div className="rightIcon" onClick={leftChange}
                                whileHover={{
                                    position: "relative",
                                    scale:[1,1.2,1],
                                    transition:{duration: .2},
                                    color: "#2FDE94"
                                }}>
                <FontAwesomeIcon icon={faSquarePlus} />
            </motion.div>
            <div className="rightInner" ref={rightRef}>
                <div className="rightHeadContainer">
                    <div>Saved</div>
                </div>
                <div className="saveItemContainer">
                    {saveName.map((e,index) =><SaveItem e={e} index={index} key = {index} deleteSave = {deleteSave} openSave = {openSave} close = {close}/> )}
                </div>
            </div>
        </div>
    )
}
export default Right;