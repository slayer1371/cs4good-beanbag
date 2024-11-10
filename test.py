import requests

url = 'http://127.0.0.1:5000/test'
json_data = {'P_OneScore': 5, 'P_TwoScore': 5}

response = requests.post(url, json=json_data)

print('Status Code:', response.status_code)
print('Response JSON:', response.json())
