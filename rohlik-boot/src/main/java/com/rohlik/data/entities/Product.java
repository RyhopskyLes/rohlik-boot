package com.rohlik.data.entities;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.rohlik.data.kosik.entities.ProductKosik;

@Entity
@Table(name = "product")
public class Product {
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id")
	Integer id;
	@Column(name = "productId")
	Integer productId;
	@Column(name = "productName")
	String productName;
	@Column(name = "producer")
	String producer;
	@Column(name = "originalPrice")
	Double originalPrice;
	@Column(name = "price")
	Double price;
	@Column(name = "textualAmount")
	String textualAmount;
	@Column(name = "unit")
	String unit;
	@Column(name = "baseLink")
	String baseLink;
	@Column(name = "imgPath")
	String imgPath;
	@Column(name = "inStock")
	boolean inStock;
	@Column(name = "active")
	boolean active;
	@Column(name = "hasSales")
	boolean hasSales;
	@Column(name = "link")
	String link;
	@Column(name = "pricePerUnit")
	Double pricePerUnit;
	@Column(name = "mainCategoryId")
	Integer mainCategoryId;
	@Column(name = "mainCategoryName")
	String mainCategoryName;
	@Column(name = "isFromRohlik")
	boolean isFromRohlik;
	@OneToMany(fetch = FetchType.LAZY,
	        cascade = CascadeType.ALL,
	        orphanRemoval = true, mappedBy="product")
	public Set<Sale> sales= new HashSet<>();
	 @ManyToMany(cascade = {
	    	    CascadeType.PERSIST,
	    	    CascadeType.MERGE
	    	})
	    	@JoinTable(name="product_category",
	    	    joinColumns = @JoinColumn(name = "product_id", referencedColumnName="id"),
	    	    inverseJoinColumns = @JoinColumn(name="category_id", referencedColumnName="id")
	    	)
	    private Set<Category> categories = new HashSet<>();
	 @OneToOne(mappedBy = "product", fetch = FetchType.EAGER)
	 private ProductKosik productKosik;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getProductId() {
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Double getOriginalPrice() {
		return originalPrice;
	}
	public void setOriginalPrice(Double originalPrice) {
		this.originalPrice = originalPrice;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public String getTextualAmount() {
		return textualAmount;
	}
	public void setTextualAmount(String textualAmount) {
		this.textualAmount = textualAmount;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getBaseLink() {
		return baseLink;
	}
	public void setBaseLink(String baseLink) {
		this.baseLink = baseLink;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public boolean isInStock() {
		return inStock;
	}
	public void setInStock(boolean inStock) {
		this.inStock = inStock;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	public Double getPricePerUnit() {
		return pricePerUnit;
	}
	public void setPricePerUnit(Double pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}
	public Integer getMainCategoryId() {
		return mainCategoryId;
	}
	public void setMainCategoryId(Integer mainCategoryId) {
		this.mainCategoryId = mainCategoryId;
	}
	public Set<Sale> getSales() {
		return sales;
	}
	public void setSales(Set<Sale> sale) {
		this.sales = sale;
	}
	
	public void addSales(Sale sale) {
		sales.add(sale);
		sale.setProduct(this);		
	}
	public void removeSales(Sale sale) {
		sales.remove(sale);
		sale.setProduct(null);		
	}
	
	public void addCategory(Category category) {
		categories.add(category);
        category.getProducts().add(this);
    }
 
    public void removeCategories(Category category) {
        categories.remove(category);
        category.getProducts().remove(this);
    }
	
	@Override
	public String toString() {
		return "Product [id=" + id + ", productId=" + productId + ", productName=" + productName + ", producer="
				+ producer + ", originalPrice=" + originalPrice + ", price=" + price + ", textualAmount="
				+ textualAmount + ", unit=" + unit + ", baseLink=" + baseLink + ", imgPath=" + imgPath + ", inStock="
				+ inStock + ", active=" + active + ", hasSales=" + hasSales + ", link=" + link + ", pricePerUnit="
				+ pricePerUnit + ", mainCategoryId=" + mainCategoryId + ", mainCategoryName=" + mainCategoryName
				+ ", isFromRohlik=" + isFromRohlik + ", sales=" + sales + "]";
	}
	public String getProducer() {
		return producer;
	}
	public void setProducer(String producer) {
		this.producer = producer;
	}
	public String getMainCategoryName() {
		return mainCategoryName;
	}
	public void setMainCategoryName(String mainCategoryName) {
		this.mainCategoryName = mainCategoryName;
	}
	public boolean isHasSales() {
		return hasSales;
	}
	public void setHasSales(boolean hasSales) {
		this.hasSales = hasSales;
	}
	@Override
	public int hashCode() {
		return Objects.hash(active, baseLink, categories, hasSales, imgPath, inStock, isFromRohlik, link,
				mainCategoryId, mainCategoryName, originalPrice, price, pricePerUnit, producer, productId, productKosik,
				productName, sales, textualAmount, unit);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		return active == other.active && Objects.equals(baseLink, other.baseLink)
				&& Objects.equals(categories, other.categories) && hasSales == other.hasSales
				&& Objects.equals(imgPath, other.imgPath) && inStock == other.inStock
				&& isFromRohlik == other.isFromRohlik && Objects.equals(link, other.link)
				&& Objects.equals(mainCategoryId, other.mainCategoryId)
				&& Objects.equals(mainCategoryName, other.mainCategoryName)
				&& Objects.equals(originalPrice, other.originalPrice) && Objects.equals(price, other.price)
				&& Objects.equals(pricePerUnit, other.pricePerUnit) && Objects.equals(producer, other.producer)
				&& Objects.equals(productId, other.productId) && Objects.equals(productKosik, other.productKosik)
				&& Objects.equals(productName, other.productName) && Objects.equals(sales, other.sales)
				&& Objects.equals(textualAmount, other.textualAmount) && Objects.equals(unit, other.unit);
	}
	public Set<Category> getCategories() {
		return categories;
	}
	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public boolean isFromRohlik() {
		return isFromRohlik;
	}
	public void setFromRohlik(boolean isFromRohlik) {
		this.isFromRohlik = isFromRohlik;
	}
	public ProductKosik getProductKosik() {
		return productKosik;
	}
	public void setProductKosik(ProductKosik productKosik) {
		this.productKosik = productKosik;
	}
	
}
