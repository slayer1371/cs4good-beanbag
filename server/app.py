from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from flask_cors import CORS
import certifi

#Socket.io is for future real time score tracking using websockets, will look more into it 
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Connect to MongoDB
url = "mongodb+srv://xbriggs:5fnz7AesTp1DYyFx@teamscoredb.gkrjr.mongodb.net/TeamScoreDB?retryWrites=true&w=majority&appName=TeamScoreDB&authSource=admin"
client = MongoClient(url, tlsCAFile=certifi.where())
db = client["beanbag_toss"]
teams_collection = db["teams"]
scores_collection = db["scores"]

#Team Logic
@app.route("/register_team", methods=["POST"])
def register_team():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    """Register a new team into the database."""
    data = request.json
    team_name = data.get("name")
    if not team_name:
        return jsonify({"error": "Team name cannot be empty"}), 400

    # Check if team already exists
    existing_team = teams_collection.find_one({"name": team_name})
    if existing_team:
        return jsonify({"error": "Team already exists"}), 409

    # Insert team into MongoDB
    teams_collection.insert_one({"name": team_name})
    # builds skeleton for each team score -> is team_collection necessary?
    scores_collection.inser_one({"name": team_name, "scores":[]})
    return jsonify({"message": f"Team '{team_name}' registered successfully!"}), 201

@app.route("/get_teams", methods=["GET"])
def get_teams():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    """Retrieve all registered teams."""
    teams = teams_collection.find({}, {"_id": 0, "name": 1})
    return jsonify([team["name"] for team in teams])

#Score logic still needs to be figured out 
@app.route("/submit_score", methods=["POST"])
def submit_score():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    data = request.json
    team_name = data.get("name")
    score = data.get("score")
    scores_collection.updateOne({"name":team_name},{"$push":{"scores":score}})
    return jsonify({"message": f"Score of '{score}' added to '{team_name}' successfully!"}), 201
 

@app.route("/get_scores", methods=["GET"])
def get_scores():
    score_data =  scores_collection.find({},{"_id": 0, "name": 1, "scores": 1})
    return score_data
# do we need?
# def get_all_scores():
#     scores_collection.find({},{"_id": 0})

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=3000, debug=True)