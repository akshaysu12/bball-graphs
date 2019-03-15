import React, { Component } from "react";
import {OPTIONS, traditional, advanced} from './helpers/options'
import Player from './Query'
import Parameter from './Parameters'
import Filter from './Filter'
import Visualization from './Visualization'

const defaultVis = 'Line';
const defaultData = 'Pts';

class Submit extends Component {
    state = {
        checkboxes: OPTIONS.reduce(
          (options, option) => ({
            ...options,
            [option]: option === defaultData
          }),
          {}
        ),
        selections: [defaultData],
        first: null,
        last: null,
        visualization: defaultVis,
        show: {
            Traditional: false,
            Advanced: false,
            Filter: false,
            Visualization: false
        }
      };
      
    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
        this.setState(prevState => ({
            checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
            }
        }));
    };

    toggle = changeEvent => {
        const {name} = changeEvent.target;
        Object.keys(this.state.show).forEach(show => {
            this.setState(prevState => ({
              show: {
                ...prevState.show,
                [show]: show === name
              }
            }));
          });
        };
    
    handleChange = changeEvent => {
        const {name} = changeEvent.target;
        console.log(name)
        this.setState({
            name: changeEvent.target.value
        })
    }

    resetCheckboxes = () => {
        Object.keys(this.state.checkboxes).forEach(checkbox => {
          this.setState(prevState => ({
            checkboxes: {
              ...prevState.checkboxes,
              [checkbox]: false
            }
          }));
        });
      };    

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        let selections = Object.keys(this.state.checkboxes)
            .filter(checkbox => this.state.checkboxes[checkbox])
            .map(key => key)

        this.setState({showGraph: true, selections: selections})
    };

    createCheckboxes = (Options) => Options.map(this.createCheckbox);

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group mt-2">
                    <div>
                        {this.state.show.Traditional && <Parameter options={traditional} checked={this.state.checkboxes} save={this.handleCheckboxChange}/> }
                        {this.state.show.Advanced && <Parameter options={advanced} checked={this.state.checkboxes} save={this.handleCheckboxChange}/>}
                        {this.state.show.Filter && <Filter change={this.handleChange} f={this.state.first} l={this.state.lirst}/>}
                        {this.state.show.Visualization && <Visualization change={this.handleChange}/>}
                    </div>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.toggle}
                            name="Traditional"
                            >
                            Traditional
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            name="Advanced"
                            onClick={this.toggle}
                            >
                            Advanced
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.toggle}
                            name="Filter"
                            >
                            Filter
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.toggle}
                            name="Visualization"
                            >
                            Visualization
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-primary mr-2"
                            onClick={this.resetCheckboxes}>
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                {this.props.showGraph && <Player playerName={this.props.player} selections={this.state.selections} first={this.state.first} last={this.state.last}  />}                             
            </div>
        )
    }
}

export default Submit