# AI Provider Abstraction Layer

This module provides a flexible abstraction layer for working with different AI providers (OpenAI and Anthropic) in your Next.js application.

## Features

- Unified interface for different AI providers
- Support for both OpenAI and Anthropic Claude models
- Streaming and non-streaming response handling
- Configurable via environment variables
- Factory pattern for creating provider instances

## Environment Variables

Set these environment variables to configure the AI providers:

- `NEXT_PUBLIC_AI_PROVIDER`: The default AI provider to use ('openai' or 'anthropic')
- `OPENAI_API_KEY`: Your OpenAI API key (required if using OpenAI)
- `ANTHROPIC_API_KEY`: Your Anthropic API key (required if using Anthropic)
- `OPENAI_API_BASE_URL`: (Optional) Custom base URL for OpenAI API
- `ANTHROPIC_API_BASE_URL`: (Optional) Custom base URL for Anthropic API
- `OPENAI_ORGANIZATION_ID`: (Optional) OpenAI organization ID

## Basic Usage

```typescript
import { generateText, generateTextStream } from '@/lib/ai';

// Generate a complete text response (non-streaming)
async function getCompletion() {
  const response = await generateText({
    prompt: 'Write a short poem about programming',
    temperature: 0.7,
    maxTokens: 500,
  });
  
  console.log(response);
}

// Generate a streaming text response
async function streamCompletion() {
  const stream = generateTextStream({
    prompt: 'Write a step-by-step guide to learning React',
    temperature: 0.7,
    maxTokens: 1000,
  });
  
  let fullResponse = '';
  for await (const chunk of stream) {
    fullResponse += chunk.text;
    console.log('Chunk:', chunk.text);
    
    if (chunk.done) {
      console.log('Stream complete');
      break;
    }
  }
  
  console.log('Full response:', fullResponse);
}
```

## Advanced Usage

### Creating Custom Providers

```typescript
import { createCustomProvider, AIProviderType } from '@/lib/ai';

// Create a custom OpenAI provider with GPT-4
const customGPT4Provider = createCustomProvider(AIProviderType.OPENAI, {
  apiKey: 'your-api-key', // Required
  model: 'gpt-4', // Override default model
});

// Use custom provider
const response = await generateText({
  prompt: 'Explain quantum computing',
}, customGPT4Provider);
```

### Sending Structured Messages

```typescript
import { generateText } from '@/lib/ai';

// Using an array of messages instead of a string prompt
const response = await generateText({
  prompt: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Tell me about the solar system.' }
  ],
  temperature: 0.5,
});
```

## Error Handling

```typescript
import { generateText } from '@/lib/ai';

try {
  const response = await generateText({
    prompt: 'Write code to solve a complex problem',
  });
  console.log(response);
} catch (error) {
  console.error('AI generation failed:', error.message);
}
``` 