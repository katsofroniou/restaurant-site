from main import Session
from models import Logins
from sqlalchemy import select

# import from database table logins
logins = select(Logins)
results = Session.execute(logins)
print(results)