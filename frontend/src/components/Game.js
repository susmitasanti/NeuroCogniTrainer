import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import UnityComponent from "./UnityComponent";

function Game() {
    const { auth } = useContext(AuthContext);
    const { gameName } = useParams();
    const [gameComplete, setGameComplete] = useState(false)

    const navigator = useNavigate();
    useEffect(() => {
        if (gameComplete) {
            navigator('/patient');
        }

    }, [gameComplete])
    return (
        <UnityComponent gameName={gameName} setGameComplete={setGameComplete}/>
    );
}


export default Game;