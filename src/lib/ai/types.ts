/**
 * AI Provider Abstraction Layer Types
 * This file contains type definitions for the AI provider abstraction layer.
 */

/**
 * Common configuration options for AI providers
 */
export interface AIProviderConfig {
  apiKey: string;
  model: string;
  baseUrl?: string;
  organizationId?: string;
  timeout?: number;
}

/**
 * Message format for AI models
 */
export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Common options for AI generation requests
 */
export interface AIRequestOptions {
  /** The prompt or messages to generate a response from */
  prompt: string | AIMessage[];
  
  /** Control randomness: 0 = deterministic, 1 = maximum creativity */
  temperature?: number;
  
  /** Maximum number of tokens to generate */
  maxTokens?: number;
  
  /** Whether to stream the response */
  stream?: boolean;
  
  /** Stop sequences to end generation */
  stopSequences?: string[];
  
  /** System message or instructions (implementation varies by provider) */
  systemMessage?: string;
  
  /** Top-p sampling (nucleus sampling) */
  topP?: number;
  
  /** Controls diversity via nucleus sampling */
  presencePenalty?: number;
  
  /** Controls repetition */
  frequencyPenalty?: number;
  
  /** Additional provider-specific options */
  additionalOptions?: Record<string, unknown>;
}

/**
 * Streaming response event from AI providers
 */
export interface AIStreamEvent {
  /** The text chunk */
  text: string;
  
  /** Indicates if this is the final chunk */
  done: boolean;
}

/**
 * Base interface for AI provider implementations
 */
export interface AIProvider {
  /**
   * Generate a complete response (non-streaming)
   * @param options Request options
   * @returns The generated text
   */
  generate(options: AIRequestOptions): Promise<string>;
  
  /**
   * Generate a streaming response
   * @param options Request options
   * @returns Async generator that yields text chunks
   */
  generateStream(options: AIRequestOptions): AsyncGenerator<AIStreamEvent, void, unknown>;
}

/**
 * Supported AI provider types
 */
export enum AIProviderType {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
} 