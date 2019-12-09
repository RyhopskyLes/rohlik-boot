import React, { Component} from 'react';
import MegaDropdownColumn from "./MegaDropdownColumn";
export default class MegaDropdown extends Component  {	
    constructor(props) {
        super(props);	
         this.state={categories: []};
         this.handleOver=this.handleOver.bind(this);
    }

    
    componentDidMount() {
         	this.setState({
           categories: this.props.parent.children})		
    }
    
        
      handleOver(e) {	
    	  e.preventDefault();
        console.log('Mouse was down'+e.target.name); 
        this.props.loadCategory(e);		
	  }
    render() {
     
    const item = <MegaDropdownColumn key={this.props.parent.categoryName} categories={this.state.categories}
         loadCategory={this.props.loadCategory} navigation={this.props.navigation} parent={this.props.parent}/>
    ;


			return (
                <ul className="navbar-nav">
                <li className="nav-item dropdown position-static"
                 >
                  <a className="nav-link text-white text-wrap font-sizer"
                	  id="navigation-label"
                    	onMouseDown={this.handleOver}
                    key={this.props.parent.categoryName+" "+this.props.categoryId}
                    name={this.props.parent.categoryId}
                    data-names={this.props.parent.categoryName}
                    data-ids={this.props.parent.categoryId} 
                    role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"                    
                    >
                    {this.props.parent.categoryName.replace(" a ", " a\u00a0")
	.replace(" s ", " s\u00a0").replace(" z ", " z\u00a0").replace(" v ", " v\u00a0")}
                    </a>
                    <ul className="dropdown-menu w-100 shadow p-0" id="navbarDropdownMega">
                       {item} 
                    </ul>   
                </li>
            </ul>              
		)
	}

    }
