import React, { Component} from 'react';
import MegaDropdown from "./MegaDropdown";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import $ from 'jquery';
//import Popper from 'popper.js';
//import 'bootstrap/dist/js/bootstrap.bundle.min';

export default class MegaDropdownList extends Component  {
    constructor(props) {
        super(props);
              		
    }
    
    render() {
      const items = this.props.parents.slice(0, 13).map((parent, index)=> 
      
        <MegaDropdown key={parent.categoryName+" "+index} parent={parent} loadCategory={this.props.loadCategory}
        navigation={this.props.navigation}/> 
        );         
        return (	
      <React.Fragment> {items} </React.Fragment>       
)
}}