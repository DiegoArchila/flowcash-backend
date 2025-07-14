/******************************************
* SCRIPT CREATION STRUCTURE ON POSTGRESQL *
* VERSION:0.1
* AUTOR: Diego Alonso Archila
* ENVIRONMENT: Production
*******************************************/

-- Create the user role for the application
CREATE ROLE ma_user WITH
    NOCREATEROLE    -- User cannot create new roles/users
    NOINHERIT       -- User does not inherit privileges from roles it is a member of by default
    LOGIN           -- User can log in
    CONNECTION LIMIT -1 -- No limit on concurrent connections
    PASSWORD 'Test.123456'; -- Set the password for the user

-- Grant essential permissions on the 'public' schema
-- 1. Grant USAGE: Allows the user to access objects within the schema (e.g., tables, functions).
GRANT USAGE ON SCHEMA public TO ma_user;

-- 2. Grant CREATE: Crucial for allowing the user to create new tables, views, functions, etc., within the schema.
-- This is the missing piece that caused your "permission denied" error.
GRANT CREATE ON SCHEMA public TO ma_user;

-- 3. Grant SELECT: Allows the user to read data from existing tables.
-- (if applicable, e.g., during migrations by a superuser) also grant permissions to ma_user.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO ma_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO ma_user;
