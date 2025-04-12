# Deploying Backend Services with Trigger.dev

This guide provides step-by-step instructions for deploying backend services using Trigger.dev.

## Overview

Trigger.dev is a platform for building and deploying serverless functions and background jobs. It provides a simple way to run code on a schedule, in response to events, or via API endpoints.

In this project, we've implemented several backend services using Trigger.dev:

1. **Data Processing Service** - Processes data on a schedule or on-demand
2. **Database Service** - Handles database operations like backups, syncing, and cleanup
3. **Notification Service** - Sends notifications via email, SMS, push, or Slack

## Prerequisites

- Node.js 16 or later
- npm or yarn
- A Trigger.dev account
- The Trigger.dev CLI

## Installation

1. Install the Trigger.dev CLI:

```bash
npm install -g @trigger.dev/cli
```

2. Log in to your Trigger.dev account:

```bash
trigger login
```

## Configuration

The Trigger.dev configuration is in the `trigger.config.ts` file at the root of the project:

```typescript
import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: "proj_qfzxgfjogaissrhmhybi",
  runtime: "node",
  logLevel: "log",
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["src/trigger"],
});
```

## Backend Services

### Data Processing Service

The Data Processing Service (`src/trigger/dataProcessingService.ts`) provides three main functions:

1. **Scheduled Data Processing** - Runs on a schedule to process data
2. **On-Demand Data Processing** - Processes data on-demand via an HTTP endpoint
3. **Webhook Data Processing** - Processes data in response to webhook events

### Database Service

The Database Service (`src/trigger/databaseService.ts`) provides three main functions:

1. **Scheduled Database Backup** - Runs on a schedule to backup database tables
2. **Database Sync** - Syncs data between database tables
3. **Database Cleanup** - Runs on a schedule to clean up old data

### Notification Service

The Notification Service (`src/trigger/notificationService.ts`) provides three main functions:

1. **Send Notification** - Sends a notification via an HTTP endpoint
2. **Event-Triggered Notification** - Sends a notification in response to an event
3. **Send Bulk Notifications** - Sends multiple notifications at once

## Deployment

### Local Development

To run the Trigger.dev services locally:

1. Start the Trigger.dev CLI:

```bash
trigger dev
```

2. This will start a local development server that will run your jobs.

### Production Deployment

To deploy the Trigger.dev services to production:

1. Deploy the services:

```bash
trigger deploy
```

2. This will deploy all the jobs defined in the `src/trigger` directory to Trigger.dev.

## Usage

### Data Processing Service

#### Scheduled Data Processing

This job runs automatically on the defined schedule (every hour).

#### On-Demand Data Processing

To trigger the on-demand data processing job, send a POST request to the endpoint:

```bash
curl -X POST https://api.trigger.dev/api/v1/run/[PROJECT_ID]/on-demand-data-processing \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [API_KEY]" \
  -d '{"data": [{"id": "1", "value": "test"}], "options": {"transform": true}}'
```

#### Webhook Data Processing

To trigger the webhook data processing job, configure a webhook in your application to send data to the Trigger.dev webhook endpoint.

### Database Service

#### Scheduled Database Backup

This job runs automatically on the defined schedule (daily at midnight).

#### Database Sync

To trigger the database sync job, send a POST request to the endpoint:

```bash
curl -X POST https://api.trigger.dev/api/v1/run/[PROJECT_ID]/database-sync \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [API_KEY]" \
  -d '{"sourceTable": "users", "targetTable": "users_backup", "filter": {"status": "active"}}'
```

#### Database Cleanup

This job runs automatically on the defined schedule (weekly on Sunday at 1 AM).

### Notification Service

#### Send Notification

To send a notification, send a POST request to the endpoint:

```bash
curl -X POST https://api.trigger.dev/api/v1/run/[PROJECT_ID]/send-notification \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [API_KEY]" \
  -d '{"type": "email", "recipient": "user@example.com", "subject": "Test Notification", "message": "This is a test notification"}'
```

#### Event-Triggered Notification

To trigger an event-triggered notification, emit an event with the `notification.requested` event type.

#### Send Bulk Notifications

To send bulk notifications, send a POST request to the endpoint:

```bash
curl -X POST https://api.trigger.dev/api/v1/run/[PROJECT_ID]/send-bulk-notifications \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer [API_KEY]" \
  -d '{"notifications": [{"type": "email", "recipient": "user1@example.com", "subject": "Test Notification", "message": "This is a test notification"}, {"type": "email", "recipient": "user2@example.com", "subject": "Test Notification", "message": "This is a test notification"}], "template": {"subject": "Default Subject", "message": "Default Message", "data": {"appName": "BiteBase"}}}'
```

## Monitoring

You can monitor your Trigger.dev jobs in the Trigger.dev dashboard:

1. Go to [https://app.trigger.dev](https://app.trigger.dev)
2. Navigate to your project
3. View the jobs, runs, and logs

## Troubleshooting

### Common Issues

1. **Job not running on schedule**
   - Check the job's schedule configuration
   - Check the Trigger.dev dashboard for any errors

2. **Job failing with an error**
   - Check the job's logs in the Trigger.dev dashboard
   - Check your code for any bugs or issues

3. **API endpoint not working**
   - Check the API endpoint URL
   - Check the API key
   - Check the request payload

### Getting Help

If you need help with Trigger.dev, you can:

1. Check the [Trigger.dev documentation](https://docs.trigger.dev)
2. Join the [Trigger.dev Discord community](https://discord.gg/trigger-dev)
3. Contact [Trigger.dev support](https://trigger.dev/support)

## Conclusion

Trigger.dev provides a powerful platform for building and deploying backend services. With the services implemented in this project, you can process data, manage databases, and send notifications with ease.

For more information, see the [Trigger.dev documentation](https://docs.trigger.dev).
