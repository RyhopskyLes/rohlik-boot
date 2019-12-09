import React, { Component} from 'react';
export default class Tiles extends Component  {	
    constructor(props) {
        super(props);	       	
    }
    
    componentDidMount() {
		
        }
    
    
    render() {
       const children =this.props.children;
        const items = children!==undefined ? children.filter(child=>child.active!==false).map(child=> 
            <div key={child.categoryId+"  div wrapper "} className="col-md-6 col-lg-3 pb-1 px-0125">                   
        <div key={child.categoryId+" div card "} className="card text-center rounded-0 py-2 h-100 w-auto">
        <a key={child.categoryId+" tile "} className="font-weight-bold small"
             data-names={this.props.breadcrumbs.map((object)=>object.name).join(",, ").concat(",, ", child.categoryName)}
             data-ids={this.props.breadcrumbs.map((object)=>object.id).join(",, ").concat(",, ", child.categoryId)}                               
            name={child.categoryId} onClick={this.props.onClick}
            id="anchor-wrap"
            >{child.categoryName.replace(" a ", " a\u00a0")
            .replace(" s ", " s\u00a0").replace(" z ", " z\u00a0").replace(" v ", " v\u00a0")}</a>   
         </div> 
         </div>
     
      ) : <div></div>;  
    
   console.log(items);

			return (
                <div className="row px-2 py-2 mx-2"> 
                       
                 {items}  
                         
                 </div>     
                
		)
	}

    }
