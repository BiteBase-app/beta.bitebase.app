/**
 * Simple Worker
 *
 * This worker returns a simple text response.
 */

// Handle requests
async function handleRequest(request) {
  // Return a simple text response
  return new Response('Hello from BiteBase App!', {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

// Register the event listener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});
