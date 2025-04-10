from flask import Flask, request, jsonify
import requests
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Cloudflare API details
CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab'
CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5'
DEFAULT_MODEL = 'meta/llama-3.1-8b-instruct'

@app.route('/', methods=['GET'])
def test_endpoint():
    try:
        # Call Cloudflare AI API
        cloudflare_url = f'https://gateway.ai.cloudflare.com/v1/{CLOUDFLARE_ACCOUNT_ID}/bitebase-ai-agents/ai/run/{DEFAULT_MODEL}'
        logger.debug(f"Cloudflare URL: {cloudflare_url}")

        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {CLOUDFLARE_API_TOKEN}'
        }

        payload = {
            'messages': [
                {'role': 'system', 'content': 'You are a helpful assistant.'},
                {'role': 'user', 'content': 'Hello, how are you?'}
            ]
        }
        logger.debug(f"Sending payload: {payload}")

        logger.debug("Making request...")
        response = requests.post(cloudflare_url, json=payload, headers=headers)
        logger.debug(f"Response status code: {response.status_code}")
        logger.debug(f"Response headers: {response.headers}")
        logger.debug(f"Response content: {response.text}")

        if response.status_code == 200:
            response_data = response.json()
            logger.debug(f"Parsed response data: {response_data}")
            return jsonify(response_data)
        else:
            return jsonify({'error': f'Cloudflare API returned status code {response.status_code}: {response.text}'}), 500

    except Exception as e:
        logger.error(f"Error in test_endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
