package com.rohlik.data;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.mashape.unirest.http.exceptions.UnirestException;



@SpringBootApplication
public class ModelClassesGenerator {

	public static void main(String[] args) throws IOException, UnirestException {
		SpringApplication.run(ModelClassesGenerator.class, args);	
	
	}

}

