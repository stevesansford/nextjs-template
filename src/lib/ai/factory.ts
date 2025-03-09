/**
 * AI Provider Factory
 * Creates instances of AI providers based on type and configuration
 */

import { AIProvider, AIProviderConfig, AIProviderType } from './types';
import { OpenAIProvider } from './openai-provider';
import { AnthropicProvider } from './anthropic-provider';

/**
 * Factory function to create an AI provider
 * @param type The type of AI provider to create
 * @param config Configuration for the provider
 * @returns An instance of the specified AI provider
 * @throws Error if the provider type is not supported
 */
export const createAIProvider = (
  type: AIProviderType | string,
  config: AIProviderConfig
): AIProvider => {
  switch (type.toLowerCase()) {
    case AIProviderType.OPENAI:
      return new OpenAIProvider(config);
    case AIProviderType.ANTHROPIC:
      return new AnthropicProvider(config);
    default:
      throw new Error(`Unsupported AI provider type: ${type}`);
  }
};

/**
 * Get the recommended default model for a provider
 * @param type The provider type
 * @returns The recommended default model for the provider
 */
export const getDefaultModel = (type: AIProviderType | string): string => {
  switch (type.toLowerCase()) {
    case AIProviderType.OPENAI:
      return 'gpt-4o';
    case AIProviderType.ANTHROPIC:
      return 'claude-3-opus-20240229';
    default:
      throw new Error(`Unsupported AI provider type: ${type}`);
  }
}; 