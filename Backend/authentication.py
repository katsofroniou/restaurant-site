from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from main import Session
from models import Logins
from sqlalchemy import select

# import from database table logins
def readLogins():
    logins = select(Logins)
    results = Session.execute(logins)
    resultSet = [r for r in results]
    
    return resultSet

# use mod and for loop for each user
def addAllUsers():
    allLogins = readLogins()
    
    for login in allLogins:
        # id3 = user, id0 = email, id-1 = password
        user = User.objects.create_user(login[3], login[0], login[-1])
        user.first_name = login[1]
        user.last_name = login[2]
        
        user.save()
        
    logins = get_user_model()
    users = logins.objects.all()
    print(users)
    
# will be implemented later
def addNewUser():
    pass

def deleteUser():
    pass

addAllUsers()
