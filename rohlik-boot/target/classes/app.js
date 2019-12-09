'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import $ from 'jquery';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import follow from './follow';
import SearchResult from './SearchResult';
import Product from './Product';
import MegaDropdownList from "./MegaDropdownList";
import Breadcrumbs from "./Breadcrumbs";
import Tiles from "./Tiles";
const client = require('./client');


const root = '/api';
const productsSearch = '/products/search';
const categoriesSearch='/categories/search';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {parents: [], products: [], attributes: [], pageSize: 5, links: {}, categoryActive: false, category: '',
		 searchWord: '', totalHits: '', searchActive: false, premium: false, updateFrom: 'loadFromServer', navigation: [],
		 breadcrumbs: [], children: []};
		this.updatePageSize = this.updatePageSize.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onNavigate = this.onNavigate.bind(this);
		this.handleInput = this.handleInput.bind(this);	
		this.searchByLastName = this.searchByLastName.bind(this);
		this.handleCheckInputChange = this.handleCheckInputChange.bind(this);
		this.loadCategory=this.loadCategory.bind(this);
		
	}

	// tag::follow-2[]
	loadFromServer(pageSize) {
		follow(client, root, [
			{rel: 'products', params: {size: pageSize}}]
		).then(productCollection => {
			return client({
				method: 'GET',
				path: productCollection.entity._links.profile.href,
				headers: {'Accept': 'application/schema+json'}
			}).then(schema => {
				this.schema = schema.entity;
				return productCollection;
			});
		}).done(productCollection => {
			this.setState({
				products: productCollection.entity._embedded.products,
				attributes: Object.keys(this.schema.properties),
				pageSize: pageSize,
				links: productCollection.entity._links});
		});
	}

	loadMainCategoriesFromServer() {
		follow(client, root+categoriesSearch, [
			{rel: 'mainparents'}]
		).done(response => {
				this.setState({
				parents: response.entity._embedded.categories,
				breadcrumbs: []
				});
		});	
	}
	
	loadCategoryByCategoryId(id) {
		follow(client, root+categoriesSearch, [
			{rel: 'categoryid', params: {id: id}}]
		).done(response => {
			console.log(response);
				this.setState({
				children: response.entity.children,
				});
		});	
    }
	// end::follow-2[]	

	// tag::delete[]
	onDelete(product) {
		client({method: 'DELETE', path: product._links.self.href}).done(response => {
			this.loadFromServer(this.state.pageSize);
		});
	}
	// end::delete[]

	// tag::navigate[]
	onNavigate(navUri) {
		client({method: 'GET', path: navUri}).done(productsCollection => {
			this.setState({
				products: productsCollection.entity._embedded.products,
				attributes: this.state.attributes,
				pageSize: this.state.pageSize,
				links: productsCollection.entity._links
			});
		});
	}
	// end::navigate[]

	// tag::update-page-size[]
	updatePageSize(pageSize) {
		const updateFrom =this.state.updateFrom;
			
		if (pageSize !== this.state.pageSize) {
		
			if(!this.state.searchActive&&!this.state.premium&&!this.state.categoryActive) {this[[updateFrom]](pageSize);}
			if (this.state.searchActive){let searchWord=this.state.searchWord;
				this.setState({pageSize: pageSize, searchWord:''}, function () {this.updateBySearchWord(searchWord);
				});
				}
			if(this.state.premium)	{
				this.setState({pageSize: pageSize, searchWord:''}, function () {this.updateByCheckInput('premium');				
				});
			}	
			if(this.state.categoryActive) {
				this.setState({pageSize: pageSize, searchWord:''}, function () {this.loadCategoryItems();});	
			}		
			}
		}
	 // end::update-page-size[] 		
	// tag::update-search-word[]
	updateBySearchWord(searchWord) {
		const pageSize=this.state.pageSize;
				if(searchWord!==this.state.searchWord)
		{
					
			follow(client, root+productsSearch, [
				{rel: 'productnamecontains', params: {name: searchWord, size: pageSize}}]
			).then(productsCollection => {				
				if(productsCollection.entity.page.totalElements!==0)
				{this.setState({
					products: productsCollection.entity._embedded.products,
					totalHits: searchWord!==''? productsCollection.entity.page.totalElements : '',
					pageSize: pageSize,
					links: productsCollection.entity._links,
					searchWord: searchWord,
					premium: false,
					activeCategory: false,
                    updateFrom: 'updateBySearchWord',
					searchActive: true});}
				else{this.setState({
					totalHits: productsCollection.entity.page.totalElements,
					searchWord: searchWord,
					searchActive: false});
					
				}
			});
		}

	}
