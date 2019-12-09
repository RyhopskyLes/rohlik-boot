package com.rohlik.data.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.rohlik.data.entities.Child;


//@RepositoryRestResource
public interface ChildRepository extends JpaRepository<Child, Integer> {
	List<Child> findAll();
	Child findByid(Integer id);
	Child findByCategoryId(Integer id);
}
