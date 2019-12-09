package com.rohlik.data.repos;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.rohlik.data.kosik.entities.CategoryKosik;
import com.rohlik.data.kosik.entities.ProductKosik;

//@RepositoryRestResource
public interface CategoryKosikRepository extends JpaRepository<CategoryKosik, Integer>{
	Set<CategoryKosik> findByEquiId(Integer id);
	List<CategoryKosik> findByEquiParentId(Integer id);
	List<CategoryKosik> findByParentName(String name);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children WHERE c.parentName = (:name)")
	List<CategoryKosik> findByParentNameWithChildren(@Param("name")String name);
	List<CategoryKosik> findByCategoryName(String name);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children")
	List<CategoryKosik> findAllWithChildren();
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children LEFT JOIN FETCH c.categories")
	List<CategoryKosik> findAllWithChildrenAndCategories();
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.categories")
	List<CategoryKosik> findAllWithCategories();
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children WHERE c.categoryName = (:name)")
	List<CategoryKosik> findByCategoryNameWithChildren(@Param("name") String name);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c  LEFT JOIN FETCH c.children WHERE c.id = (:id)")
	Optional<CategoryKosik> findByIdWithChildren(@Param("id") Integer id);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.categories WHERE c.id = (:id)")
	Optional<CategoryKosik> findByIdWithCategories(@Param("id") Integer id);
	Optional<CategoryKosik> findByUri(String uri);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children WHERE c.uri = (:uri)")
	Optional<CategoryKosik> findByUriWithChildren(@Param("uri") String uri);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.categories WHERE c.uri = (:uri)")
	Optional<CategoryKosik> findByUriWithCategories(@Param("uri") String uri);
	List<CategoryKosik> findByParentUri(String uri);
	@Query("SELECT DISTINCT c FROM  CategoryKosik c LEFT JOIN FETCH c.children WHERE c.parentUri = (:uri)")
	List<CategoryKosik> findByParentUriWithChildren(@Param("uri") String uri);
}
