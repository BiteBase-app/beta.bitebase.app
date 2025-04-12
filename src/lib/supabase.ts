import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to handle Supabase errors
export function handleSupabaseError(error: any): never {
  console.error('Supabase error:', error);
  throw new Error(`Supabase error: ${error.message || 'Unknown error'}`);
}

// Helper function to get a single record by ID
export async function getRecordById(table: string, id: string) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return data;
}

// Helper function to get records with pagination
export async function getRecords(table: string, options: {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  filter?: Record<string, any>;
}) {
  const {
    page = 1,
    pageSize = 10,
    orderBy = 'created_at',
    orderDirection = 'desc',
    filter = {}
  } = options;
  
  // Calculate the range for pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  
  // Start building the query
  let query = supabase
    .from(table)
    .select('*', { count: 'exact' })
    .order(orderBy, { ascending: orderDirection === 'asc' })
    .range(from, to);
  
  // Apply filters
  for (const [key, value] of Object.entries(filter)) {
    if (value !== undefined && value !== null) {
      query = query.eq(key, value);
    }
  }
  
  // Execute the query
  const { data, error, count } = await query;
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return {
    data,
    count,
    page,
    pageSize,
    totalPages: count ? Math.ceil(count / pageSize) : 0
  };
}

// Helper function to create a record
export async function createRecord(table: string, data: Record<string, any>) {
  const { data: result, error } = await supabase
    .from(table)
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select();
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return result;
}

// Helper function to update a record
export async function updateRecord(table: string, id: string, data: Record<string, any>) {
  const { data: result, error } = await supabase
    .from(table)
    .update({
      ...data,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return result;
}

// Helper function to delete a record
export async function deleteRecord(table: string, id: string) {
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq('id', id)
    .select();
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return data;
}

// Helper function to execute a raw SQL query
export async function executeRawQuery(query: string, params: any[] = []) {
  const { data, error } = await supabase.rpc('execute_sql', {
    query,
    params
  });
  
  if (error) {
    handleSupabaseError(error);
  }
  
  return data;
}
