import React from "react";
import "./saveItem.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SaveItem ({e,index,deleteSave,openSave,close}) {
    return(
        <div className="itemContainer">
            <div className="cityNameContainer" onClick={() =>{ openSave(e); close();}}>
                <div className="itemIndex">{index+1} .</div>
                <div className="itemName">{e}</div>
            </div>
            <FontAwesomeIcon icon={faTrash} className="trashIcon" onClick={() => deleteSave(e)}/>
        </div>
    )
}