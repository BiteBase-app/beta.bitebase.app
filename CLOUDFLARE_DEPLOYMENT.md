# Deploying BiteBase to Cloudflare

This guide provides step-by-step instructions for deploying the BiteBase application to Cloudflare.

## Prerequisites

- A Cloudflare account
- Domain name (bitebase.app) added to your Cloudflare account
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)
- Docker and Docker Compose (for backend deployment)

## Deployment Steps

### 1. Configure Environment Variables

Create a `.env.deploy` file based on the example:

```bash
cp .env.deploy.example .env.deploy
```

Edit the `.env.deploy` file and set the appropriate values for your production environment.

### 2. Deploy the Cloudflare Worker

The Cloudflare Worker handles the chatbot functionality and API requests.

```bash
# Login to Cloudflare
wrangler login

# Deploy the worker
cd cloudflare
wrangler deploy

# Set up secrets
wrangler secret put AI_GATEWAY_TOKEN
```

When prompted, enter your Cloudflare AI Gateway Token.

### 3. Configure Cloudflare DNS

1. Log in to your Cloudflare dashboard
2. Select your domain (bitebase.app)
3. Go to the DNS tab
4. Add the following DNS records:

   - Type: CNAME
   - Name: api
   - Target: bitebase-chatbot.your-subdomain.workers.dev
   - Proxy status: Proxied

### 4. Deploy the Frontend to Cloudflare Pages

1. Go to the Cloudflare Dashboard
2. Navigate to Workers & Pages
3. Click "Create application"
4. Select "Pages" and follow the instructions to connect your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
6. Add environment variables if needed:
   - `VITE_APP_ENV`: `production`
7. Deploy!

### 5. Deploy the Backend (Optional)

If you need to deploy the backend services (database, API, etc.), follow these steps:

```bash
# Make the deployment script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
1. Build the Docker images
2. Start the containers
3. Run database migrations
4. Initialize the database with initial data

### 6. SSL Configuration

For production environments, it's recommended to use HTTPS. Cloudflare provides SSL certificates automatically when you use their proxy.

1. Go to the Cloudflare Dashboard
2. Select your domain (bitebase.app)
3. Go to the SSL/TLS tab
4. Set the SSL/TLS encryption mode to "Full" or "Full (strict)"

### 7. Verify the Deployment

Once the deployment is complete, verify that the application is running:

1. Visit your domain in a web browser: https://bitebase.app
2. Test the API endpoints: https://api.bitebase.app/api/v1/chatbot/chat
3. Check the Cloudflare Worker logs in the Cloudflare Dashboard

## Troubleshooting

### Cloudflare Worker Issues

If the Cloudflare Worker is not responding:

1. Check the Worker logs in the Cloudflare Dashboard
2. Verify that the AI_GATEWAY_TOKEN secret is set correctly
3. Make sure the routes in wrangler.toml are configured correctly

### Frontend Issues

If the frontend is not loading:

1. Check the Cloudflare Pages build logs
2. Verify that the environment variables are set correctly
3. Make sure the API endpoints in src/config.ts are pointing to the correct URLs

### Backend Issues

If the backend is not responding:

1. Check the Docker container logs
2. Verify that the environment variables are set correctly
3. Make sure the database migrations have run successfully

## Updating the Deployment

To update the application:

### Update the Cloudflare Worker

```bash
cd cloudflare
wrangler deploy
```

### Update the Frontend on Cloudflare Pages

Simply push your changes to the connected repository, and Cloudflare Pages will automatically rebuild and deploy the frontend.

### Update the Backend

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

## Security Considerations

- Always use HTTPS in production
- Regularly update dependencies and Docker images
- Use strong passwords for the database and admin user
- Restrict access to the server using a firewall
- Set up monitoring and alerting
- Regularly back up the database

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
