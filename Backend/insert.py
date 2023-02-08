from sqlalchemy import insert
from models import Dishes
import json

def addDishes(Session):
    with open('Backend/dishes.json', 'r') as f:
        dishes = json.load(f)

    for dish in dishes:
        ins = insert(Dishes).values(name=dish["name"], \
        description=dish["description"], allergens=dish["allergens"], \
            kcal=dish["calories"], course=dish["course"], price=dish["price"], \
                vegetarian=dish["vegetarian"], vegan=dish["vegan"])
        
        Session.execute(ins)