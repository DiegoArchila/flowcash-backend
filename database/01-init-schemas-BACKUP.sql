/**********************************************
 * INIT FILE: 01-init-schema.sql
 * PURPOSE: Grant schema privileges to users
 **********************************************/

-- Grant basic usage and object creation rights to ma_user in the public schema
GRANT USAGE ON SCHEMA public TO ma_user;
GRANT CREATE ON SCHEMA public TO ma_user;

-- Set default privileges for future objects created by ma_admin
-- This ensures ma_user will be able to use the tables/sequences created in public
ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ma_user;

ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE ON SEQUENCES TO ma_user;
