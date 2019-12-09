import React, { Component} from 'react';
export default class Breadcrumbs extends Component  {	
    constructor(props) {
        super(props);	       	
    }
    
    componentDidMount() {
		
        }
    
    
    render() {
        
     const length=this.props.breadcrumbs.length;
     
     const home = length===0 ? null :  <li className="breadcrumb-item"><a href="/" className="text-dark"
      >Home</a></li>;
       const items = this.props.breadcrumbs.map(
           (object, index) =>            
    <li className="breadcrumb-item" key={object.id+" " +index+ " "+object.name}     
                 
    >
    <a onClick={this.props.onClick}
    key={object.name+object.id+" "+index}
    name={object.id}
    data-names={this.props.breadcrumbs.slice(0, index+1).map((object)=>object.name).join(",, ")}
    data-ids={this.props.breadcrumbs.slice(0, index+1).map((object)=>object.id).join(",, ")} 
     >
    {object.name}
    </a>        
        </li> 
       );
    

			return (
                <nav aria-label="breadcrumb">
  <ol className="breadcrumb bg-white">
   {home}
	  {items}
   
  </ol>
</nav>       
		)
	}

    }
