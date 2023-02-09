from main import Session
from models import Dishes

def searchDishes(term):
    results = Session.query(Dishes).filter(Dishes.name.like(term) | Dishes.allergens.like(f'%{term}%') | Dishes.course.like(f'%{term}%') | Dishes.description.like(f'%{term}%') | Dishes.price.like(f'%{term}%')).all()

