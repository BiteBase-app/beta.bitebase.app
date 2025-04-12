import { logger, schedules, events } from "@trigger.dev/sdk/v3";
import { supabase } from "@/lib/supabase";

// Define the data structure for database operations
interface DatabaseRecord {
  id: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

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
          .select('*');
        
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
      
      // Fetch records from the source table
      let query = supabase.from(sourceTable).select('*');
      
      // Apply filter if provided
      if (filter) {
        for (const [key, value] of Object.entries(filter)) {
          query = query.eq(key, value);
        }
      }
      
      const { data: sourceData, error: sourceError } = await query;
      
      if (sourceError) {
        throw new Error(`Error fetching data from ${sourceTable}: ${sourceError.message}`);
      }
      
      logger.info(`Fetched ${sourceData.length} records from ${sourceTable}`);
      
      // Process and sync the data to the target table
      const syncResults = [];
      
      for (const record of sourceData) {
        // Check if the record already exists in the target table
        const { data: existingData, error: existingError } = await supabase
          .from(targetTable)
          .select('id')
          .eq('id', record.id)
          .maybeSingle();
        
        if (existingError) {
          throw new Error(`Error checking existing record in ${targetTable}: ${existingError.message}`);
        }
        
        let result;
        
        if (existingData) {
          // Update existing record
          const { data, error } = await supabase
            .from(targetTable)
            .update({
              ...record,
              updated_at: new Date().toISOString()
            })
            .eq('id', record.id)
            .select();
          
          if (error) {
            throw new Error(`Error updating record in ${targetTable}: ${error.message}`);
          }
          
          result = { action: 'updated', id: record.id, data };
        } else {
          // Insert new record
          const { data, error } = await supabase
            .from(targetTable)
            .insert({
              ...record,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
            .select();
          
          if (error) {
            throw new Error(`Error inserting record in ${targetTable}: ${error.message}`);
          }
          
          result = { action: 'inserted', id: record.id, data };
        }
        
        syncResults.push(result);
      }
      
      // Log the results
      logger.info(`Database sync completed: ${sourceTable} -> ${targetTable}`, { 
        recordsProcessed: syncResults.length,
        inserted: syncResults.filter(r => r.action === 'inserted').length,
        updated: syncResults.filter(r => r.action === 'updated').length
      });
      
      return {
        status: 200,
        body: {
          success: true,
          recordsProcessed: syncResults.length,
          inserted: syncResults.filter(r => r.action === 'inserted').length,
          updated: syncResults.filter(r => r.action === 'updated').length,
          results: syncResults
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
      
      const results = [];
      
      // Execute each cleanup operation
      for (const op of cleanupOperations) {
        logger.info(`Cleaning up table: ${op.table}`, op);
        
        let query = supabase.from(op.table).delete();
        
        // Apply conditions
        if (op.operator === "lt") {
          query = query.lt(op.condition, op.value);
        } else if (op.operator === "gt") {
          query = query.gt(op.condition, op.value);
        } else if (op.operator === "eq") {
          query = query.eq(op.condition, op.value);
        }
        
        // Apply additional filters
        if (op.status) {
          query = query.eq("status", op.status);
        }
        
        const { data, error, count } = await query;
        
        if (error) {
          throw new Error(`Error cleaning up table ${op.table}: ${error.message}`);
        }
        
        results.push({
          table: op.table,
          recordsDeleted: count || 0,
          condition: `${op.condition} ${op.operator} ${op.value}`
        });
        
        logger.info(`Cleaned up ${count || 0} records from table: ${op.table}`);
      }
      
      return {
        success: true,
        operations: results,
        totalRecordsDeleted: results.reduce((sum, r) => sum + r.recordsDeleted, 0)
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
