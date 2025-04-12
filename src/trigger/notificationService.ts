import { logger, events, eventTrigger } from "@trigger.dev/sdk/v3";
import axios from "axios";

// Define the notification types
type NotificationType = "email" | "sms" | "push" | "slack";

// Define the notification payload
interface NotificationPayload {
  type: NotificationType;
  recipient: string;
  subject?: string;
  message: string;
  data?: Record<string, any>;
}

// Send notification job
export const sendNotification = events.http({
  id: "send-notification",
  maxDuration: 60, // 1 minute
  run: async (request, { ctx }) => {
    logger.info("Starting send notification job");
    
    try {
      // Parse the request body
      const body = await request.json();
      const notification: NotificationPayload = body;
      
      if (!notification.type || !notification.recipient || !notification.message) {
        return {
          status: 400,
          body: {
            success: false,
            error: "Missing required notification fields"
          }
        };
      }
      
      // Send the notification based on the type
      const result = await sendNotificationByType(notification);
      
      // Log the result
      logger.info(`Notification sent: ${notification.type}`, { 
        recipient: notification.recipient,
        subject: notification.subject,
        result
      });
      
      return {
        status: 200,
        body: {
          success: true,
          notification,
          result
        }
      };
    } catch (error) {
      logger.error("Error in send notification job", { error });
      
      return {
        status: 500,
        body: {
          success: false,
          error: error.message
        }
      };
    }
  },
});

// Event-triggered notification job
export const eventTriggeredNotification = eventTrigger({
  id: "event-triggered-notification",
  event: "notification.requested",
  source: "app.bitebase",
  maxDuration: 60, // 1 minute
  run: async (payload, { ctx }) => {
    logger.info("Starting event-triggered notification job", { payload });
    
    try {
      const { notification } = payload;
      
      if (!notification || !notification.type || !notification.recipient || !notification.message) {
        logger.warn("Invalid notification payload");
        return {
          success: false,
          error: "Invalid notification payload"
        };
      }
      
      // Send the notification based on the type
      const result = await sendNotificationByType(notification);
      
      // Log the result
      logger.info(`Event-triggered notification sent: ${notification.type}`, { 
        recipient: notification.recipient,
        subject: notification.subject,
        result
      });
      
      return {
        success: true,
        notification,
        result
      };
    } catch (error) {
      logger.error("Error in event-triggered notification job", { error });
      
      return {
        success: false,
        error: error.message
      };
    }
  },
});

// Bulk notification job
export const sendBulkNotifications = events.http({
  id: "send-bulk-notifications",
  maxDuration: 300, // 5 minutes
  run: async (request, { ctx }) => {
    logger.info("Starting bulk notification job");
    
    try {
      // Parse the request body
      const body = await request.json();
      const { notifications, template } = body;
      
      if (!Array.isArray(notifications) || notifications.length === 0) {
        return {
          status: 400,
          body: {
            success: false,
            error: "No notifications provided"
          }
        };
      }
      
      const results = [];
      const errors = [];
      
      // Process each notification
      for (const notification of notifications) {
        try {
          // Apply template if provided
          const notificationToSend = template
            ? {
                ...notification,
                subject: notification.subject || template.subject,
                message: notification.message || template.message,
                data: { ...template.data, ...notification.data }
              }
            : notification;
          
          // Send the notification
          const result = await sendNotificationByType(notificationToSend);
          
          results.push({
            recipient: notification.recipient,
            type: notification.type,
            status: "sent",
            result
          });
        } catch (error) {
          errors.push({
            recipient: notification.recipient,
            type: notification.type,
            status: "failed",
            error: error.message
          });
        }
      }
      
      // Log the results
      logger.info(`Bulk notifications processed`, { 
        total: notifications.length,
        sent: results.length,
        failed: errors.length
      });
      
      return {
        status: 200,
        body: {
          success: true,
          total: notifications.length,
          sent: results.length,
          failed: errors.length,
          results,
          errors
        }
      };
    } catch (error) {
      logger.error("Error in bulk notification job", { error });
      
      return {
        status: 500,
        body: {
          success: false,
          error: error.message
        }
      };
    }
  },
});

// Helper function to send notifications by type
async function sendNotificationByType(notification: NotificationPayload): Promise<any> {
  const { type, recipient, subject, message, data } = notification;
  
  switch (type) {
    case "email":
      // In a real implementation, you would use an email service like SendGrid, Mailgun, etc.
      logger.info(`Sending email to ${recipient}`);
      // Simulate sending an email
      return {
        id: `email-${Date.now()}`,
        recipient,
        subject,
        message,
        sentAt: new Date().toISOString()
      };
      
    case "sms":
      // In a real implementation, you would use an SMS service like Twilio, Nexmo, etc.
      logger.info(`Sending SMS to ${recipient}`);
      // Simulate sending an SMS
      return {
        id: `sms-${Date.now()}`,
        recipient,
        message,
        sentAt: new Date().toISOString()
      };
      
    case "push":
      // In a real implementation, you would use a push notification service
      logger.info(`Sending push notification to ${recipient}`);
      // Simulate sending a push notification
      return {
        id: `push-${Date.now()}`,
        recipient,
        title: subject,
        body: message,
        data,
        sentAt: new Date().toISOString()
      };
      
    case "slack":
      // In a real implementation, you would use the Slack API
      logger.info(`Sending Slack message to ${recipient}`);
      // Simulate sending a Slack message
      return {
        id: `slack-${Date.now()}`,
        channel: recipient,
        text: message,
        sentAt: new Date().toISOString()
      };
      
    default:
      throw new Error(`Unsupported notification type: ${type}`);
  }
}
