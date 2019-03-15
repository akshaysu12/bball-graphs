import React from "react";

export default (props) => {
    return(
        <div>
        <label>
            <input type="radio" name="First" onChange={props.change} key={"Bar"}/>Bar
        </label>
        <label>
            <input type="radio" name="Last" onChange={props.change} key ={"Line"}/>Line
        </label>
    </div>
    )
}