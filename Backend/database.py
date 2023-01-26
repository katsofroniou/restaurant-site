from sqlalchemy import create_engine, MetaData
from dbconfig import DATABASE_URI
from models import Base
from insert import ins
from sqlalchemy.orm import scoped_session, sessionmaker

engine = create_engine(DATABASE_URI)
metadata = MetaData()
Session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
def init_db():
    metadata.create_all(bind=engine)

# Creating  a connection to the database
engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)

# Drops all tables if they exist and creates them again
def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

recreate_database()

# Executes the first insert statement
Session.execute(ins)