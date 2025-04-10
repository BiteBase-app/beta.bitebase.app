import logging
from typing import Any, Dict, List, Optional
from pathlib import Path

from fastapi import BackgroundTasks
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr

from app.core.config import settings


# Configure FastMail
# In a real implementation, these would come from settings
mail_config = ConnectionConfig(
    MAIL_USERNAME="your-email@example.com",
    MAIL_PASSWORD="your-password",
    MAIL_FROM="your-email@example.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.example.com",
    MAIL_TLS=True,
    MAIL_SSL=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=Path(__file__).parent / "email-templates",
)


async def send_email(
    email_to: List[EmailStr],
    subject: str,
    body: str,
    template_name: Optional[str] = None,
    template_data: Optional[Dict[str, Any]] = None,
) -> None:
    """
    Send an email.
    
    Args:
        email_to: List of recipient email addresses
        subject: Email subject
        body: Email body (used if template_name is None)
        template_name: Name of the email template to use
        template_data: Data to pass to the template
    """
    message = MessageSchema(
        subject=subject,
        recipients=email_to,
        body=body,
        subtype="html"
    )
    
    try:
        fm = FastMail(mail_config)
        if template_name and template_data:
            await fm.send_message(message, template_name=template_name, template_data=template_data)
        else:
            await fm.send_message(message)
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")


def send_email_background(
    background_tasks: BackgroundTasks,
    email_to: List[EmailStr],
    subject: str,
    body: str,
    template_name: Optional[str] = None,
    template_data: Optional[Dict[str, Any]] = None,
) -> None:
    """
    Send an email in the background.
    
    Args:
        background_tasks: FastAPI BackgroundTasks
        email_to: List of recipient email addresses
        subject: Email subject
        body: Email body (used if template_name is None)
        template_name: Name of the email template to use
        template_data: Data to pass to the template
    """
    background_tasks.add_task(
        send_email,
        email_to=email_to,
        subject=subject,
        body=body,
        template_name=template_name,
        template_data=template_data,
    )
