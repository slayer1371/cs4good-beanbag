from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bforseth:sTh4uYbQx72OaClx@beanbagcluster.lsads.mongodb.net/?retryWrites=true&w=majority&appName=BeanbagCluster"

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    client.admin.command('ping')
    print("Connected to MongoDB!")
except Exception as e:
    print(f"Connection failed: {e}")
