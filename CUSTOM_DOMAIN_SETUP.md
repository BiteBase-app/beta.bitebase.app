# Setting Up Custom Domain for BiteBase App

This guide will help you connect your custom domain (bitebase.app) to your Cloudflare Pages deployment.

## Prerequisites

- Cloudflare account with the domain bitebase.app already added
- Successfully deployed BiteBase app to Cloudflare Pages (as you've already done)

## Steps to Set Up Custom Domain

### 1. Access Cloudflare Pages Dashboard

1. Log in to your Cloudflare account
2. Go to "Workers & Pages" in the left sidebar
3. Click on the "Pages" tab
4. Find and click on your "bitebase-app" project

### 2. Add Custom Domain

1. In your project dashboard, click on the "Custom domains" tab
2. Click on "Set up a custom domain"
3. Enter your domain: `bitebase.app`
4. Click "Continue"
5. Choose "Primary domain" to make this the main domain for your site
6. Click "Activate domain"

### 3. Configure DNS Settings

Cloudflare will automatically configure the DNS settings since your domain is already managed by Cloudflare. If you see any prompts to verify domain ownership, follow the instructions provided.

### 4. Wait for DNS Propagation

It may take a few minutes for the DNS changes to propagate. Once complete, your site will be accessible at bitebase.app.

### 5. Set Up Subdomains (Optional)

If you want to set up subdomains (e.g., app.bitebase.app, beta.bitebase.app):

1. Go back to the "Custom domains" tab
2. Click "Set up a custom domain" again
3. Enter your subdomain (e.g., `beta.bitebase.app`)
4. Follow the same steps as before

## Verifying the Setup

After setting up your custom domain, verify that:

1. Your site is accessible at your custom domain (https://bitebase.app)
2. HTTPS is working correctly (secure padlock in browser)
3. All pages and functionality work as expected

## Troubleshooting

### SSL/HTTPS Issues

If you encounter SSL certificate issues:
- Make sure Cloudflare's SSL/TLS encryption mode is set to "Full" or "Full (strict)"
- Check that the SSL certificate has been provisioned (this can take up to 24 hours)

### DNS Issues

If your domain isn't resolving to your Pages site:
- Verify the DNS records in Cloudflare are correct
- Check for any conflicting DNS records
- Make sure the domain is properly activated in Pages

### Page Rules and Redirects

You may want to set up additional page rules in Cloudflare for:
- Redirecting www to non-www (or vice versa)
- Forcing HTTPS
- Cache settings

## Next Steps

After setting up your custom domain:

1. Test your application thoroughly on the new domain
2. Update any API endpoints or configuration that might reference the old domain
3. Set up monitoring for your domain to ensure it stays online

For any issues with your custom domain setup, refer to the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/platform/custom-domains/) or contact Cloudflare support.
