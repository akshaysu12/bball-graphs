import React from "react";

export default (props) => {
    return(
        <div>
        <label>
            First
            <input type="number" name="first" value={props.first} onChange={props.change} key={"first"}/>
        </label>
        <label>
            Last
            <input type="number" name="last" value={props.last} onChange={props.change} key={"last"}/>
        </label>
    </div>
    )
}