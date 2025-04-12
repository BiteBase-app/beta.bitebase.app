import { logger, schedules, events, eventTrigger, wait } from "@trigger.dev/sdk/v3";
import axios from "axios";

// ===== DATA PROCESSING SERVICE =====

// Define the data structure for the processed data
interface ProcessedData {
  id: string;
  timestamp: string;
  data: any;
  status: "processed" | "failed";
  error?: string;
}

// Schedule-based data processing job
export const scheduledDataProcessing = schedules.task({
  id: "scheduled-data-processing",
  // Run every hour
  cron: "0 * * * *",
  maxDuration: 300, // 5 minutes
  run: async (payload, { ctx }) => {
    logger.info("Starting scheduled data processing job", { timestamp: payload.timestamp });

    try {
      // Fetch data from an external API
      const response = await axios.get("https://api.example.com/data");
      const rawData = response.data;

      // Process the data
      const processedData = processData(rawData);

      // Log the results
      logger.info("Data processing completed", {
        itemsProcessed: processedData.length,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        processedItems: processedData.length,
        data: processedData
      };
    } catch (error) {
      logger.error("Error in data processing job", { error });

      return {
        success: false,
        error: error.message
      };
    }
  },
});

// Event-triggered data processing job
export const onDemandDataProcessing = events.http({
  id: "on-demand-data-processing",
  maxDuration: 300, // 5 minutes
  run: async (request, { ctx }) => {
    logger.info("Starting on-demand data processing job");

    try {
      // Parse the request body
      const body = await request.json();
      const { data, options } = body;

      if (!data) {
        return {
          status: 400,
          body: {
            success: false,
            error: "No data provided"
          }
        };
      }

      // Process the data
      const processedData = processData(data, options);

      // Log the results
      logger.info("On-demand data processing completed", {
        itemsProcessed: processedData.length,
        timestamp: new Date().toISOString()
      });

      return {
        status: 200,
        body: {
          success: true,
          processedItems: processedData.length,
          data: processedData
        }
      };
    } catch (error) {
      logger.error("Error in on-demand data processing job", { error });

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

// Webhook-triggered data processing job
export const webhookDataProcessing = eventTrigger({
  id: "webhook-data-processing",
  event: "webhook.received",
  source: "app.bitebase",
  maxDuration: 300, // 5 minutes
  run: async (payload, { ctx }) => {
    logger.info("Starting webhook-triggered data processing job", { payload });

    try {
      // Extract data from the webhook payload
      const { data, source, timestamp } = payload;

      if (!data) {
        logger.warn("No data in webhook payload");
        return {
          success: false,
          error: "No data in webhook payload"
        };
      }

      // Process the data
      const processedData = processData(data);

      // Log the results
      logger.info("Webhook data processing completed", {
        source,
        itemsProcessed: processedData.length,
        timestamp: new Date().toISOString()
      });

      return {
        success: true,
        processedItems: processedData.length,
        data: processedData
      };
    } catch (error) {
      logger.error("Error in webhook data processing job", { error });

      return {
        success: false,
        error: error.message
      };
    }
  },
});

// Helper function to process data
function processData(data: any, options?: any): ProcessedData[] {
  // This is a placeholder for your actual data processing logic
  const processedItems: ProcessedData[] = [];

  // If data is an array, process each item
  if (Array.isArray(data)) {
    for (const item of data) {
      try {
        // Apply some transformation to the data
        const processed = {
          id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: new Date().toISOString(),
          data: {
            ...item,
            // Apply some transformation based on options
            processed: true,
            ...(options && { options }),
          },
          status: "processed" as const
        };

        processedItems.push(processed);
      } catch (error) {
        processedItems.push({
          id: item.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          timestamp: new Date().toISOString(),
          data: item,
          status: "failed",
          error: error.message
        });
      }
    }
  } else {
    // Process a single item
    try {
      const processed = {
        id: data.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
        data: {
          ...data,
          // Apply some transformation based on options
          processed: true,
          ...(options && { options }),
        },
        status: "processed" as const
      };

      processedItems.push(processed);
    } catch (error) {
      processedItems.push({
        id: data.id || `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString(),
        data: data,
        status: "failed",
        error: error.message
      });
    }
  }

  return processedItems;
}

// ===== DATABASE SERVICE =====

// Mock Supabase client for example purposes
const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        maybeSingle: async () => ({ data: { id: value }, error: null }),
        single: async () => ({ data: { id: value }, error: null }),
        async: () => ({ data: [{ id: value }], error: null })
      }),
      lt: (column: string, value: any) => ({
        async: () => ({ data: [{ id: 'mock-id' }], error: null })
      }),
      gt: (column: string, value: any) => ({
        async: () => ({ data: [{ id: 'mock-id' }], error: null })
      }),
      order: (column: string, options: any) => ({
        range: (from: number, to: number) => ({
          async: () => ({ data: [{ id: 'mock-id' }], count: 1, error: null })
        })
      })
    }),
    insert: (data: any) => ({
      select: async () => ({ data: [data], error: null })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: async () => ({ data: [{ ...data, id: value }], error: null })
      })
    }),
    delete: () => ({
      eq: (column: string, value: any) => ({
        select: async () => ({ data: [{ id: value }], error: null })
      })
    })
  }),
  rpc: (procedure: string, params: any) => ({
    async: () => ({ data: [{ result: 'success' }], error: null })
  })
};

// Scheduled database backup job
export const scheduledDatabaseBackup = schedules.task({
  id: "scheduled-database-backup",
  // Run daily at midnight
  cron: "0 0 * * *",
  maxDuration: 600, // 10 minutes
  run: async (payload, { ctx }) => {
    logger.info("Starting scheduled database backup job", { timestamp: payload.timestamp });

    try {
      // Get a list of tables to backup
      const tables = ["users", "restaurants", "menu_items", "orders"];
      const backupData: Record<string, any[]> = {};

      // Backup each table
      for (const table of tables) {
        logger.info(`Backing up table: ${table}`);

        // Fetch all records from the table
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('id', 'mock-id')
          .async();

        if (error) {
          throw new Error(`Error backing up table ${table}: ${error.message}`);
        }

        backupData[table] = data;
        logger.info(`Backed up ${data.length} records from table: ${table}`);
      }

      // Generate a backup filename with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFilename = `backup-${timestamp}.json`;

      // In a real implementation, you would store this backup somewhere
      // For example, in an S3 bucket or another storage service
      logger.info(`Backup completed: ${backupFilename}`, {
        tables: Object.keys(backupData),
        recordCounts: Object.entries(backupData).map(([table, data]) => ({ table, count: data.length }))
      });

      return {
        success: true,
        backupFilename,
        tables: Object.keys(backupData),
        recordCounts: Object.entries(backupData).map(([table, data]) => ({ table, count: data.length }))
      };
    } catch (error) {
      logger.error("Error in database backup job", { error });

      return {
        success: false,
        error: error.message
      };
    }
  },
});

// Database sync job
export const databaseSync = events.http({
  id: "database-sync",
  maxDuration: 300, // 5 minutes
  run: async (request, { ctx }) => {
    logger.info("Starting database sync job");

    try {
      // Parse the request body
      const body = await request.json();
      const { sourceTable, targetTable, filter } = body;

      if (!sourceTable || !targetTable) {
        return {
          status: 400,
          body: {
            success: false,
            error: "Source and target tables are required"
          }
        };
      }

      // Mock implementation for example purposes
      logger.info(`Syncing data from ${sourceTable} to ${targetTable}`);

      // Return a mock response
      return {
        status: 200,
        body: {
          success: true,
          recordsProcessed: 10,
          inserted: 5,
          updated: 5,
          results: [
            { action: 'inserted', id: 'mock-id-1' },
            { action: 'updated', id: 'mock-id-2' }
          ]
        }
      };
    } catch (error) {
      logger.error("Error in database sync job", { error });

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

// Database cleanup job
export const databaseCleanup = schedules.task({
  id: "database-cleanup",
  // Run weekly on Sunday at 1 AM
  cron: "0 1 * * 0",
  maxDuration: 300, // 5 minutes
  run: async (payload, { ctx }) => {
    logger.info("Starting database cleanup job", { timestamp: payload.timestamp });

    try {
      // Define cleanup operations
      const cleanupOperations = [
        // Delete old logs (older than 30 days)
        {
          table: "logs",
          condition: "created_at",
          value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          operator: "lt" // less than
        },
        // Delete temporary data (older than 7 days)
        {
          table: "temp_data",
          condition: "created_at",
          value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          operator: "lt" // less than
        },
        // Archive completed orders (older than 90 days)
        {
          table: "orders",
          condition: "created_at",
          value: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          operator: "lt", // less than
          status: "completed"
        }
      ];

      // Mock implementation for example purposes
      logger.info("Executing cleanup operations", { operations: cleanupOperations.length });

      // Return a mock response
      return {
        success: true,
        operations: [
          { table: "logs", recordsDeleted: 100 },
          { table: "temp_data", recordsDeleted: 50 },
          { table: "orders", recordsDeleted: 25 }
        ],
        totalRecordsDeleted: 175
      };
    } catch (error) {
      logger.error("Error in database cleanup job", { error });

      return {
        success: false,
        error: error.message
      };
    }
  },
});

// ===== NOTIFICATION SERVICE =====

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

      // Mock implementation for example purposes
      logger.info(`Processing ${notifications.length} notifications`);

      // Return a mock response
      return {
        status: 200,
        body: {
          success: true,
          total: notifications.length,
          sent: notifications.length,
          failed: 0,
          results: notifications.map((n, i) => ({
            recipient: n.recipient,
            type: n.type,
            status: "sent",
            id: `notification-${i}`
          })),
          errors: []
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

// ===== ORIGINAL EXAMPLE TASK =====

// Original example task (kept for reference)
export const firstScheduledTask = schedules.task({
  id: "first-scheduled-task",
  // Every hour
  cron: "0 * * * *",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {
    // The payload contains the last run timestamp that you can use to check if this is the first run
    // And calculate the time since the last run
    const distanceInMs =
      payload.timestamp.getTime() - (payload.lastTimestamp ?? new Date()).getTime();

    logger.log("First scheduled tasks", { payload, distanceInMs });

    // Wait for 5 seconds
    await wait.for({ seconds: 5 });

    // Format the timestamp using the timezone from the payload
    const formatted = payload.timestamp.toLocaleString("en-US", {
      timeZone: payload.timezone,
    });

    logger.log(formatted);
  },
});