import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import thought from "reducers/thought";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thought.items)
    const dispatch = useDispatch()
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username)
    const navigate = useNavigate()
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    useEffect(() => {
        const options = {
                method:"GET",
                headers: {
                    "Content-Type": "application.json",
                    "Authorization": accessToken
                }
        }
        fetch(API_URL("thoughts"), options)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                dispatch(thought.actions.setError(null));
                dispatch(thought.actions.setItems(data.response));
            } else {
                dispatch(thought.actions.setError(response));
                dispatch(thought.actions.setItems([]));
            }
        });
    })
    return (
        <>
        <h2>THESE ARE THE THOUGHT OF {username}</h2>
        {thoughtItems.map(item => {
            return(<p key={item._id}>{item.message}</p>)
        })}
    </>
    )
}

export default Main