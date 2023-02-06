from models import Dishes
from sqlalchemy import insert
import json

def addDishes(Session):
    with open('Backend/Menu-Database/dishes.json', 'r') as f:
        dishes = json.load(f)

    for dish in dishes:
        ins = insert(dishes).values(name=dish["name"], \
        description=dish["description"], allergens=dish["allergens"], \
            kcal=dish["calories"], course=dish["course"], price=4.99, \
                vegetarian=dish["vegetarian"], vegan=dish["vegan"])
        
        Session.execute(ins)