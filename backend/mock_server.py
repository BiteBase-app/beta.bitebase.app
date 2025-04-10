from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

@app.route('/api/v1/cloudflare-ai/chat', methods=['POST'])
def cloudflare_ai_chat():
    try:
        # Get request data
        data = request.json
        messages = data.get('messages', [])

        # Get the last user message
        last_message = ""
        for message in reversed(messages):
            if message.get('role') == 'user':
                last_message = message.get('content', '')
                break

        # Mock response
        mock_response = {
            "success": True,
            "result": {
                "response": f"You said: '{last_message}'. This is a mock response from the server. In a real implementation, this would be a response from Cloudflare AI.",
                "usage": {
                    "completion_tokens": 43,
                    "prompt_tokens": 27,
                    "total_tokens": 70
                }
            },
            "errors": [],
            "messages": []
        }

        return jsonify(mock_response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting mock server on port 8001...")
    app.run(host='0.0.0.0', port=8001, debug=True)
