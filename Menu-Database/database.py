from sqlalchemy import create_engine
from config import DATABASE_URI
from models import Base
from insert import ins

# Creating  a connection to the database
engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)
Session = engine.connect()

# Drops all tables if they exist and creates them again
def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

recreate_database()

# Executes the first insert statement
Session.execute(ins)