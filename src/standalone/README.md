# BiteBase AI Standalone Chatbot

This directory contains the code for the standalone chatbot that can be embedded in any website.

## How to Use

### 1. Include the Required Scripts

Add the following scripts to your HTML file:

```html
<!-- React and ReactDOM -->
<script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- BiteBase AI Chatbot -->
<script src="https://cdn.bitebase.ai/chatbot/v1/standalone.js"></script>
```

### 2. Add a Container for the Chatbot

Add a div element to your HTML file where you want the chatbot to be rendered:

```html
<div id="bitebase-chatbot"></div>
```

### 3. Initialize the Chatbot

Add the following script to initialize the chatbot:

```html
<script>
  BiteBaseChatbot.init({
    apiUrl: "https://api.bitebase.ai/api/v1/chatbot/chat",
    initialMessage: "Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?",
    title: "BiteBase AI Assistant",
    primaryColor: "#4f46e5",
    secondaryColor: "#818cf8",
    position: "bottom-right",
    width: "350px",
    height: "500px",
    containerId: "bitebase-chatbot"
  });
</script>
```

## Configuration Options

The `init` function accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiUrl` | string | `"https://api.bitebase.ai/api/v1/chatbot/chat"` | The URL of the chatbot API endpoint |
| `initialMessage` | string | `"Hello! I'm your BiteBase AI Assistant. How can I help you with your restaurant analytics today?"` | The initial message displayed by the chatbot |
| `title` | string | `"BiteBase AI Assistant"` | The title of the chatbot |
| `primaryColor` | string | `"#4f46e5"` | The primary color of the chatbot |
| `secondaryColor` | string | `"#818cf8"` | The secondary color of the chatbot |
| `position` | string | `"bottom-right"` | The position of the chatbot. Can be `"bottom-right"`, `"bottom-left"`, `"top-right"`, or `"top-left"` |
| `width` | string | `"350px"` | The width of the chatbot |
| `height` | string | `"500px"` | The height of the chatbot |
| `containerId` | string | `"bitebase-chatbot"` | The ID of the container element |
| `restaurantProfileId` | string | `undefined` | The ID of the restaurant profile to use for context |

## Building the Standalone Bundle

To build the standalone bundle, run the following command:

```bash
npm run build:standalone
```

This will create a `standalone.js` file in the `dist/standalone` directory that can be used in any website.

## Deploying the Standalone Bundle

To deploy the standalone bundle to a CDN, you can use the following command:

```bash
npm run deploy:standalone
```

This will upload the `standalone.js` file to the configured CDN.
