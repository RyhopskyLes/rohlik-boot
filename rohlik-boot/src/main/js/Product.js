import React, { Component} from 'react';
import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
export default class Product extends Component {

	constructor(props) {
		super(props);
		this.handleDelete = this.handleDelete.bind(this);		
	}

	handleDelete() {
		this.props.onDelete(this.props.product);
	}
linkToImage(str) {
	return "img/"+str;
	//str.replace("https://images.rohlik.cz", "img/");		
}

formatPrice(price) {
return String(price).replace(".", ",");
}
render() {
	const sales = this.props.product.sales;
	const sale = sales.find(sale=>sale.type=="sale");	
	const priceForm=this.props.product.hasSales==true && sale!==undefined ? this.formatPrice(sale.price)  :this.formatPrice(this.props.product.price);	
	const disabled=this.props.product.inStock===true ? "" :"disabled";
	const productName =this.props.product.productName.replace(" a ", " a\u00a0")
	.replace(" s ", " s\u00a0").replace(" z ", " z\u00a0").replace(" v ", " v\u00a0");
		return (

<div className="p-grid">
	<div className="p-grid-in">
	<div className="p-stripe"></div>
	<div className="p-img-container">		
	<div className="p-img-wrapper">
	<img className="p-img" src={this.linkToImage(this.props.product.imgPath)}/>
	</div>
	<div className="p-badge-wrapper">
	<Badge className="p-badge" pill variant="secondary">{this.props.product.textualAmount}</Badge>
	</div>	
		</div> 
		<div className="p-name text-center">{productName}</div>                 
		<div className="p-info-box">
		<div className="p-price">{priceForm} Kč</div>
        <div className="p-desc">{this.props.product.inStock===true ? "Skladem" :"Není skladem"}</div> 			 
		<button className="p-add"  disabled={disabled}>Na Rohlíku</button>      
		</div>		
      </div>
	  </div>


		
		)
	}
}