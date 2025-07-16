/**
On fields active and created_at sets that Null by JPA on java generate conflicts
only for those
*/
CREATE TABLE products (
	id SERIAL NOT NULL,
	name VARCHAR(128) NOT NULL,
	description VARCHAR(256) NULL,
	sku VARCHAR(256) NULL UNIQUE,
	um_id INTEGER NOT NULL,
	group_id INTEGER NOT NULL,
	active BOOLEAN NOT NULL DEFAULT TRUE,
	notes TEXT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);
 
CREATE TABLE supplies (
	id SERIAL NOT NULL,
	name VARCHAR(128) NOT NULL,
	description TEXT NULL,
	um_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE unit_measure (
	id SMALLSERIAL NOT NULL,
	name VARCHAR(256) NOT NULL UNIQUE,
	description TEXT NULL,
	symbol VARCHAR(10) NOT NULL UNIQUE,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE products_images (
	id SERIAL NOT NULL,
	name VARCHAR(256) NOT NULL UNIQUE,
	path VARCHAR(256) NOT NULL,
	product_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE products_groups (
	id SERIAL NOT NULL,
	name VARCHAR(256) NOT NULL UNIQUE,
	description VARCHAR(256) NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE products_supplies (
	id SERIAL NOT NULL,
	product_id INTEGER NOT NULL,
	supply_id INTEGER NOT NULL,
	um_id INTEGER NOT NULL,
	amount REAL NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE products
	ADD CONSTRAINT fk_um_id
		FOREIGN KEY(um_id)
			REFERENCES unit_measure(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE products
	ADD CONSTRAINT fk_group_id
		FOREIGN KEY(group_id)
			REFERENCES products_groups(id);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE products_images
	ADD CONSTRAINT fk_product_id
		FOREIGN KEY(product_id)
			REFERENCES products(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE supplies
	ADD CONSTRAINT fk_um_id
		FOREIGN KEY(um_id)
			REFERENCES unit_measure(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE products_supplies
	ADD CONSTRAINT fk_product_id
		FOREIGN KEY(product_id)
			REFERENCES products(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE products_supplies
	ADD CONSTRAINT fk_supply_id
		FOREIGN KEY(supply_id)
			REFERENCES supplies(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE products_supplies
	ADD CONSTRAINT fk_um_id
		FOREIGN KEY(um_id)
			REFERENCES unit_measure(id);


/***********************
* ENVIRONMENT: PEOPLES 
* CREATE TABLES 
***********************/

-- DROP TABLES
--DROP TABLE IF EXISTS peoples_locations;
--DROP TABLE IF EXISTS peoples;
--DROP TABLE IF EXISTS peoples_genders;
--DROP TABLE IF EXISTS peoples_dni_types;

-- 1. CREATE TABLE: peoples
CREATE TABLE peoples (
	id SERIAL NOT NULL,
	first_name VARCHAR(256) NOT NULL,
	last_name VARCHAR(256) NOT NULL,
	date_born DATE NOT NULL,
	gender_id INTEGER NOT NULL,
	dni_type_id INTEGER NOT NULL,
	dni VARCHAR(128) NOT NULL,
	phone VARCHAR(32) NOT NULL,
	email VARCHAR(256) NOT NULL,
	image_profile VARCHAR(256) NOT NULL,
	pwd VARCHAR(256) NOT NULL,
	active boolean NOT NULL DEFAULT true,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- 2. CREATE TABLE: peoples_genders
CREATE TABLE peoples_genders (
	id SERIAL NOT NULL,
	gender VARCHAR(64) NOT NULL UNIQUE,
	description VARCHAR(256) NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- 3. CREATE TABLE: peoples_locations
CREATE TABLE peoples_locations (
	id SERIAL NOT NULL,
	name_location VARCHAR(128) NOT NULL,
	people_id INTEGER NOT NULL,
	phone VARCHAR(32) NOT NULL,
	email VARCHAR(256) NOT NULL,
	country VARCHAR(128) NOT NULL,
	state_departament VARCHAR(128) NOT NULL,
	city_town VARCHAR(128) NOT NULL,
	address_line VARCHAR(256) NOT NULL,
	notes TEXT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- 4. CREATE TABLE: peoples_dni_type
CREATE TABLE peoples_dni_types (
	id SERIAL NOT NULL,
	dni_type VARCHAR(128) NOT NULL UNIQUE,
	description VARCHAR(256) NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- 5. ALTER TABLE: ADD CONSTRAINT
ALTER TABLE peoples
	ADD CONSTRAINT fk_gender_id
		FOREIGN KEY(gender_id)
			REFERENCES peoples_genders(id),
	ADD CONSTRAINT fk_dni_type_id
		FOREIGN KEY(dni_type_id)
			REFERENCES peoples_dni_types(id);
			
ALTER TABLE peoples_locations			
	ADD CONSTRAINT fk_peoples_locations_id
		FOREIGN KEY(people_id)
			REFERENCES peoples(id);
			
-- 5. INSERT INTO: DEPENDENCES TABLE
INSERT INTO peoples_genders(
	gender,
	description
) VALUES (
	'Hombre',
	'Genero masculino'
), (
	'Mujer',
	'Genero femenimo'
), (
	'Otro',
	'Otro genero'
);

/*
*https://www.registraduria.gov.co/Glosario-de-identificacion.html
*/
INSERT INTO peoples_dni_types (
	dni_type,
	description
) VALUES (
	'CC',
	'Cedula Ciudadania'
), (
	'TI',
	'Tarjeta de Identidad'
), (
	'PA',
	'Pasaporte'
);

INSERT INTO peoples (
	first_name,
	last_name,
	date_born,
	gender_id,
	dni_type_id,
	dni,
	phone,
	email,
	image_profile,
	pwd,
	active
) VALUES (
	'Diego',
	'Archila',
	'16/01/1991',
	'1',
	'1',
	'1082928069',
	'3142836724',
	'daat3523@gmail.com',
	'/public/img/avatar.jpg',
	'P45W0R7',
	true
);

INSERT INTO peoples_locations (
	name_location,
	people_id,
	phone,
	email,
	country,
	state_departament,
	city_town,
	address_line
) VALUES (
	'mi casa',
	1,
	'3142836724',
	'daat3523@gmail.com',
	'colombia',
	'antioquia',
	'rionegro',
	'calle 52 #61-337. Segundo piso. Vereda falda del palo.'
);



/***********************
* ENVIRONMENT: EMPLOYEES
* CREATE TABLES 
***********************/

CREATE TABLE employees (
	id SERIAL NOT NULL,
	people_id INTEGER NOT NULL,
	location_id INTEGER NOT NULL,
	manager_id INTEGER NULL,
	gender_id INTEGER NOT NULL,
	position_id INTEGER NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NULL,
	phone VARCHAR(32) NOT NULL,
	email VARCHAR(256) NOT NULL,
	active boolean NOT NULL DEFAULT true,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employees_positions (
	id SMALLSERIAL NOT NULL,
	name_position VARCHAR(256) NOT NULL UNIQUE,
	description VARCHAR(256) NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);
	
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE employees
	ADD CONSTRAINT fk_position_id
		FOREIGN KEY(position_id)
			REFERENCES employees_positions(id);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE employees
	ADD CONSTRAINT fk_people_id
		FOREIGN KEY(people_id)
			REFERENCES peoples(id);

/***********************
* ENVIRONMENT: LOCATIONS
* CREATE TABLES 
***********************/

CREATE TABLE locations (
	id SMALLSERIAL NOT NULL,
	name VARCHAR(128) NOT NULL,
	location_type_id SMALLINT NOT NULL,
	manager_id INTEGER NOT NULL,
	country VARCHAR(128) NOT NULL,
	state_department VARCHAR(128) NOT NULL,
	city_town VARCHAR(128) NOT NULL,
	address_line VARCHAR(256) NOT NULL,
	notes TEXT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE locations_types (
	id SMALLSERIAL NOT NULL,
	name VARCHAR(128) NOT NULL,
	description VARCHAR(256) NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE locations_phones (
	id SERIAL NOT NULL,
	phone VARCHAR(32) NOT NULL,
	description VARCHAR(256) NULL,
	location_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE locations_emails (
	id SERIAL NOT NULL,
	email VARCHAR(256) NOT NULL UNIQUE,
	description VARCHAR(256) NULL,
	location_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE locations_images (
	id SERIAL NOT NULL,
	path VARCHAR(256) NOT NULL,
	name VARCHAR(128) NULL,
	description VARCHAR(256) NULL,
	location_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE locations
	ADD CONSTRAINT fk_location_type_id
		FOREIGN KEY(location_type_id)
			REFERENCES locations_types(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE locations_phones
	ADD CONSTRAINT fk_location_id
		FOREIGN KEY(location_id)
			REFERENCES locations(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE locations_emails
	ADD CONSTRAINT fk_location_id
		FOREIGN KEY(location_id)
			REFERENCES locations(id);
			
-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE locations_images
	ADD CONSTRAINT fk_location_id
		FOREIGN KEY(location_id)
			REFERENCES locations(id);


/***********************
* ENVIRONMENT: SALES
* CREATE TABLES 
***********************/

CREATE TABLE sales (
	id SERIAL NOT NULL,
	people_id INTEGER NOT NULL,
	location_id INTEGER NOT NULL,
	sale_number VARCHAR(128) NOT NULL,
	sale_total MONEY NOT NULL,
	is_paid BOOLEAN NOT NULL DEFAULT true,
	paid_method_id SMALLINT NOT NULL, 
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE paid_methods (
	id SMALLSERIAL NOT NULL,
	paid_method VARCHAR(256) NOT NULL UNIQUE,
	description VARCHAR(256) NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

CREATE TABLE sales_products (
	id SERIAL NOT NULL,
	sale_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	price MONEY NOT NULL,
	amount REAL NOT NULL,
	created_at TIMESTAMP WITH time zone NOT NULL DEFAULT current_timestamp,
	updated_at TIMESTAMP WITH time zone NULL,
	deleted_at TIMESTAMP WITH time zone NULL,
	PRIMARY KEY (id)
);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS INTERNAL, VIEW DIAGRAM
ALTER TABLE sales
	ADD CONSTRAINT fk_paid_method_id
		FOREIGN KEY(paid_method_id)
			REFERENCES paid_methods(id);

-- ALTER TABLE: ADD CONSTRAINTS FOREIGN KEYS EXTERNAL, VIEW DIAGRAM
ALTER TABLE sales_products
	ADD CONSTRAINT fk_sale_id
		FOREIGN KEY(sale_id)
			REFERENCES sales(id);

/***********************
** CREATE TRIGGERS
** VERSION: 0.1
***********************/

/**
	MAIN FUNCTION
*/
CREATE OR REPLACE FUNCTION fn_on_tables() RETURNS TRIGGER
AS $$
BEGIN
	CASE TG_OP
		WHEN 'UPDATE' THEN
			IF (OLD IS DISTINCT FROM NEW) THEN
				NEW.updated_at=NOW();
				RAISE NOTICE 'Updated on % SUCCESSFUL', TG_TABLE_NAME;
				RETURN NEW;
			ELSE
				RAISE NOTICE 'Nothing to update on %', TG_TABLE_NAME;
				RETURN NULL;
			END IF;
		WHEN 'DELETE' THEN
			IF TG_TABLE_NAME='products' THEN
				EXECUTE 'UPDATE '|| TG_TABLE_NAME ||' SET deleted_at=NOW(), active=false WHERE id=' || OLD.id;
			ELSE
				EXECUTE 'UPDATE '|| TG_TABLE_NAME ||' SET deleted_at=NOW() WHERE id=' || OLD.id;
			END IF;	
			RETURN NULL;
	END CASE;		
END;
$$
LANGUAGE plpgsql;


/**
	FUNCTION Products INSERT
	DESCRIPTION: Validate if the fields name and description are equals with some record.
	If not is it, then save the new product
*/
CREATE OR REPLACE FUNCTION fn_on_insert_products() RETURNS TRIGGER
AS $$
DECLARE
product BOOLEAN;
BEGIN
	RAISE NOTICE 'El valor de si es existe es: %, y el producto es: %', product, NEW.name;
	RAISE NOTICE 'El valor de si es existe es: %', product;
	SELECT 
		EXISTS(SELECT 1 FROM products WHERE name=NEW.name AND description=NEW.description)
	INTO
		product;
	RAISE NOTICE 'El valor de si es existe es: %', product;
	IF (product) THEN
		RAISE NOTICE 'El producto ya existe';
		RETURN NULL;
	ELSE
		RAISE NOTICE 'El producto NO existe';
		RETURN NEW;
	END IF;
END;
$$
LANGUAGE plpgsql;


-------------------------------------------------------------------------------


/**
	TRIGGER: peoples
*/
CREATE TRIGGER TG_on_update_peoples
BEFORE UPDATE OR DELETE ON peoples
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: peoples_dni_types
*/
CREATE TRIGGER TG_on_update_peoples_dni_types
BEFORE UPDATE OR DELETE ON peoples_dni_types
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: peoples_genders
*/
CREATE TRIGGER TG_on_update_peoples_genders
BEFORE UPDATE OR DELETE ON peoples_genders
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: peoples_locations
*/
CREATE TRIGGER TG_on_update_peoples_locations
BEFORE UPDATE OR DELETE ON peoples_locations
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

-------------------------------------------------------------------------------

/**
	TRIGGER: products
*/
CREATE TRIGGER TG_on_update_products
BEFORE UPDATE OR DELETE ON products
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

CREATE TRIGGER TG_on_insert_products
BEFORE INSERT ON products
EXECUTE PROCEDURE fn_on_insert_products();

/**
	TRIGGER: supplies
*/
CREATE TRIGGER TG_on_update_supplies
BEFORE UPDATE OR DELETE ON supplies
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: unit_measure
*/
CREATE TRIGGER TG_on_update_unit_measure
BEFORE UPDATE OR DELETE ON unit_measure
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: products_images
*/
CREATE TRIGGER TG_on_update_products_images
BEFORE UPDATE OR DELETE ON products_images
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: products_groups
*/
CREATE TRIGGER TG_on_update_products_groups
BEFORE UPDATE OR DELETE ON products_groups
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: products_supplies
*/
CREATE TRIGGER TG_on_update_products_supplies
BEFORE UPDATE OR DELETE ON products_supplies
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

-------------------------------------------------------------------------------

/**
	TRIGGER: employees
*/
CREATE TRIGGER TG_on_update_employees
BEFORE UPDATE OR DELETE ON employees
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables(); 

/**
	TRIGGER: employees_positions
*/
CREATE TRIGGER TG_on_update_employees_positions
BEFORE UPDATE OR DELETE ON employees_positions
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables(); 

-------------------------------------------------------------------------------

/**
	TRIGGER: locations
*/
CREATE TRIGGER TG_on_update_locations
BEFORE UPDATE OR DELETE ON locations
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables(); 

/**
	TRIGGER: locations_types
*/
CREATE TRIGGER TG_on_update_locations_types
BEFORE UPDATE OR DELETE ON locations_types
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: locations_phones
*/
CREATE TRIGGER TG_on_update_locations_phones
BEFORE UPDATE OR DELETE ON locations_phones
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: locations_emails
*/
CREATE TRIGGER TG_on_update_locations_emails
BEFORE UPDATE OR DELETE ON locations_emails
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: locations_images
*/
CREATE TRIGGER TG_on_update_locations_images
BEFORE UPDATE OR DELETE ON locations_images
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

-------------------------------------------------------------------------------

/**
	TRIGGER: sales
*/
CREATE TRIGGER TG_on_update_sales
BEFORE UPDATE OR DELETE ON sales
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: sales_products
*/
CREATE TRIGGER TG_on_update_sales_products
BEFORE UPDATE OR DELETE ON sales_products
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();

/**
	TRIGGER: paid_methods
*/
CREATE TRIGGER TG_on_update_paid_methods
BEFORE UPDATE OR DELETE ON paid_methods
FOR EACH ROW
EXECUTE PROCEDURE fn_on_tables();