updateByCheckInput(name) {
	const pageSize=this.state.pageSize;
	{
		follow(client, root+productsSearch, [
		  {rel: name+'products', params: {size: pageSize}}]
	  ).then(productsCollection => {	
		  this.setState({
			  products: productsCollection.entity._embedded.products,
			  totalHits: productsCollection.entity.page.totalElements,
			  pageSize: pageSize,
			  updateFrom: 'updateByCheckInput',
			  categoryActive: false,
			  links: productsCollection.entity._links,
			  searchActive: false,
			  searchWord:''
			  });			
	  });} 

}

loadCategoryItems() {
	const pageSize=this.state.pageSize;
	const id=this.state.category;
	{
		follow(client, root+productsSearch, [
		  {rel: 'incategory', params: {id: id, size: pageSize}}]
	  ).then(productsCollection => {	
		  this.setState({
			  products: productsCollection.entity._embedded.products,
			  totalHits: productsCollection.entity.page.totalElements,
			  pageSize: pageSize,
			  updateFrom: 'loadCategoryItems',
			  categoryActive: true,
			  premium: false,
			  links: productsCollection.entity._links,
			  searchActive: false,
			 searchWord:''
			  });			
	  });} 
}
	handleCheckInputChange(event) {
		const pageSize=this.state.pageSize;
		const target = event.target;
		const value = target.checked;
		const name = target.name;
	this.setState({
		  [name]: value
		}, () => {
			  });
		  if(value) {
			this.updateByCheckInput(name);	  
		  } else {
			this.setState({
				totalHits: '',				
				});
			this.loadFromServer(this.state.pageSize);
		}	  
	  }
	// end::update-search-word[]
	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}
	searchByLastName(e) {
		e.preventDefault();
		const word = ReactDOM.findDOMNode(this.refs.searchText).value;
		this.updateBySearchWord(word);
	}	
	// tag::follow-1[]
	
loadNavigation() {
		follow(client, root+categoriesSearch, [
			{rel: 'navigation'}]
		).done(response => {
				this.setState({
				navigation: response.entity._embedded.categories,
				});
		});	
	}

	componentDidMount() {
		this.loadFromServer(this.state.pageSize);	
		this.loadMainCategoriesFromServer();
		this.loadNavigation();
	}

	loadCategory(event) {
		event.preventDefault();
		const target = event.target;
		console.log(target);		
		const name = target.name;
		const names=target.dataset.names.split(",, ");
		console.log(names);
		const ids=target.dataset.ids.split(",, ");
		console.log(ids);
		var result = names.map((x, index) =>({"name":x, "id":ids[index]}));	
		console.log(result);	
		this.loadCategoryByCategoryId(name);
		this.setState({
			category: name,
			breadcrumbs: result				
			}, ()=>{this.loadCategoryItems(); console.log(this.state.breadcrumbs)});
		
	}

	 
	// end::follow-1[]

	render() {
		
			return (
			<>
<nav className="navbar navbar-expand-lg navbar-light align-items-center bg-olive-yellowish">
    <div className="container-fluid">
	<a className="navbar-brand text-white" href="/">Rohlík</a>   
		
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
		<MegaDropdownList parents={this.state.parents} loadCategory={this.loadCategory}
		handleClick={this.handleClick}
		navigation={this.state.navigation}/> 
		</div>
		</div>    
</nav>

			
{/*				<Navbar collapseOnSelect expand="lg" className="bg-olive-yellowish" variant="dark">
  <Navbar.Brand className="font-sizer">
  <img
        src={require('./static/rohlik.png')}
        width="60"
        height="30"
        className="d-inline-block align-top"
        alt="Rohlík logo"
      />	  
	  
	  {'Rohlík'}</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">  
<DropdownList parents={this.state.parents} loadCategory={this.loadCategory} navigation={this.state.navigation}/> 
  
  </Navbar.Collapse>-->
		</Navbar> */}
<Navbar className="bg-dark-olive-80 justify-content-between" expand="lg">
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
	  
    <Form inline>
	<Form.Check 
        custom
        type='checkbox'
		id={`custom-premium`}
		name='premium'
		label={`Zobrazit produkty Rohlík Premium`}
		checked={this.state.premium}
		onChange={this.handleCheckInputChange}
      />
  </Form>
	<Navbar.Collapse id="responsive-navbar-nav">
  <Form inline>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">Položek na stránce</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        type="text"  ref="pageSize" defaultValue={this.state.pageSize} onInput={this.handleInput}
        aria-describedby="basic-addon1"
      />
    </InputGroup>
	<InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon2">Název produktu obsahuje:</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
	   ref="searchText" defaultValue={this.props.searchWord} onInput={this.searchByLastName}        
        aria-describedby="basic-addon2"
      />
    </InputGroup>
  </Form> 
  </Navbar.Collapse>
</Navbar>
<Breadcrumbs breadcrumbs={this.state.breadcrumbs} onClick={this.loadCategory}/>
<Tiles children={this.state.children} breadcrumbs={this.state.breadcrumbs} onClick={this.loadCategory}></Tiles>

				<ProductList products={this.state.products}
							  links={this.state.links}							  
							  searchWord={this.state.searchWord}
							  pageSize={this.state.pageSize}
							  onNavigate={this.onNavigate}
							  onDelete={this.onDelete}
							  onCreate={this.onCreate}
                              attributes={this.state.attributes}/>							   
				</>
		)
	}
}


