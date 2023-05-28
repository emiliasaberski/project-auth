import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "reducers/user";
import { API_URL } from "utils/urls";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(store => store.user.error)
    const accessToken = useSelector(store => store.user.accessToken);
    useEffect(() => {
        if(accessToken) {
            navigate("/")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
            // error message: "username" and "password" are not defined            
            // solution: add username and password to the useState

        }
        fetch(API_URL(mode), options)
            .then(whatever => whatever.json())
            //whatever means response, response is the same as potato, and potato is the same as data, 
            //what it does is that it takes the data from the backend and puts it in the frontend
            .then(korre => {
                console.log(korre)
                //korre means data, data is the same as response, and response is the same as potato
                //and what is does is that it takes the data from the backend and puts it in the frontend
                if(korre.success) {
                    dispatch(user.actions.setAccessToken(korre.response.accessToken));
                    dispatch(user.actions.setUsername(korre.response.username));
                    dispatch(user.actions.setUserId(korre.response.id));
                    dispatch(user.actions.setError(null));
                } else {
                    dispatch(user.actions.setAccessToken(null));
                    dispatch(user.actions.setUsername(null));
                    dispatch(user.actions.setUserId(null));
                    dispatch(user.actions.setError(korre.response))
                }
            })
    }
    return(
        <>
        <div className="login-box">
            <div className="log-reg">
            <label htmlFor="register">Register</label>
            <input 
                type="radio" 
                id="register" 
                checked={mode === "register"}
                onChange={() => setMode("register")}/>
            <label htmlFor="login">Login</label>
            <input 
                type="radio" 
                id="login" 
                checked={mode === "login"}
                onChange={() => setMode("login")}/>
                </div>

                <div className="userpass-box">
            <form onSubmit={onFormSubmit}>
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} />

                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
                <p>{error}</p>
        </form>
        </div>
        </div>
        </>
    );
}

export default Login;