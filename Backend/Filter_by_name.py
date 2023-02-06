from sqlalchemy.sql import text
from sqlalchemy import create_engine
from config import DATABASE_URI
from models import Base
from insert import addDishes
from sqlalchemy.engine.url import URL
from sqlalchemy.orm import sessionmaker
from models import oaxaca
from sqlalchemy import insert
import json

engine = create_engine(DATABASE_URI)
Base.metadata.create_all(engine)
Session = engine.connect()

def addDishes(Session):
    with open('Menu-Database/dishes.json', 'r') as f:
        dishes = json.load(f)

Session = sessionmaker(bind = engine)
session = Session()
results = session.query(oaxaca).filter(oaxaca.name.like("%Chicken%")).all()
