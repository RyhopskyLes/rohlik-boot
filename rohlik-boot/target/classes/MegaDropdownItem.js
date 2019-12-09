import React, { Component} from 'react';
export default class MegaDropDownItem  extends Component  {	
	constructor(props) {
		super(props); 		            		
	}
	
	
	render() {
		
		const items =this.props.navigation.filter(category=>category.categoryId == this.props.name)
		.map(category=>category.children);
		var merged = [].concat.apply([], items);	
		const result = merged.filter(child=>child.active===true).map(child=>
            <li className="small category-links" key={"li"+child.categoryId+" "+child.categoryName}
            id="anchor-wrap"
            ><a key={child.categoryId+" "+child.categoryName}
            data-names={this.props.parent.categoryName+",, "+this.props.text+",, "+child.categoryName}
            data-ids={this.props.parent.categoryId+",, "+this.props.name+",, "+child.categoryId} 
            name={child.categoryId} onClick={this.props.onClick}
            id="anchor-wrap"
             >{child.categoryName}</a></li>		
		);
	
		
			return (				
                <div className="col-md-6 col-lg-3 pb-2">  
                                    <div className="card rounded-lg h-100 w-auto">
                                       <div className="collapse-header">

                                           
                                    <input value={this.props.text} className="btn font-weight-bold font-sizer" type="button" data-toggle="collapse"
                                               data-target={"#collapseContinents"+this.props.name} aria-expanded="false" aria-controls={"collapseContinents" +this.props.name}/>
                                       </div>          
                                     <div className="card-body collapse" id={"collapseContinents"+this.props.name} data-parent={"#accordion"+this.props.parent.categoryId}>
                                            <ul className="list-unstyled">
                                                <li key={this.props.name}
                                                className="category-links"
                                                 id="anchor-wrap"
                                                >
                                                <a key={this.props.name+" a "} className="font-weight-bold small"
              data-names={this.props.parent.categoryName+",, "+this.props.text}  
              data-ids={this.props.parent.categoryId+",, "+this.props.name}                                
            name={this.props.name} onClick={this.props.onClick}
            id="anchor-wrap"
            >{this.props.text}</a>    
                                                    </li>
                                                {result}
                                            </ul>
                                        </div>
                                    </div>
                                    </div>
                                             

		)
	}
}