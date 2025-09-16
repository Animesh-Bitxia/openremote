from superset.app import create_app
from superset.extensions import db
from superset.models.core import Database

app = create_app()

with app.app_context():
    # Define your external database
    external_db = Database(
        database_name="OpenRemoteDB",
        sqlalchemy_uri="postgresql://postgres:postgres@postgresql:5432/openremote",
    )

    # Add if not exists
    existing = (
        db.session.query(Database)
        .filter_by(database_name=external_db.database_name)
        .first()
    )
    if not existing:
        db.session.add(external_db)
        db.session.commit()
        print("✅ Registered external database: OpenRemoteDB")
    else:
        print("ℹ️ Database already exists, skipping.")
