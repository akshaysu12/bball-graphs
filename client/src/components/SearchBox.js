import React from 'react'
import Downshift from 'downshift';
import Players from './Players.js';

function searchBox({ itemToString, items, ...rest })  {
    return (
        <Downshift itemToString={item => (item ? item.name : '')} {...rest}>
        {
            ({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
            }) => (
                <div>
                    <input {...getInputProps({ placeholder: "Search" })} />
                    <ul {...getMenuProps()}> {
                        isOpen ? <div>
                            <Players 
                                {...{
                                    inputValue,
                                    selectedItem,
                                    highlightedIndex,
                                    getItemProps,
                                }} />
                        </div>
                        : null 
                    }
                    </ul>
                </div>

            )
        }
        </Downshift>
    )
}

  export default searchBox