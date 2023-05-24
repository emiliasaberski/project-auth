import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <>
        <p>
        <Link to="/login">Go to login</Link>
        </p>
        <p>
        <Link to="/">Go to main</Link>
        </p>
         <p>I am the NotFound comp</p>
        </>
    )
}

export default NotFound