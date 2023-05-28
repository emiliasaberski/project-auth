import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import thoughts from "reducers/thoughts";
import { API_URL } from "utils/urls";
import user from "reducers/user";
import { ThoughtList } from "./ThoughtList";
import { NewThought } from "./NewThought";

const Main = () => {
    const thoughtItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(()=> {
        if (!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    // useEffect(() => {
    //     const options = {
    //         method:"GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": accessToken
    //         }
    //     }
    //     fetch(API_URL("thoughts"), options)
    //         .then(res => res.json())
    //         .then(data => {
    //             if(data.success) {
    //                 dispatch(thoughts.actions.setError(null));
    //                 dispatch(thoughts.actions.setItems(data.response));
    //             } else {
    //                 dispatch(thoughts.actions.setError(response));
    //                 dispatch(thoughts.actions.setItems([]));
    //             }
    //         });
    // })


    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
        dispatch(thoughts.actions.setItems([]));
    }
    return(
        <>
        <div className="logout-btn">
            <button type="button" onClick={onLogoutButtonClick}>Logout</button>
            </div>

            {username ? (<h2>This is where the cool kids hangs, {username.toUpperCase()}!</h2>): ""}
            {/* {thoughtItems.map(item => {
                return(<p key={item._id}>{item.message}</p>)
            })} */}
            <NewThought /> 
            <ThoughtList />
        </>
    );
}

export default Main; 