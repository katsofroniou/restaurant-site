from sqlalchemy import create_engine
from config import DATABASE_URI
from models import Base
from insert import ins

engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)

def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    
Session = engine.connect()

recreate_database()
Session.execute(ins)