#All this code is from https://python-adv-web-apps.readthedocs.io/en/latest/flask_db1.html#:~:text=You'll%20connect%20your%20Flask,is%20how%20to%20connect%20it. none of it is my own i'm just running it to learn flask
from flask import *
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from sqlalchemy.engine.url import URL
from flask_migrate import Migrate
from models import oaxaca
import database
import dbconfig


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = dbconfig.DATABASE_URI

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)
database.init_db()

@app.teardown_appcontext
def shutdown_session(exception=None):
    database.Session.remove()
    
@app.route('/Menu', methods=['POST', 'GET'])
def handle_items():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_item = oaxaca(id=data['id'], name=data['name'], description=data['description'], allergens = data['allergens'], kcal = data['kcal'], course = data['course'], vegan = data['vegan'])
            database.Session.add(new_item)
            database.Session.commit()
            return {"message": f"item {new_item.name} has been created successfully."}
        else:
            return {"error": "The request payload is not in JSON format"}

    elif request.method == 'GET':
        menu = oaxaca.query
        results = [
            {
                "id": oaxaca.id,
                "name": oaxaca.name,
                "description": oaxaca.description,
                "allergens": oaxaca.allergens,
                "kcal": oaxaca.kcal,
                "course": oaxaca.course,
                "vegan": oaxaca.vegan
                
            } for item in menu]

        return {"count": len(results), "items": results}
if __name__ == '__main__':
    app.run(debug=True)