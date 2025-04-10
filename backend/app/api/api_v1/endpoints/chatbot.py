from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from openai import OpenAI
from app.core.config import settings
from app.api import deps
from app.models.user import User
import logging
import json
import os
from fastapi.responses import StreamingResponse

router = APIRouter()

# Configure OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", settings.OPENAI_API_KEY))

# Models
class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    restaurant_profile_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: Optional[List[Dict[str, Any]]] = None

# Constants
SYSTEM_PROMPT = """You are BiteBase AI, an intelligent assistant for restaurant owners and managers.
You help with market research, location analysis, competitive analysis, and business strategy.
You have access to restaurant data, market trends, and location intelligence.
Be concise, professional, and helpful. If you don't know something, say so and suggest how the user might find that information.
"""

@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user: User = Depends(deps.get_current_active_user_or_mock),
):
    """
    Chat with the BiteBase AI assistant
    """
    try:
        # Prepare messages for OpenAI
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add user context if available
        if current_user:
            user_context = f"The user is {current_user.full_name} with email {current_user.email}."
            if current_user.subscription_tier:
                user_context += f" They are on the {current_user.subscription_tier} tier."
            messages.append({"role": "system", "content": user_context})

        # Add restaurant context if available
        if request.restaurant_profile_id:
            # In a real implementation, you would fetch restaurant data here
            restaurant_context = f"The user is asking about restaurant with ID {request.restaurant_profile_id}."
            messages.append({"role": "system", "content": restaurant_context})

        # Add user messages
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=messages,
            temperature=0.7,
            max_tokens=500,
        )

        # Extract response
        ai_response = response.choices[0].message.content

        return ChatResponse(
            response=ai_response,
            sources=None  # In a real implementation, you might include sources of information
        )

    except Exception as e:
        logging.error(f"Error in chatbot: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")


@router.post("/chat/stream", response_model=None)
async def chat_stream(
    request: ChatRequest,
    current_user: User = Depends(deps.get_current_active_user_or_mock),
):
    """
    Chat with the BiteBase AI assistant with streaming response
    """
    try:
        # Prepare messages for OpenAI
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]

        # Add user context if available
        if current_user:
            user_context = f"The user is {current_user.full_name} with email {current_user.email}."
            if current_user.subscription_tier:
                user_context += f" They are on the {current_user.subscription_tier} tier."
            messages.append({"role": "system", "content": user_context})

        # Add restaurant context if available
        if request.restaurant_profile_id:
            # In a real implementation, you would fetch restaurant data here
            restaurant_context = f"The user is asking about restaurant with ID {request.restaurant_profile_id}."
            messages.append({"role": "system", "content": restaurant_context})

        # Add user messages
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})

        # Call OpenAI API with streaming
        response = client.chat.completions.create(
            model="gpt-4",  # or another appropriate model
            messages=messages,
            temperature=0.7,
            max_tokens=500,
            stream=True,
        )

        # Return streaming response
        async def generate():
            for chunk in response:
                if hasattr(chunk.choices[0].delta, 'content') and chunk.choices[0].delta.content is not None:
                    content = chunk.choices[0].delta.content
                    if content:
                        yield f"data: {json.dumps({'content': content})}\n\n"
            yield f"data: {json.dumps({'content': '[DONE]'})}\n\n"

        return StreamingResponse(generate(), media_type="text/event-stream")

    except Exception as e:
        logging.error(f"Error in chatbot streaming: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing chat request: {str(e)}")
