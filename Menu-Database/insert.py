from models import MenuItems
from sqlalchemy import insert

ins = insert(MenuItems).values(name='Cheese platter', \
    description='A small platter of different types of cheeses', \
        allergens='Milk', kcal=164, course='side', vegan=False)