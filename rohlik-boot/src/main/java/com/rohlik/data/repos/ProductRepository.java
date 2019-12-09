package com.rohlik.data.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.rohlik.data.entities.Product;


@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Integer> {


@RestResource(path = "productnamecontains", rel = "productnamecontains")
public Page<Product> findByActiveTrueAndProductNameIgnoreCaseContaining(@Param("name") String name, Pageable p);

@RestResource(path = "premiumproducts", rel = "premiumproducts")
@Query(
		  value = "SELECT * FROM product\r\n" + 
"left outer join kosik_rohlik_product on product.id=kosik_rohlik_product.rohlik"+
				  	" inner join product_sales on product_sales.id_product=product.id\r\n" + 
					" inner join sales on product_sales.id_sales=sales.idSales where sales.type=\"premium\" and product.active=true", 
		  countQuery = "SELECT count(*) \r\n" + 
		  		"FROM rohlik_data.product\r\n" + 
		  		" inner join rohlik_data.product_sales on rohlik_data.product_sales.id_product=rohlik_data.product.id\r\n" + 
		  		" inner join rohlik_data.sales on rohlik_data.product_sales.id_sales=rohlik_data.sales.idSales where rohlik_data.sales.type=\"premium\" and product.active=true;", 
		  nativeQuery = true)
public Page<Product> findAllPremiumProductsWithPagination(Pageable pageable);

@RestResource(path = "incategory", rel = "incategory")
@Query(
		  value = "SELECT * FROM product\r\n" + 
					" inner join rohlik_data.product_category on rohlik_data.product_category.product_id=product.id\r\n" + 
					"left outer join kosik_rohlik_product on product.id=kosik_rohlik_product.rohlik"+
					" inner join category on rohlik_data.product_category.category_id = category.id where category.categoryId= :id and product.active=true", 
		  countQuery = "SELECT count(*) \r\n" + 
				   " FROM product\r\n" + 
					" inner join rohlik_data.product_category on rohlik_data.product_category.product_id=product.id\r\n" + 
					" inner join rohlik_data.category on rohlik_data.product_category.category_id = category.id where category.categoryId= :id and product.active=true", 
		  nativeQuery = true)
public Page<Product> findAllProductsByCategoryId(Pageable pageable, @Param("id") Integer id);





}
