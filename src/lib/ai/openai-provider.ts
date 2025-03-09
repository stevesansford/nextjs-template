/**
 * OpenAI Provider Implementation
 * Implements the AIProvider interface for OpenAI's API
 */

import { AIProvider, AIProviderConfig, AIRequestOptions, AIStreamEvent } from './types';
import OpenAI from 'openai';

// Define message types based on OpenAI's API
type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export class OpenAIProvider implements AIProvider {
  private client: InstanceType<typeof OpenAI>;
  private model: string;

  /**
   * Create a new OpenAI provider
   * @param config Configuration for the OpenAI provider
   */
  constructor(config: AIProviderConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      organization: config.organizationId,
      baseURL: config.baseUrl,
      timeout: config.timeout ?? 30000,
    });
    this.model = config.model;
  }

  /**
   * Format messages for OpenAI's chat completions API
   * @param options Request options
   * @returns Formatted messages for OpenAI
   */
  private formatMessages(options: AIRequestOptions): Array<OpenAIMessage> {
    const messages: Array<OpenAIMessage> = [];

    // Add system message if provided
    if (options.systemMessage) {
      messages.push({
        role: 'system',
        content: options.systemMessage,
      });
    }

    // Handle different prompt formats
    if (typeof options.prompt === 'string') {
      // Simple string prompt becomes a user message
      messages.push({
        role: 'user',
        content: options.prompt,
      });
    } else if (Array.isArray(options.prompt)) {
      // Array of messages (assume properly formatted)
      options.prompt.forEach(msg => {
        if (typeof msg === 'string') {
          messages.push({
            role: 'user',
            content: msg,
          });
        } else {
          messages.push(msg as OpenAIMessage);
        }
      });
    }

    return messages;
  }

  /**
   * Generate a complete response (non-streaming)
   * @param options Request options
   * @returns The generated text
   */
  async generate(options: AIRequestOptions): Promise<string> {
    try {
      const messages = this.formatMessages(options);
      
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stop: options.stopSequences,
        stream: false,
        ...options.additionalOptions,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenAI generation error:', error);
      throw new Error(`OpenAI generation failed: ${(error as Error).message}`);
    }
  }

  /**
   * Generate a streaming response
   * @param options Request options
   * @returns Async generator that yields text chunks
   */
  async *generateStream(options: AIRequestOptions): AsyncGenerator<AIStreamEvent, void, unknown> {
    try {
      const messages = this.formatMessages(options);
      
      const stream = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: options.temperature,
        max_tokens: options.maxTokens,
        top_p: options.topP,
        frequency_penalty: options.frequencyPenalty,
        presence_penalty: options.presencePenalty,
        stop: options.stopSequences,
        stream: true,
        ...options.additionalOptions,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          yield {
            text: content,
            done: false,
          };
        }
      }

      // Signal completion
      yield {
        text: '',
        done: true,
      };
    } catch (error) {
      console.error('OpenAI stream generation error:', error);
      throw new Error(`OpenAI stream generation failed: ${(error as Error).message}`);
    }
  }
} 