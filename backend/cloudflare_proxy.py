from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Cloudflare API details
CLOUDFLARE_ACCOUNT_ID = 'dc95c232d76cc4df23a5ca452a4046ab'
CLOUDFLARE_API_TOKEN = 'dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5'
DEFAULT_MODEL = '@cf/meta/llama-2-7b-chat-int8'

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/api/v1/cloudflare-ai/chat', methods=['POST'])
def cloudflare_ai_chat():
    try:
        # Get request data
        data = request.json
        logger.debug(f"Received request data: {data}")
        messages = data.get('messages', [])
        logger.debug(f"Extracted messages: {messages}")

        # Mock response for testing
        mock_response = {
            "success": True,
            "result": {
                "response": "Hello! I'm doing well, thank you for asking. How can I assist you today?"
            }
        }

        logger.debug(f"Returning mock response: {mock_response}")
        return jsonify(mock_response)

    except Exception as e:
        logger.error(f"Error in cloudflare_ai_chat: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001)
