# Deployment Guide for BiteBase Intelligence

This guide provides instructions for deploying the BiteBase Intelligence application to a production environment.

## Prerequisites

- A server with Docker and Docker Compose installed
- Domain name (optional, but recommended)
- SSL certificate (optional, but recommended for production)

## Deployment Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bitebase-intelligence.git
cd bitebase-intelligence
```

### 2. Configure Environment Variables

Create a `.env.deploy` file based on the example:

```bash
cp .env.deploy.example .env.deploy
```

Edit the `.env.deploy` file and set the appropriate values for your production environment:

```
# Security
SECRET_KEY=your-production-secret-key

# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-production-db-password
POSTGRES_DB=bitebase

# External APIs
GOOGLE_PLACES_API_KEY=your-google-places-api-key
YELP_API_KEY=your-yelp-api-key
CENSUS_API_KEY=your-census-api-key

# Superuser
FIRST_SUPERUSER_EMAIL=admin@example.com
FIRST_SUPERUSER_PASSWORD=your-production-admin-password

# Sentry
SENTRY_DSN=your-sentry-dsn
```

### 3. Configure Nginx (Optional)

If you're using a custom domain, update the Nginx configuration:

```bash
# Edit the Nginx configuration
nano nginx/nginx.conf
```

Update the `server_name` directive with your domain:

```
server_name yourdomain.com www.yourdomain.com;
```

### 4. SSL Configuration (Optional but Recommended)

For production environments, it's recommended to use HTTPS. You can use Let's Encrypt to obtain free SSL certificates:

```bash
# Create directories for SSL certificates
mkdir -p nginx/ssl

# Generate SSL certificates using certbot
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy the certificates to the nginx/ssl directory
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/
```

Update the Nginx configuration to use SSL:

```bash
# Edit the Nginx configuration
nano nginx/nginx.conf
```

Add SSL configuration:

```
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Rest of your configuration...
}
```

### 5. Run the Deployment Script

Make the deployment script executable:

```bash
chmod +x deploy.sh
```

Run the deployment script:

```bash
./deploy.sh
```

The script will:
1. Build the Docker images
2. Start the containers
3. Run database migrations
4. Initialize the database with initial data

### 6. Verify the Deployment

Once the deployment is complete, you can verify that the application is running:

```bash
# Check the status of the containers
docker-compose -f docker-compose.prod.yml ps

# Check the logs
docker-compose -f docker-compose.prod.yml logs
```

Visit your domain or server IP in a web browser to access the application.

## Troubleshooting

### Database Connection Issues

If the backend can't connect to the database:

```bash
# Check the database logs
docker-compose -f docker-compose.prod.yml logs db

# Connect to the database container
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d bitebase
```

### Backend API Issues

If the backend API is not responding:

```bash
# Check the backend logs
docker-compose -f docker-compose.prod.yml logs backend

# Restart the backend container
docker-compose -f docker-compose.prod.yml restart backend
```

### Frontend Issues

If the frontend is not loading:

```bash
# Check the frontend logs
docker-compose -f docker-compose.prod.yml logs frontend

# Restart the frontend container
docker-compose -f docker-compose.prod.yml restart frontend
```

## Maintenance

### Updating the Application

To update the application:

```bash
# Pull the latest changes
git pull

# Rebuild and restart the containers
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose -f docker-compose.prod.yml exec backend alembic upgrade head
```

### Backing Up the Database

To back up the database:

```bash
# Create a backup directory
mkdir -p backups

# Backup the database
docker-compose -f docker-compose.prod.yml exec db pg_dump -U postgres -d bitebase > backups/bitebase_$(date +%Y%m%d%H%M%S).sql
```

### Restoring the Database

To restore the database from a backup:

```bash
# Restore the database
cat backups/bitebase_backup.sql | docker-compose -f docker-compose.prod.yml exec -T db psql -U postgres -d bitebase
```

## Security Considerations

- Always use HTTPS in production
- Regularly update dependencies and Docker images
- Use strong passwords for the database and admin user
- Restrict access to the server using a firewall
- Set up monitoring and alerting
- Regularly back up the database
