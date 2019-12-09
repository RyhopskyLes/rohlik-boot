package com.rohlik.data.kosik.entities;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(ChildKosik.class)
public abstract class ChildKosik_ {

	public static volatile SingularAttribute<ChildKosik, CategoryKosik> parent;
	public static volatile SingularAttribute<ChildKosik, Integer> equiId;
	public static volatile SingularAttribute<ChildKosik, String> parentUri;
	public static volatile SingularAttribute<ChildKosik, String> equiCategoryName;
	public static volatile SingularAttribute<ChildKosik, Integer> id;
	public static volatile SingularAttribute<ChildKosik, String> categoryName;
	public static volatile SingularAttribute<ChildKosik, String> uri;

	public static final String PARENT = "parent";
	public static final String EQUI_ID = "equiId";
	public static final String PARENT_URI = "parentUri";
	public static final String EQUI_CATEGORY_NAME = "equiCategoryName";
	public static final String ID = "id";
	public static final String CATEGORY_NAME = "categoryName";
	public static final String URI = "uri";

}

