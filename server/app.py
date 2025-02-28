from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)

# Connect to MongoDB
# password = 'sTh4uYbQx72OaClx'
# uri = "mongodb+srv://bforseth:"+password+"@beanbagcluster.lsads.mongodb.net/?retryWrites=true&w=majority&appName=BeanbagCluster"

uri = "mongodb+srv://xbriggs:5fnz7AesTp1DYyFx@teamscoredb.gkrjr.mongodb.net/TeamScoreDB?retryWrites=true&w=majority&appName=TeamScoreDB&authSource=admin"


# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
# Brandon's db collections
# db = client["BeanbagData"]
# teams_collection = db["Team_Data"]
# scores_collection = db["Score_Data"]

#Xavier's db collections
db = client["beanbag_toss"]
teams_collection = db["teams"]
scores_collection = db["scores"]

#Team Logic
@app.route("/register_team", methods=["POST"])
def register_team():
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
    scores_collection.insert_one({"name": team_name, "scores":[]})
    return jsonify({"message": f"Team '{team_name}' registered successfully!"}), 201

@app.route("/get_teams", methods=["GET"])
def get_teams():
    """Retrieve all registered teams."""
    teams = list(teams_collection.find({}, {"_id": 0, "name": 1}))
    return jsonify([team["name"] for team in teams]), 200

#Score logic still needs to be figured out 
@app.route("/submit_score", methods=["POST"])
def submit_score():
    data = request.json
    team_name = data.get("name")
    score = data.get("score")
    scores_collection.update_one({"name":team_name},{"$push":{"scores":score}})
    return jsonify({"message": f"Score of '{score}' added to '{team_name}' successfully!"}), 201
 

@app.route("/get_scores", methods=["GET", "OPTIONS"])
def get_scores():
    score_data = list(scores_collection.find({}, {"_id": 0, "name": 1, "scores": 1}))
    return jsonify(score_data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
