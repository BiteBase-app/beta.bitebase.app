import requests
import json

# Cloudflare API details
CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab'
CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5'
DEFAULT_MODEL = '@cf/meta/llama-2-7b-chat-int8'

def test_cloudflare_ai():
    try:
        # Call Cloudflare AI API
        cloudflare_url = f'https://gateway.ai.cloudflare.com/v1/{CLOUDFLARE_ACCOUNT_ID}/bitebase-ai-agents/ai/run/{DEFAULT_MODEL}'
        print(f"Cloudflare URL: {cloudflare_url}")

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {CLOUDFLARE_API_TOKEN}'
        }
        print(f"Headers: {headers}")

        payload = {
            'messages': [
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': 'Hello, how are you?'}
            ]
        }
        print(f"Sending payload: {payload}")

        print("Making request...")
        response = requests.post(cloudflare_url, json=payload, headers=headers)
        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        print(f"Response content: {response.text}")

        if response.status_code == 200:
            response_data = response.json()
            print(f"Parsed response data: {json.dumps(response_data, indent=2)}")

    except Exception as e:
        import traceback
        print(f"Error in test_cloudflare_ai: {str(e)}")
        traceback.print_exc()

if __name__ == '__main__':
    test_cloudflare_ai()
