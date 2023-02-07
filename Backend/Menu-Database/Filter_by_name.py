from main import Session
from models import Dishes

results = Session.query(Dishes).filter(Dishes.name.like("%Chicken%")).all()