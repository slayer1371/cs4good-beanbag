from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from pymongo import MongoClient
from flask_cors import CORS
import certifi
import statistics

# Socket.io setup for future real-time score tracking (if needed)
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# MongoDB connection URL
url = "mongodb+srv://xbriggs:5fnz7AesTp1DYyFx@teamscoredb.gkrjr.mongodb.net/TeamScoreDB?retryWrites=true&w=majority&appName=TeamScoreDB&authSource=admin"
client = MongoClient(url, tlsCAFile=certifi.where())
db = client["beanbag_toss"]
teams_collection = db["teams"]
scores_collection = db["scores"]

# Team Logic
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
    # Insert the team into the scores collection as well (creating an empty score array)
    scores_collection.insert_one({"name": team_name, "scores":[]})
    return jsonify({"message": f"Team '{team_name}' registered successfully!"}), 201

@app.route("/get_teams", methods=["GET"])
def get_teams():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    """Retrieve all registered teams."""
    teams = teams_collection.find({}, {"_id": 0, "name": 1})
    return jsonify([team["name"] for team in teams])

# Score logic
@app.route("/submit_score", methods=["POST"])
def submit_score():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight success"}), 200
    
    data = request.json
    team_name = data.get("name")
    score = data.get("score")
    
    # Validate the input
    if not team_name or score is None:
        return jsonify({"error": "Missing team name or score"}), 400

    try:
        # Check if the team exists in the database
        team = scores_collection.find_one({"name": team_name})
        
        if not team:
            return jsonify({"error": f"Team '{team_name}' does not exist"}), 404
        
        # Update the scores in the scores collection

        #If team exists but has not pushed a score yet, add it to scores 

        scores_collection.update_one(
                {"name": team_name}, 
                {"$push": {"scores": score}}
            )
        
        return jsonify({"message": f"Score of '{score}' added to '{team_name}' successfully!"}), 201
    except Exception as e:
        # Catch any MongoDB errors and return a 500 error
        return jsonify({"error": f"Error saving score: {str(e)}"}), 500


@app.route("/get_scores", methods=["GET"])
def get_scores():
    # Get the team name from the query parameters
    team_name = request.args.get("name")
    
    if team_name:
        # Find the specific team by name
        team_data = scores_collection.find_one({"name": team_name}, {"_id": 0, "name": 1, "scores": 1})
        
        if team_data:
            # Return the found team data
            
            #Working on inital stat calculation just testing
            team_score = list(map(int, team_data["scores"]))
            avg = statistics.mean(team_score)
            print(avg)
            return jsonify(team_data)
        else:
            return jsonify({"error": f"Team '{team_name}' not found"}), 404
    
    #Need to Fix this later, not workng
    else:
        # Return all teams if no name is provided
        score_data = scores_collection.find({}, {"_id": 0, "name": 1, "scores": 1})
        return jsonify(list(score_data))



if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=3000, debug=True)
