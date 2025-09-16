-- init-superset-db.sql (instead of .sh)
-- This runs safely during first container initialization

-- Create superset user
CREATE USER superset WITH PASSWORD 'superset';

-- Create superset database
CREATE DATABASE superset OWNER superset;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE superset TO superset;
