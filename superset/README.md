# OpenRemote Superset Integration

This directory contains the configuration and deployment files for integrating Apache Superset as a BI tool for visualizing OpenRemote IoT data (e.g., asset attributes, rules, analytics).

## Setup

1. Build the Docker image: `docker build -t openremote/superset .`
2. For Kubernetes: Use the Helm chart in `kubernetes/`.
3. Configuration: Edit `config/superset_config.py` for database connections (e.g., to OpenRemote's PostgreSQL) and Keycloak auth.

## Integration Notes

- Superset connects to OpenRemote's manager API or shared DB for data sources.
- Embed dashboards in OpenRemote UI via iframes or dedicated routes.
- Ensure Superset metadata DB is set up (can use a separate Postgres instance).

For more details, see the official [Apache Superset docs](https://superset.apache.org/docs/).
