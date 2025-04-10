from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)

# Configure OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY", "your-openai-api-key")

# System prompt for the chatbot
SYSTEM_PROMPT = """You are BiteBase AI, an intelligent assistant for restaurant owners and managers.
You help with market research, location analysis, competitive analysis, and business strategy.
You have access to restaurant data, market trends, and location intelligence.
Be concise, professional, and helpful. If you don't know something, say so and suggest how the user might find that information.
"""

@app.route('/api/v1/chatbot/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        messages = data.get('messages', [])
        restaurant_profile_id = data.get('restaurant_profile_id')

        # Prepare messages for OpenAI
        openai_messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add restaurant context if available
        if restaurant_profile_id:
            restaurant_context = f"The user is asking about restaurant with ID {restaurant_profile_id}."
            openai_messages.append({"role": "system", "content": restaurant_context})

        # Add user messages
        for msg in messages:
            openai_messages.append({"role": msg['role'], "content": msg['content']})

        # Mock response instead of calling OpenAI API
        user_message = messages[-1]['content'] if messages else ""

        # Generate a mock response based on the user's message
        if "hello" in user_message.lower() or "hi" in user_message.lower():
            ai_response = "Hello! I'm BiteBase AI, your restaurant intelligence assistant. How can I help you today?"
        elif "market" in user_message.lower() or "trend" in user_message.lower():
            ai_response = "Based on recent market trends, plant-based options and sustainable practices are gaining popularity. Would you like more specific information about market trends in your area?"
        elif "competitor" in user_message.lower() or "competition" in user_message.lower():
            ai_response = "Competitor analysis is crucial for restaurant success. I can help you identify key competitors, analyze their strengths and weaknesses, and develop strategies to differentiate your restaurant."
        elif "location" in user_message.lower():
            ai_response = "Location is one of the most important factors for restaurant success. I can help you analyze foot traffic, demographics, and other location-based metrics to optimize your restaurant's performance."
        else:
            ai_response = "I understand you're asking about \"" + user_message + "\". As your restaurant intelligence assistant, I can help with market research, location analysis, competitive analysis, and business strategy. Could you provide more details about what you're looking for?"

        return jsonify({
            "response": ai_response,
            "sources": None
        })

    except Exception as e:
        print(f"Error in chatbot: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/v1/restaurant-profiles/', methods=['GET'])
def get_restaurant_profiles():
    # Mock restaurant profiles
    profiles = [
        {
            "id": "mock-restaurant-1",
            "restaurant_name": "Thai Delight",
            "concept_description": "Authentic Thai cuisine in a modern setting",
            "cuisine_type": "Thai",
            "business_type": "existing",
            "owner_id": "mock-user-id",
            "created_at": "2023-01-01T00:00:00",
            "is_local_brand": True,
            "target_audience": "Young professionals",
            "price_range": "$$",
            "street_address": "123 Main St",
            "city": "Bangkok",
            "state": "",
            "zip_code": "10110",
            "district": "Sukhumvit"
        },
        {
            "id": "mock-restaurant-2",
            "restaurant_name": "Sushi Express",
            "concept_description": "Fast and fresh Japanese cuisine",
            "cuisine_type": "Japanese",
            "business_type": "new",
            "owner_id": "mock-user-id",
            "created_at": "2023-02-01T00:00:00",
            "is_local_brand": False,
            "target_audience": "Business professionals",
            "price_range": "$$$",
            "street_address": "456 Market St",
            "city": "Tokyo",
            "state": "",
            "zip_code": "100-0001",
            "district": "Chiyoda"
        }
    ]
    return jsonify(profiles)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8001, debug=True)