class ProductList extends React.Component {

	constructor(props) {
		super(props);
		this.handleNavFirst = this.handleNavFirst.bind(this);
		this.handleNavPrev = this.handleNavPrev.bind(this);
		this.handleNavNext = this.handleNavNext.bind(this);
		this.handleNavLast = this.handleNavLast.bind(this);		
	}

	// tag::handle-page-size-updates[]
	handleInput(e) {
		e.preventDefault();
		const pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
		if (/^[0-9]+$/.test(pageSize)) {
			this.props.updatePageSize(pageSize);
		} else {
			ReactDOM.findDOMNode(this.refs.pageSize).value =
				pageSize.substring(0, pageSize.length - 1);
		}
	}
	// end::handle-page-size-updates[]

	// tag::handle-nav[]
	handleNavFirst(e){
		e.preventDefault();
		this.props.onNavigate(this.props.links.first.href);
	}

	handleNavPrev(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.prev.href);
	}

	handleNavNext(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.next.href);
	}

	handleNavLast(e) {
		e.preventDefault();
		this.props.onNavigate(this.props.links.last.href);
	}
	// end::handle-nav[]
	extractProducts(productsList) {
				return productsList.map(product =>
			
			<Product key={product._links.self.href} product={product} onDelete={this.props.onDelete}/>
			
		);

	}
	// tag::product-list-render[]
	render() {
		const products = this.props.products.map(product =>
			<Product key={product._links.self.href} product={product} onDelete={this.props.onDelete}/>
		);

		const navLinks = [];
		if ("first" in this.props.links) {
			navLinks.push(<Button variant="outline-info" key="first" onClick={this.handleNavFirst}>&lt;&lt;</Button>);
		}
		if ("prev" in this.props.links) {
			navLinks.push(<Button variant="outline-info" key="prev" onClick={this.handleNavPrev}>&lt;</Button>);
		}
		if ("next" in this.props.links) {
			navLinks.push(<Button variant="outline-info" key="next" onClick={this.handleNavNext}>&gt;</Button>);
		}
		if ("last" in this.props.links) {
			navLinks.push(<Button variant="outline-info" key="last" onClick={this.handleNavLast}>&gt;&gt;</Button>);
		}

		return (
			<>
			<Container fluid="true"> 
				<Row>
				<Col sm={0} md={1} lg={1}></Col>	
				<Col sm={12} md={10} lg={10}>	
				<div id="p-grid">{products}</div>			
				
			</Col>
			<Col sm={0} md={1} lg={1}></Col>	
			</Row>	
			</Container>	
				<Container fluid="true">
				<Row>
	<Col xs={0} sm={0} md={1} lg={1}></Col>
	<Col xs={4}sm={4} md={4} lg={4}></Col>				
    <Col xs={8} sm={8} md={6} lg={6}>{navLinks}</Col>    
	<Col xs={0} sm={0} md={1} lg={1}>    </Col>
  </Row>					
				</Container>				
				</>	
			
		)
	}
	// end::product-list-render[]
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)