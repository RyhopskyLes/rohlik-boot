package com.rohlik.data.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rohlik.data.entities.Sale;


public interface SalesRepository extends JpaRepository<Sale, Integer>{

}
