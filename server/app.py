from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from flask_cors import CORS
from collections import Counter
import numpy as np
import os
app = Flask(__name__)

# CORS configuration
CORS(app, resources={r"/*": {"origins": "*"}})

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI, server_api=ServerApi('1'))

# client = MongoClient(uri, server_api=ServerApi('1'))

# Verify MongoDB connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# Brandon's db collections
# db = client["BeanbagData"]
# teams_collection = db["Team_Data"]
# scores_collection = db["Score_Data"]

# Database collections
db = client["beanbag_toss"]
teams_collection = db["teams"]
scores_collection = db["scores"]

# Register Team Route
@app.route("/register_team", methods=["POST"])
def register_team():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
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
    scores_collection.insert_one({"name": team_name, "scores": []})
    return jsonify({"message": f"Team '{team_name}' registered successfully!"}), 201

# Get Teams Route
@app.route("/get_teams", methods=["GET"])
def get_teams():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    # Retrieve all registered teams
    teams = list(teams_collection.find({}, {"_id": 0, "name": 1}))
    return jsonify([team["name"] for team in teams]), 200

# Submit Score Route
@app.route("/submit_score", methods=["POST"])
def submit_score():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    data = request.json
    team_name = data.get("name")
    score = data.get("score")
    
    # Update scores for the team
    scores_collection.update_one({"name": team_name}, {"$push": {"scores": score}})
    return jsonify({"message": f"Score of '{score}' added to '{team_name}' successfully!"}), 201

# Get Scores Route with statistics
@app.route("/get_scores", methods=["GET"])
def get_scores():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    score_entries = list(scores_collection.find({}, {"_id": 0, "name": 1, "scores": 1}))
    result = []
    
    for entry in score_entries:
        name = entry["name"]
        scores = entry["scores"]
        scores = [int(value) for value in scores if value.strip().isdigit()]
        score_counts = Counter(scores)
        print(score_counts)
        frequency_data = [score_counts.get(i, 0) for i in range(6)]
        mean_score = np.mean(scores) if scores else 0
        std_dev = np.std(scores, ddof=1) if len(scores) > 1 else 0
        
        result.append({
            "team": name,
            "freq": frequency_data,
            "mean": mean_score,
            "stdv": std_dev
        })
    
    sorted_result = sorted(result, key=lambda x: x["team"])
    return jsonify(sorted_result[:2]), 200

@app.route("/delete_team", methods=["POST"])
def delete_team():
  if request.method == "OPTIONS":
    return jsonify({"message": "CORS preflight success"}), 200
  data = request.json
  team_name = data.get("name")
  teams_collection.delete_one({"name":team_name}, {})
  scores_collection.delete_one({"name":team_name}, {})

  return jsonify("Deleted"), 200


# Main execution
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
