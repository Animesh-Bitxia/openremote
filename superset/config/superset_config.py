# OpenRemote Superset Configuration

import os

# Superset metadata database URI (use OpenRemote's PostgreSQL or a dedicated one)
# For production, use a separate DB to avoid conflicts
SQLALCHEMY_DATABASE_URI = os.environ.get('SUPERSET_DATABASE_URI', 'postgresql://superset:superset@postgres:5432/superset')

# Secret key for session management (generate a strong one in production)
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-me')

# Flask app settings
WTF_CSRF_ENABLED = True
WTF_CSRF_TIME_LIMIT = None

# Feature flags
FEATURE_FLAGS = {
    'ALERT_REPORTS': True,
    'ENABLE_TEMPLATE_PROCESSING': True,
    'EMBEDDED_SUPERSET': True,  # For embedding in OpenRemote UI
}

# Authentication (integrate with Keycloak/OIDC later)
AUTH_TYPE = 1  # Database auth for now; switch to 21 for OIDC

# Row limit for datasets
SQL_MAX_ROW = 10000

# Cache configuration
CACHE_CONFIG = {
    'CACHE_TYPE': 'redis',
    'CACHE_DEFAULT_TIMEOUT': 300,
    'CACHE_KEY_PREFIX': 'superset_',
    'CACHE_REDIS_URL': os.environ.get('REDIS_URL', 'redis://redis:6379/0'),
}

# OpenRemote-specific: Allow CORS for manager API
ENABLE_CORS = True
CORS_OPTIONS = {
    'supports_credentials': True,
    'resources': ['*'],
    'origins': ['http://localhost:9000', 'https://your-openremote-domain.com'],  # Adjust for OpenRemote UI
}

# Enable charts and dashboards for IoT data visualization
CHART_ENGINE_MAP = {
    'sqla': 'superset.utils.core.ChartEngine.DB_ENGINE',
}

# Additional customizations for OpenRemote integration
# e.g., custom themes, plugins for asset data querying
ROW_LIMIT = 5000
SUPERSET_WEBSERVER_PROTOCOL = 'http'  # or https in prod
SUPERSET_WEBSERVER_PORT = 8088

