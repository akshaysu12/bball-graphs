import React, { Component } from 'react';
import '../styles/App.css';
import SearchBox from './SearchBox' 
import Submit from './Submit'

class Search extends Component {
    state = {showGraph: false, player: null}

    handleStateChange = (changes) => {
        if (changes.hasOwnProperty("inputValue")) {
        }
    };

    handleChange = (selectedItem) => {
        if(!selectedItem) {
            this.setState({
                showGraph: false,
                showInput: false,
                player: null,
            })
            return;
        }
        this.setState({
            showGraph: true,
            player: selectedItem.name
        })
    }

    render() {
        return (
            <div>
                <SearchBox 
                    onStateChange={this.handleStateChange}
                    onChange={this.handleChange}
                />
                { this.state.showGraph && <Submit showGraph={this.state.showGraph} player={this.state.player} />}
            </div>
        )
    }
}

export default Search