/**
 * AI Provider Abstraction Layer
 * Main entry point for the AI provider abstraction layer
 */

import { createAIProvider, getDefaultModel } from './factory';
import { AIProvider, AIProviderType, AIRequestOptions, AIStreamEvent } from './types';

/**
 * Configuration for the default AI provider
 */
const getDefaultConfig = () => {
  // Determine provider type from environment variables
  const providerType = (process.env.NEXT_PUBLIC_AI_PROVIDER || 'openai').toLowerCase() as AIProviderType;
  
  // Get API key based on provider type
  let apiKey = '';
  if (providerType === AIProviderType.OPENAI) {
    apiKey = process.env.OPENAI_API_KEY || '';
  } else if (providerType === AIProviderType.ANTHROPIC) {
    apiKey = process.env.ANTHROPIC_API_KEY || '';
  }

  if (!apiKey) {
    console.warn(`No API key found for ${providerType} provider. Please set the appropriate environment variable.`);
  }

  return {
    type: providerType,
    config: {
      apiKey,
      model: getDefaultModel(providerType),
      baseUrl: process.env[`${providerType.toUpperCase()}_API_BASE_URL`],
      organizationId: process.env.OPENAI_ORGANIZATION_ID,
    },
  };
};

// Create the default provider instance
const defaultProviderOptions = getDefaultConfig();
let defaultProvider: AIProvider;

try {
  defaultProvider = createAIProvider(
    defaultProviderOptions.type,
    defaultProviderOptions.config
  );
} catch (error) {
  console.error('Failed to initialize default AI provider:', error);
  throw new Error('AI provider initialization failed');
}

/**
 * Generate a complete text response (non-streaming)
 * @param options Request options
 * @param provider Optional custom provider to use instead of the default
 * @returns The generated text
 */
export const generateText = async (
  options: AIRequestOptions,
  provider: AIProvider = defaultProvider
): Promise<string> => {
  return provider.generate(options);
};

/**
 * Generate a streaming text response
 * @param options Request options
 * @param provider Optional custom provider to use instead of the default
 * @returns An async generator yielding text chunks
 */
export const generateTextStream = (
  options: AIRequestOptions,
  provider: AIProvider = defaultProvider
): AsyncGenerator<AIStreamEvent, void, unknown> => {
  return provider.generateStream({ ...options, stream: true });
};

/**
 * Create a custom AI provider with specific configuration
 * @param type The provider type
 * @param config The provider configuration
 * @returns A configured AI provider
 */
export const createCustomProvider = (
  type: AIProviderType | string,
  config: Partial<Omit<typeof defaultProviderOptions.config, 'apiKey'>> & { apiKey: string }
): AIProvider => {
  return createAIProvider(type, {
    ...defaultProviderOptions.config,
    ...config,
  });
};

// Export types and provider instances
export * from './types';
export { createAIProvider, getDefaultModel } from './factory';
export { OpenAIProvider } from './openai-provider';
export { AnthropicProvider } from './anthropic-provider'; 