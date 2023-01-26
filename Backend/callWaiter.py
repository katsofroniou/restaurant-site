from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def button_pressed():
    if request.method == 'POST':
        if request.form.get('waiter_button') == 'waiter_button':
            return "Waiter has been called"
    return "waiting"
 
if __name__ == '__main__':
    app.run(debug = True)