import React from "react";
import Checkbox from './Checkbox'

export default (props) => {
    return props.options.map(option => 
        <Checkbox
        label={option}
        isSelected={props.checked[option]}
        onCheckboxChange={props.save}
        key={option}
    />
    )
}