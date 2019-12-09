package com.rohlik.data.kosik.entities;

import com.rohlik.data.entities.Category;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(CategoryKosik.class)
public abstract class CategoryKosik_ {

	public static volatile SingularAttribute<CategoryKosik, String> parentName;
	public static volatile SingularAttribute<CategoryKosik, Integer> equiId;
	public static volatile SingularAttribute<CategoryKosik, String> parentUri;
	public static volatile SingularAttribute<CategoryKosik, Integer> equiParentId;
	public static volatile SetAttribute<CategoryKosik, ChildKosik> children;
	public static volatile SingularAttribute<CategoryKosik, String> equiCategoryName;
	public static volatile SingularAttribute<CategoryKosik, Integer> id;
	public static volatile SetAttribute<CategoryKosik, Category> categories;
	public static volatile SingularAttribute<CategoryKosik, String> categoryName;
	public static volatile SingularAttribute<CategoryKosik, String> uri;
	public static volatile SetAttribute<CategoryKosik, ProductKosik> products;

	public static final String PARENT_NAME = "parentName";
	public static final String EQUI_ID = "equiId";
	public static final String PARENT_URI = "parentUri";
	public static final String EQUI_PARENT_ID = "equiParentId";
	public static final String CHILDREN = "children";
	public static final String EQUI_CATEGORY_NAME = "equiCategoryName";
	public static final String ID = "id";
	public static final String CATEGORIES = "categories";
	public static final String CATEGORY_NAME = "categoryName";
	public static final String URI = "uri";
	public static final String PRODUCTS = "products";

}

