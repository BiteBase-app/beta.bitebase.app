// Simple test script for Cloudflare AI
// Run with: node simple-cloudflare-test.js

async function callCloudflareAI() {
  try {
    console.log('Calling Cloudflare AI...');
    
    const response = await fetch(
      'https://api.cloudflare.com/client/v4/accounts/dc95c232d76cc4df23a5ca452a4046ab/ai/run/@cf/meta/llama-3-8b-instruct',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: 'Hello, how are you?',
            },
          ],
        }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error (${response.status}): ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Success! Response:', JSON.stringify(data, null, 2));
    
    if (data.result && data.result.response) {
      console.log('\nAI Response:', data.result.response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the test
callCloudflareAI();
