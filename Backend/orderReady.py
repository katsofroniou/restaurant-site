from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def button_pressed():
    if request.method == 'POST':
        if request.form.get('order_ready_button') == 'order_ready_button':
            return "Kitchen staff has notified waiter"
    return "Order ready to be collected by waiter"
 
if __name__ == '__main__':
    app.run(debug = True)