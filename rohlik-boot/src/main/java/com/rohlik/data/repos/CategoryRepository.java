package com.rohlik.data.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import com.rohlik.data.entities.Category;
import com.rohlik.data.entities.Child;



@RepositoryRestResource
public interface CategoryRepository extends JpaRepository<Category, Integer> {
		
	@RestResource(path = "categoryid", rel = "categoryid")
	public Category findByCategoryId(@Param("id") Integer id);	
	
	@RestResource(path = "mainparents", rel = "mainparents")
	@Query("SELECT c FROM Category c WHERE c.parentId = 0 and c.id < 1341")
	public List<Category> findMainCategoriesFromNavigation();
	
	@RestResource(path = "navigation", rel = "navigation")
	@Query("SELECT c FROM Category c WHERE c.categoryId in (SELECT p.categoryId FROM Category c LEFT JOIN c.children p WHERE c.parentId = 0 and c.id < 1341)")
	public List<Category> findCategoriesForNavigation();	
}
