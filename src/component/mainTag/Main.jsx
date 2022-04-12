import React, { useEffect, useRef, useState } from "react";
import "./main.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlassLocation} from "@fortawesome/free-solid-svg-icons";
import Right from "../right/Right";
import Left from "../left/Left";
import About from "../about/About";
import Contact from "../contact/Contact";
import {useInView} from "react-intersection-observer";
import {motion} from "framer-motion";

function Main () {
    const inputRef = useRef();
    const [currDate,setCurrDate] = useState("");
    const [searchName,setSearchName] = useState("Mandalay");
    const apiKey = "f1b9308bdbdde4bf52b11b801df79221";
    const [cityName,setCityName] = useState("");
    const [temperature,setTemperature] = useState("");
    const [condition,setCondition] = useState("");
    const [windSpeed,setWindSpeed] = useState();
    const [icon,setIcon] = useState();
    const [err,setErr] = useState();
    const [saveName,setSaveName] = useState([]);
    const [saved,setSaved] = useState(false);

    setInterval(() => {
        setCurrDate(new Date().toLocaleString());
    },1000)

    const findCity = async(e) => {
        setErr("");
        if(e) {
            e.preventDefault();
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchName}&appid=${apiKey}&units=metric`)
                        .then(res=> res.json())
                        .catch(err => console.log(err));
//        console.log(response);
        if(response.message) {
            setErr(response.message);
            inputRef.current.value = "";
        }
        setCityName(response.name);
        setTemperature(response.main.temp);
        setCondition(response.weather[0].description);
        setWindSpeed(response.wind.speed);
        setIcon(response.weather[0].icon)
        inputRef.current.value = "";
    }
    useEffect(() => {
        findCity();
    },[])


    const removeError = () => {
        setErr("");
    }

    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("storage"));
        setSaveName(localStorageData? localStorageData : []);
    },[])





    const save =() => {
        let found = saveName.find(eachName => eachName === cityName);
        if(found) return;
        if(!cityName) return;
//        console.log(found);
        setSaveName([...saveName,cityName]);
//        console.log(saveName);
        found = "";
    }

    useEffect(() => {
        const list =  JSON.stringify(saveName);
         localStorage.setItem("storage",list);
//         console.log(saveName);
    },[saveName])

    const deleteSave = (e) => {
        let deleted = saveName.filter((item) => item != e);
        setSaveName(deleted);
        deleted = "";
    }

    useEffect(() => {
        setSaved(false);
        let checkValue = saveName.filter((name) => name === cityName);
        console.log(cityName);
        console.log(checkValue[0]);
        if(checkValue[0]===cityName) {
            setSaved(true)
        }
    },[cityName,saveName])

    const unsave = () => {
        let deleted = saveName.filter((item) => item != cityName);
        setSaveName(deleted);
        deleted = "";
    }
    const openSave = async(e) => {
        setErr("");
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e}&appid=${apiKey}&units=metric`)
                        .then(res=> res.json())
                        .catch(err => console.log(err));
        if(response.message) {
            setErr(response.message);
            inputRef.current.value = "";
        }
        setCityName(response.name);
        setTemperature(response.main.temp);
        setCondition(response.weather[0].description);
        setWindSpeed(response.wind.speed);
        setIcon(response.weather[0].icon)
        inputRef.current.value = "";
    }

    const [homeOpen,setHomeOpen] = useState(true);
    const [aboutOpen,setAboutOpen] = useState(false);
    const [contactOpen,setContactOpen] = useState(false);
    

    const homeClick = () => {
        setHomeOpen(true);
        setContactOpen(false);
        setAboutOpen(false);
    }
    const aboutClick = () => {
        setContactOpen(false);
        setAboutOpen(true);
        setHomeOpen(false);
        
    }
    const contactClick = () => {
        setAboutOpen(false);
        setContactOpen(true);
        setHomeOpen(false);
    }


    const {ref: bRef, inView: buttonVisible} = useInView();


    return(
        <div className="mid">
            <Left homeClick={homeClick} 
                    aboutClick={aboutClick} 
                    contactClick={contactClick} 
                    homeOpen={homeOpen}
                    aboutOpen={aboutOpen}
                    contactOpen={contactOpen}/>
            {aboutOpen? <About /> : 
            <>{contactOpen? <Contact /> :
            <>
            {err? <div className="errorContainer">
                        <div className="error">{err}</div>
                        <button className="errButton" onClick={removeError}>Back</button>
                    </div> :
                <div className="mainContainer">
                    <div className="mainHeader">
                        <span>Weather Live</span>
                    </div>
                    <div className="searchBarContainer">
                        <form onSubmit={findCity}>
                            <input placeholder="Search City Name" className="searchBar" ref={inputRef} onChange={(e) => setSearchName(e.target.value)}/>
                        </form>
                        <FontAwesomeIcon icon={faMagnifyingGlassLocation} className="searchIcon"/>
                    </div>
                    <div className="cityName">
                        <div>{err? err : cityName}</div>
                    </div>
                    <div className="timeContainer">
                        <div className="timeTag">{currDate}</div>
                    </div>
                    <div className="imgContainer"><img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="icon"/></div>
                    <div className="degreeContainer">
                        <div className="degree">{temperature}&#8451;</div>
                    </div>
                    <div className="line">--------------------------</div>
                    <div className="detailContainer">
                        <div className="condition">{condition}</div>
                        <div className="wind">Wind Speed = {windSpeed}</div>
                    </div>
                    <div className="saveContainer" ref={bRef}>
                        {saved ? <motion.button className="saveButton"
                             onClick={unsave}
                             whileHover={{
                                 position: "relative",
                                 scale:[1,1.2,1.1],
                                 transition:{duration: .2},
                                 background: "red"
                             }}>Unsave</motion.button> : 
                        <motion.button className="saveButton" 
                        onClick={save}
                        whileHover={{
                            position: "relative",
                            scale:[1,1.2,1.1],
                            transition:{duration: .2}
                        }}>+ Add to save list</motion.button>}
                    </div>
                </div>
            }             
         <Right saveName = {saveName} deleteSave={deleteSave} openSave = {openSave}/>
        </>
            }</>}
        </div>
    )
};

export default Main;