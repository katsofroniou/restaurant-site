from models import oaxaca
from sqlalchemy import insert

# Inserts into the database OAXACA a new sample food "Cheese Platter"
# This will be changed to the actual menu as we progress
ins = insert(oaxaca).values(name='Cheese platter', \
    description='A small platter of different types of cheeses', \
        allergens='Milk', kcal=164, course='side', vegan=False)