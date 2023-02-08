from sqlalchemy import insert
from models import Dishes, Logins
import json

def addDishes(Session):
    with open('Backend/json-files/dishes.json', 'r') as f:
        dishes = json.load(f)

    for dish in dishes:
        ins = insert(Dishes).values(name=dish["name"], \
        description=dish["description"], allergens=dish["allergens"], \
        kcal=dish["calories"], course=dish["course"], price=dish["price"], \
        vegetarian=dish["vegetarian"], vegan=dish["vegan"])
        
        Session.execute(ins)
        
    Session.commit()
        
def addLogin(Session):
    with open('Backend/json-files/logins.json', 'r') as f:
        users = json.load(f)
        
    for user in users:
        ins = insert(Logins).values(email=user["email"], \
            first_name=user["first_name"], last_name=user["last_name"],\
            username=user["username"], password=user["password"])
        
        Session.execute(ins)
    
    Session.commit()