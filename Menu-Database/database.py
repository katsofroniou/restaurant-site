from sqlalchemy import create_engine, insert
from config import DATABASE_URI
from models import Base
import insert
        
engine = create_engine(DATABASE_URI)
connection = engine.connect()

Base.metadata.create_all(engine)

connection.execute(insert.ins)