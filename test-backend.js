// Test script for the backend worker
// Run with: node test-backend.js

async function testBackendWorker() {
  try {
    console.log('Testing backend worker...');

    // Test health endpoint
    console.log('\nTesting health endpoint...');
    const healthResponse = await fetch('https://bitebase-direct-backend.bitebase.workers.dev/health');
    console.log(`Status: ${healthResponse.status}`);
    console.log(`Headers:`, Object.fromEntries(healthResponse.headers.entries()));

    try {
      const healthData = await healthResponse.json();
      console.log(`Response:`, healthData);
    } catch (error) {
      console.error(`Error parsing health response: ${error.message}`);
      console.log(`Raw response:`, await healthResponse.text());
    }

    // Test chat endpoint
    console.log('\nTesting chat endpoint...');
    const chatResponse = await fetch('https://bitebase-direct-backend.bitebase.workers.dev/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Hello, how are you?' }
        ]
      })
    });
    console.log(`Status: ${chatResponse.status}`);
    console.log(`Headers:`, Object.fromEntries(chatResponse.headers.entries()));

    try {
      const chatData = await chatResponse.json();
      console.log(`Response:`, JSON.stringify(chatData, null, 2));
    } catch (error) {
      console.error(`Error parsing chat response: ${error.message}`);
      console.log(`Raw response:`, await chatResponse.text());
    }

  } catch (error) {
    console.error('Error testing backend worker:', error);
  }
}

// Run the test
testBackendWorker();
