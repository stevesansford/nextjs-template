/**
 * Anthropic Provider Implementation
 * Implements the AIProvider interface for Anthropic's API
 */

import { AIProvider, AIProviderConfig, AIRequestOptions, AIStreamEvent } from './types';
import Anthropic from '@anthropic-ai/sdk';

// Define message types based on Anthropic's API
type AnthropicMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export class AnthropicProvider implements AIProvider {
  private client: InstanceType<typeof Anthropic>;
  private model: string;

  /**
   * Initialize the Anthropic provider
   * @param config Provider configuration
   */
  constructor(config: AIProviderConfig) {
    this.client = new Anthropic({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
    this.model = config.model;
  }

  /**
   * Generate a complete response from Anthropic (non-streaming)
   * @param options Request options
   * @returns The generated text
   */
  async generate(options: AIRequestOptions): Promise<string> {
    const { prompt, systemMessage } = this.formatInput(options);
    
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: options.maxTokens ?? 1024,
        messages: prompt as AnthropicMessage[],
        system: systemMessage,
        temperature: options.temperature,
        stop_sequences: options.stopSequences,
      });
      
      return response.content[0].text;
    } catch (error) {
      console.error('Anthropic API error:', error);
      throw error;
    }
  }

  /**
   * Generate a streaming response from Anthropic
   * @param options Request options
   * @yields Text chunks as they are generated
   */
  async *generateStream(options: AIRequestOptions): AsyncGenerator<AIStreamEvent, void, unknown> {
    const { prompt, systemMessage } = this.formatInput(options);
    
    try {
      const stream = await this.client.messages.create({
        model: this.model,
        max_tokens: options.maxTokens ?? 1024,
        messages: prompt as AnthropicMessage[],
        system: systemMessage,
        temperature: options.temperature,
        stop_sequences: options.stopSequences,
        stream: true,
      });
      
      for await (const chunk of stream) {
        if (chunk.type === 'content_block_delta' && chunk.delta.text) {
          yield {
            text: chunk.delta.text,
            done: false,
          };
        }
      }
      
      yield {
        text: '',
        done: true,
      };
    } catch (error) {
      console.error('Anthropic streaming error:', error);
      throw error;
    }
  }
  
  /**
   * Format the input for Anthropic's API
   * Handles different prompt formats and prepares for API call
   */
  private formatInput(options: AIRequestOptions): { 
    prompt: AnthropicMessage[] | string, 
    systemMessage?: string 
  } {
    let prompt: AnthropicMessage[] = [];
    const systemMessage = options.systemMessage;

    // Handle different prompt formats
    if (typeof options.prompt === 'string') {
      // Convert string prompt to a user message
      prompt = [{ role: 'user', content: options.prompt }];
    } else {
      // Convert array format to Anthropic's message format
      prompt = options.prompt.map(msg => {
        if (typeof msg === 'string') {
          return { role: 'user', content: msg };
        }
        // Assume it's already in the correct format
        return msg as AnthropicMessage;
      });
    }

    return { prompt, systemMessage };
  }
} 