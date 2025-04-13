-- BiteBase Database Initialization Script
-- This script creates all necessary tables and populates them with initial data

-- Drop existing database if it exists (uncomment if needed)
-- DROP DATABASE IF EXISTS bitebase;

-- Create database (uncomment if needed)
-- CREATE DATABASE bitebase;

-- Connect to the database
-- \c bitebase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';

-- Create tables
-- ===============================

-- User table
CREATE TABLE IF NOT EXISTS "user" (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    hashed_password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    subscription_tier VARCHAR(50) DEFAULT 'free',
    is_active BOOLEAN DEFAULT TRUE,
    is_superuser BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Restaurant Profile table
CREATE TABLE IF NOT EXISTS restaurantprofile (
    id VARCHAR(255) PRIMARY KEY,
    owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
    restaurant_name VARCHAR(255) NOT NULL,
    concept_description TEXT,
    cuisine_type VARCHAR(100),
    target_audience VARCHAR(255),
    price_range VARCHAR(50),
    business_type VARCHAR(50) NOT NULL,
    is_local_brand BOOLEAN DEFAULT TRUE,
    street_address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    district VARCHAR(100),
    building_name VARCHAR(255),
    floor VARCHAR(50),
    nearest_bts VARCHAR(100),
    nearest_mrt VARCHAR(100),
    latitude FLOAT,
    longitude FLOAT,
    research_goals JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Research Project table
CREATE TABLE IF NOT EXISTS researchproject (
    id VARCHAR(255) PRIMARY KEY,
    owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
    restaurant_profile_id VARCHAR(255) NOT NULL REFERENCES restaurantprofile(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    competitive_analysis BOOLEAN DEFAULT FALSE,
    market_sizing BOOLEAN DEFAULT FALSE,
    demographic_analysis BOOLEAN DEFAULT FALSE,
    location_intelligence BOOLEAN DEFAULT FALSE,
    tourist_analysis BOOLEAN DEFAULT FALSE,
    local_competition BOOLEAN DEFAULT FALSE,
    pricing_strategy BOOLEAN DEFAULT FALSE,
    food_delivery_analysis BOOLEAN DEFAULT FALSE,
    results JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Report table
CREATE TABLE IF NOT EXISTS report (
    id VARCHAR(255) PRIMARY KEY,
    owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
    research_project_id VARCHAR(255) NOT NULL REFERENCES researchproject(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    format VARCHAR(50) NOT NULL,
    data JSONB,
    file_path VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Integration table
CREATE TABLE IF NOT EXISTS integration (
    id VARCHAR(255) PRIMARY KEY,
    owner_id VARCHAR(255) NOT NULL REFERENCES "user"(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'disconnected',
    config JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE,
    last_sync_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
-- ===============================

-- User indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON "user" (email);
CREATE INDEX IF NOT EXISTS idx_user_is_active ON "user" (is_active);

-- Restaurant Profile indexes
CREATE INDEX IF NOT EXISTS idx_restaurantprofile_owner_id ON restaurantprofile (owner_id);
CREATE INDEX IF NOT EXISTS idx_restaurantprofile_restaurant_name ON restaurantprofile (restaurant_name);
CREATE INDEX IF NOT EXISTS idx_restaurantprofile_cuisine_type ON restaurantprofile (cuisine_type);
CREATE INDEX IF NOT EXISTS idx_restaurantprofile_city ON restaurantprofile (city);
CREATE INDEX IF NOT EXISTS idx_restaurantprofile_district ON restaurantprofile (district);

-- Research Project indexes
CREATE INDEX IF NOT EXISTS idx_researchproject_owner_id ON researchproject (owner_id);
CREATE INDEX IF NOT EXISTS idx_researchproject_restaurant_profile_id ON researchproject (restaurant_profile_id);
CREATE INDEX IF NOT EXISTS idx_researchproject_status ON researchproject (status);

-- Report indexes
CREATE INDEX IF NOT EXISTS idx_report_owner_id ON report (owner_id);
CREATE INDEX IF NOT EXISTS idx_report_research_project_id ON report (research_project_id);
CREATE INDEX IF NOT EXISTS idx_report_type ON report (type);

-- Integration indexes
CREATE INDEX IF NOT EXISTS idx_integration_owner_id ON integration (owner_id);
CREATE INDEX IF NOT EXISTS idx_integration_type ON integration (type);
CREATE INDEX IF NOT EXISTS idx_integration_status ON integration (status);

-- Insert initial data
-- ===============================

-- Insert admin user
-- Password: admin (bcrypt hashed)
INSERT INTO "user" (id, email, full_name, hashed_password, is_superuser, subscription_tier, created_at)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@example.com',
    'Admin User',
    '$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
    TRUE,
    'enterprise',
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert test user
-- Password: testpassword (bcrypt hashed)
INSERT INTO "user" (id, email, full_name, hashed_password, is_superuser, subscription_tier, created_at)
VALUES (
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'test@example.com',
    'Test User',
    '$2b$12$K3JNi5xUop6WZcH8Dv.1FeRZDRYs0RKoNKzXWI1KGqQnGINjCJlcu',
    FALSE,
    'free',
    CURRENT_TIMESTAMP
)
ON CONFLICT (email) DO NOTHING;

-- Insert restaurant profiles
INSERT INTO restaurantprofile (
    id, owner_id, restaurant_name, concept_description, cuisine_type, 
    target_audience, price_range, business_type, is_local_brand,
    street_address, city, state, zip_code, district, 
    latitude, longitude, research_goals, created_at
)
VALUES (
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Thai Delight',
    'Authentic Thai cuisine in a modern setting',
    'Thai',
    'Young professionals',
    '$$',
    'existing',
    TRUE,
    '123 Main St',
    'Bangkok',
    '',
    '10110',
    'Sukhumvit',
    13.7563,
    100.5018,
    '["market_analysis", "competitor_analysis"]',
    CURRENT_TIMESTAMP - INTERVAL '120 days'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO restaurantprofile (
    id, owner_id, restaurant_name, concept_description, cuisine_type, 
    target_audience, price_range, business_type, is_local_brand,
    street_address, city, state, zip_code, district, 
    latitude, longitude, research_goals, created_at
)
VALUES (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Sushi Express',
    'Fast and fresh Japanese cuisine',
    'Japanese',
    'Business professionals',
    '$$$',
    'new',
    FALSE,
    '456 Market St',
    'Bangkok',
    '',
    '10330',
    'Pathum Wan',
    13.7469,
    100.5349,
    '["location_intelligence", "demographic_analysis"]',
    CURRENT_TIMESTAMP - INTERVAL '45 days'
)
ON CONFLICT (id) DO NOTHING;

-- Insert research projects
INSERT INTO researchproject (
    id, owner_id, restaurant_profile_id, name, description,
    status, progress, competitive_analysis, market_sizing,
    demographic_analysis, location_intelligence, completed_at, created_at
)
VALUES (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Market Analysis for Thai Delight',
    'Comprehensive market analysis for Thai restaurant expansion',
    'completed',
    100,
    TRUE,
    TRUE,
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '10 days',
    CURRENT_TIMESTAMP - INTERVAL '90 days'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO researchproject (
    id, owner_id, restaurant_profile_id, name, description,
    status, progress, competitive_analysis, demographic_analysis, location_intelligence, created_at
)
VALUES (
    'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'Location Analysis for Sushi Express',
    'Finding the best location for a new Sushi restaurant',
    'in_progress',
    65,
    TRUE,
    TRUE,
    TRUE,
    CURRENT_TIMESTAMP - INTERVAL '30 days'
)
ON CONFLICT (id) DO NOTHING;

-- Insert reports
INSERT INTO report (
    id, owner_id, research_project_id, name, type, format, data, created_at
)
VALUES (
    'g0eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
    'Thai Delight Market Analysis Report',
    'market_analysis',
    'json',
    '{
        "summary": "The market analysis shows strong potential for expansion in the Sukhumvit area.",
        "market_size": "$5.2M annually",
        "growth_rate": "8.5% year over year",
        "key_competitors": ["Thai Spice", "Bangkok Kitchen", "Royal Thai"],
        "recommendations": [
            "Focus on lunch specials for office workers",
            "Expand delivery options",
            "Consider a second location in Silom district"
        ]
    }',
    CURRENT_TIMESTAMP - INTERVAL '85 days'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO report (
    id, owner_id, research_project_id, name, type, format, data, created_at
)
VALUES (
    'h0eebc99-9c0b-4ef8-bb6d-6bb9bd380a88',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
    'Sushi Express Location Analysis',
    'location_intelligence',
    'json',
    '{
        "status": "in_progress",
        "locations_analyzed": [
            {"name": "Siam Square", "score": 8.5},
            {"name": "Thonglor", "score": 7.9},
            {"name": "Asok", "score": 9.2}
        ],
        "preliminary_recommendation": "Asok area shows the highest potential due to high foot traffic and proximity to office buildings."
    }',
    CURRENT_TIMESTAMP - INTERVAL '25 days'
)
ON CONFLICT (id) DO NOTHING;

-- Insert integrations
INSERT INTO integration (
    id, owner_id, name, type, status, config, created_at
)
VALUES (
    'i0eebc99-9c0b-4ef8-bb6d-6bb9bd380a99',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Google Places API',
    'location_data',
    'connected',
    '{"api_key": "sample_key_123", "enabled": true}',
    CURRENT_TIMESTAMP - INTERVAL '60 days'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO integration (
    id, owner_id, name, type, status, config, created_at
)
VALUES (
    'j0eebc99-9c0b-4ef8-bb6d-6bb9bd380aaa',
    'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'Yelp API',
    'review_data',
    'disconnected',
    '{"api_key": "", "enabled": false}',
    CURRENT_TIMESTAMP - INTERVAL '45 days'
)
ON CONFLICT (id) DO NOTHING;

-- Create views
-- ===============================

-- Active restaurant profiles view
CREATE OR REPLACE VIEW active_restaurant_profiles AS
SELECT 
    rp.*,
    u.email as owner_email,
    u.full_name as owner_name
FROM 
    restaurantprofile rp
JOIN 
    "user" u ON rp.owner_id = u.id
WHERE 
    u.is_active = TRUE;

-- Research project summary view
CREATE OR REPLACE VIEW research_project_summary AS
SELECT 
    rp.id,
    rp.name,
    rp.status,
    rp.progress,
    rp.created_at,
    rp.completed_at,
    u.email as owner_email,
    u.full_name as owner_name,
    rest.restaurant_name,
    rest.cuisine_type,
    (SELECT COUNT(*) FROM report r WHERE r.research_project_id = rp.id) as report_count
FROM 
    researchproject rp
JOIN 
    "user" u ON rp.owner_id = u.id
JOIN 
    restaurantprofile rest ON rp.restaurant_profile_id = rest.id;

-- Create functions
-- ===============================

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
-- ===============================

-- User update timestamp trigger
CREATE TRIGGER update_user_timestamp
BEFORE UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Restaurant profile update timestamp trigger
CREATE TRIGGER update_restaurantprofile_timestamp
BEFORE UPDATE ON restaurantprofile
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Research project update timestamp trigger
CREATE TRIGGER update_researchproject_timestamp
BEFORE UPDATE ON researchproject
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Report update timestamp trigger
CREATE TRIGGER update_report_timestamp
BEFORE UPDATE ON report
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Integration update timestamp trigger
CREATE TRIGGER update_integration_timestamp
BEFORE UPDATE ON integration
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Grant permissions (adjust as needed)
-- ===============================

-- GRANT ALL PRIVILEGES ON DATABASE bitebase TO postgres;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
-- GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO postgres;

-- Final message
DO $$
BEGIN
    RAISE NOTICE 'BiteBase database initialization completed successfully!';
END $$;
