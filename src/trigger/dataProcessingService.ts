import { logger, schedules, events, eventTrigger } from "@trigger.dev/sdk/v3";
import axios from "axios";

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
