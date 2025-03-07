from .database import engine, Base
from .models.user import User  # Correct import based on directory structure

def create_tables():
    with engine.begin() as conn:
        print("Creating tables...")
        Base.metadata.create_all(conn)

if __name__ == "__main__":
    create_tables()
