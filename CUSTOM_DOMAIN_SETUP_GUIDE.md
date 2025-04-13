# Setting Up Custom Domain for BiteBase App

This guide will help you set up the custom domain (beta.bitebase.app) for your Cloudflare Pages deployment.

## Prerequisites

- Cloudflare account with the domain bitebase.app already added
- Successfully deployed BiteBase app to Cloudflare Pages

## Steps to Set Up Custom Domain

### 1. Access Cloudflare Pages Dashboard

1. Log in to your Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to "Workers & Pages" in the left sidebar
3. Click on the "Pages" tab
4. Find and click on your "bitebase-app" project

### 2. Add Custom Domain

1. Click on the "Custom domains" tab
2. Click on "Set up a custom domain"
3. Enter the domain: `beta.bitebase.app`
4. Click "Continue"
5. Select "bitebase.app" from the dropdown (this should be your primary domain in Cloudflare)
6. Click "Activate domain"

### 3. Verify Domain Setup

1. Wait for the DNS changes to propagate (this may take a few minutes)
2. Visit [beta.bitebase.app](https://beta.bitebase.app) to verify that your site is accessible

## Troubleshooting

### DNS Issues

If you encounter DNS issues:

1. Go to the DNS settings for your domain in Cloudflare
2. Verify that there's a CNAME record for `beta` pointing to your Pages deployment
3. Make sure that the Proxy status is enabled (orange cloud)

### SSL/TLS Issues

If you encounter SSL/TLS issues:

1. Go to the SSL/TLS settings for your domain in Cloudflare
2. Make sure the SSL/TLS encryption mode is set to "Full" or "Full (strict)"
3. Check if there are any SSL/TLS certificate issues

### Custom Domain Not Working

If your custom domain is not working:

1. Check that the domain is properly activated in Pages
2. Verify that the DNS settings are correct
3. Wait for DNS propagation (can take up to 24 hours)
4. Try clearing your browser cache

## Next Steps

After setting up your custom domain:

1. Update any references to your Pages URL in your code to use the custom domain
2. Set up redirects from the Pages URL to your custom domain if needed
3. Consider setting up additional custom domains if required (e.g., www.beta.bitebase.app)
