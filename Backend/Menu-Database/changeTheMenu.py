from database import Session
from models import oaxaca
from sqlalchemy import delete


#add item
def addItem(Session):
    query = """INSERT INTO dishes(id, name, description, allergens, kcal, course, price, vegetarian, vegan)
    VALUES(475, 'Cheeseburger', 'Mature cheddar cheese, red onion rings, lettuce, tomato, ketchup', '{Milk, Eggs, Gluten}',
    '800', 'Main', 6.99, false, false)"""

    return Session.execute(query)

#delete item
def deleteItem(Session):
    query = """DELETE FROM dishes WHERE id=475"""
    Session.execute(query)


#alter item


#addItem(Session)
deleteItem(Session)