// Simple test script for Cloudflare AI

async function run(model, input) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/dc95c232d76cc4df23a5ca452a4046ab/ai/run/${model}`,
    {
      headers: { 
        "Authorization": "Bearer dIPwmSfU475UYmZaKivaQ-fhvt_jh6W8QaKxJ4d5",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}

// Test with a simple prompt
run("@cf/meta/llama-3-8b-instruct", {
  messages: [
    {
      role: "system",
      content: "You are a friendly assistant that helps write stories",
    },
    {
      role: "user",
      content: "Write a short story about a llama that goes on a journey to find an orange cloud",
    },
  ],
}).then((response) => {
  console.log(JSON.stringify(response, null, 2));
}).catch((error) => {
  console.error("Error:", error);
});
