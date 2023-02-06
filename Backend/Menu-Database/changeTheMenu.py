from database import Session
from models import oaxaca
from sqlalchemy.sql import text
from sqlalchemy import delete
from sqlalchemy import insert

#add item
def addItem(Session):
    query = """INSERT INTO dishes(id, name, description, allergens, kcal, course, price, vegetarian, vegan)
    VALUES(475, 'Cheeseburger', 'Mature cheddar cheese, red onion rings, lettuce, tomato, ketchup', '{Milk, Eggs, Gluten}',
    '800', 'Main', 6.99, false, false)"""

    stmt = (insert(oaxaca).values(id=1234, name='Cheeseburger', description='Mature cheddar cheese, red onion rings, lettuce, tomato, ketchup', allergens='{Milk, Eggs, Gluten', kcal=800, course='Main', price=6.99, vegetarian=False, vegan=False))
    return Session.execute(query)

#delete item
def deleteItem(Session):
    query = delete().where(oaxaca.name == "Cheeseburger")
    Session.execute(query)


#alter item
#addItem(Session)
addItem(Session)