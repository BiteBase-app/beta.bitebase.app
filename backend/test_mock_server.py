import requests
import json

def test_mock_server():
    try:
        # Call the mock server
        url = 'http://localhost:8001/api/v1/cloudflare-ai/chat'
        print(f"URL: {url}")

        headers = {
            'Content-Type': 'application/json'
        }

        payload = {
            'messages': [
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': 'Hello, how are you?'}
            ]
        }
        print(f"Sending payload: {payload}")

        print("Making request...")
        response = requests.post(url, json=payload, headers=headers)
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        print(f"Response content: {response.text}")
        
        if response.status_code == 200:
            response_data = response.json()
            print(f"Parsed response data: {json.dumps(response_data, indent=2)}")
        
    except Exception as e:
        import traceback
        print(f"Error in test_mock_server: {str(e)}")
        traceback.print_exc()

if __name__ == '__main__':
    test_mock_server()
