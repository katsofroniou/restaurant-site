#All this code is from https://python-adv-web-apps.readthedocs.io/en/latest/flask_db1.html#:~:text=You'll%20connect%20your%20Flask,is%20how%20to%20connect%20it. none of it is my own i'm just running it to learn flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text

app = Flask(__name__)

# This is a pre existing database from an old project, this will need to be changed
db_name = 'NEA.sqlite3'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + db_name

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

# this variable, db, will be used for all SQLAlchemy commands
db = SQLAlchemy(app)

# NOTHING BELOW THIS LINE NEEDS TO CHANGE
# this route will test the database connection and nothing more
@app.route('/')
def testdb():
    try:
        db.session.query(text('1')).from_statement(text('SELECT 1')).all()
        return '<h1>It works.</h1>'
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)