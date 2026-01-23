from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bforseth:sTh4uYbQx72OaClx@beanbagcluster.lsads.mongodb.net/?retryWrites=true&w=majority&appName=BeanbagCluster"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")
# testing

import pytest
from unittest.mock import patch
from app import app


class TestGetScoresSorting:
    """Test that /get_scores endpoint sorts by team name, not by mean"""
    
    @pytest.fixture
    def client(self):
        """Create a test client for the Flask app"""
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client
    
    def test_sorted_by_team_name_not_mean(self, client):
        """Test that results are sorted alphabetically by team name, not by mean"""
        # Mock data where Team B has a higher mean than Team A
        mock_entries = [
            {"name": "Team B", "scores": ["5", "5", "5", "5"]},  # mean = 5.0
            {"name": "Team A", "scores": ["1", "2", "3", "4"]},  # mean = 2.5
        ]
        
        with patch('app.scores_collection') as mock_collection:
            mock_collection.find.return_value = mock_entries
            
            response = client.get('/get_scores')
            assert response.status_code == 200
            
            data = response.get_json()
            assert len(data) == 2
            
            # Verify teams are sorted alphabetically by name, not by mean
            # Team A should come before Team B even though Team B has a higher mean
            assert data[0]["team"] == "Team A"
            assert data[1]["team"] == "Team B"
            
            # Verify the means are correct
            assert data[0]["mean"] == 2.5
            assert data[1]["mean"] == 5.0
    
    def test_order_consistent_when_means_change(self, client):
        """Test that team order remains consistent even when means change"""
        # First call: Team A has lower mean
        mock_entries_1 = [
            {"name": "Team B", "scores": ["5", "5"]},  # mean = 5.0
            {"name": "Team A", "scores": ["1", "2"]},  # mean = 1.5
        ]
        
        # Second call: Team A now has higher mean
        mock_entries_2 = [
            {"name": "Team B", "scores": ["1", "1"]},  # mean = 1.0
            {"name": "Team A", "scores": ["5", "5"]},  # mean = 5.0
        ]
        
        with patch('app.scores_collection') as mock_collection:
            # First request
            mock_collection.find.return_value = mock_entries_1
            response1 = client.get('/get_scores')
            data1 = response1.get_json()
            
            # Second request with changed means
            mock_collection.find.return_value = mock_entries_2
            response2 = client.get('/get_scores')
            data2 = response2.get_json()
            
            # Both responses should have the same team order (alphabetical)
            assert data1[0]["team"] == "Team A"
            assert data1[1]["team"] == "Team B"
            assert data2[0]["team"] == "Team A"
            assert data2[1]["team"] == "Team B"
            
            # But the means should have changed
            assert data1[0]["mean"] == 1.5
            assert data1[1]["mean"] == 5.0
            assert data2[0]["mean"] == 5.0  # Team A now has higher mean
            assert data2[1]["mean"] == 1.0   # Team B now has lower mean
    
    def test_alphabetical_sorting_multiple_teams(self, client):
        """Test alphabetical sorting with multiple teams"""
        mock_entries = [
            {"name": "Zebra Team", "scores": ["5"]},
            {"name": "Alpha Team", "scores": ["1"]},
            {"name": "Beta Team", "scores": ["3"]},
        ]
        
        with patch('app.scores_collection') as mock_collection:
            mock_collection.find.return_value = mock_entries
            
            response = client.get('/get_scores')
            data = response.get_json()
            
            # Should return first 2 teams (sorted alphabetically)
            assert len(data) == 2
            assert data[0]["team"] == "Alpha Team"
            assert data[1]["team"] == "Beta Team"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
