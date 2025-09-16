# Use official Superset dev image
FROM apache/superset:latest-dev

# Switch to root to install dependencies
USER root

# Install PostgreSQL client for pg_isready
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Copy Superset configuration
COPY config/superset_config.py /app/pythonpath/superset_config.py

## Copy external DB initialization script
#COPY init_databases.py /app/init_databases.py

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose Superset port
EXPOSE 8088

# Switch back to superset user
USER superset

# Use our custom entrypoint
ENTRYPOINT ["/entrypoint.sh"]
