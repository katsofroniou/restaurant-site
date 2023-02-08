from models import Dishes
from main import Session

result = Session.query(Dishes).filter(Dishes.name)

