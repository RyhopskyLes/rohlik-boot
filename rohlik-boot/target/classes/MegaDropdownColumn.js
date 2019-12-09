import React, { Component} from 'react';
import MegaDropDownItem from "./MegaDropDownItem";
export default class MegaDropdownColumn extends Component  {
    constructor(props) {
        super(props);              		
    }
    
    render() {
       	 const items = this.props.categories.filter(category => category.categoryName !== null && category.active===true).map((category, index) =>
        <MegaDropDownItem parent={this.props.parent}
         key={category.categoryName+" "+index} name={category.categoryId} text={category.categoryName} onClick={this.props.loadCategory}
        navigation={this.props.navigation}
        />
    );
    return (	
<li className="dropdown-item" id={"accordion"+this.props.parent.categoryId}>
     <div className="row py-2" >      
                 {items}             
                 </div>             
                
                        </li>

        
)
}}