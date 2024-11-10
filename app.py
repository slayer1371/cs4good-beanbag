from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/', methods=['GET'])
def backend():
    return "This Server is Running"
@app.route('/hello/', methods=['GET', 'POST'])
def welcome():
    return "Hello World!"
@app.route('/test', methods=['POST'])
def test_post():
    data = request.get_json()
    P_One = data['P_OneScore']
    P_Two = data['P_TwoScore']
    avg = (P_One + P_Two) / 2 
    print(avg)
    return data

if __name__ == '__main__':
    app.run(debug=True)
3