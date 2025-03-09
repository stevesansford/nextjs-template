/**
 * Chat API route
 * 
 * This API route demonstrates how to use the AI provider abstraction layer
 * to generate chat responses from different AI providers.
 */

import { generateText, generateTextStream } from '@/lib/ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    const { prompt, stream = false, systemMessage, temperature = 0.7 } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Handle streaming response
    if (stream) {
      // For streaming, we need to use a different response approach
      const encoder = new TextEncoder();
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            const stream = generateTextStream({
              prompt,
              temperature,
              systemMessage,
            });

            for await (const chunk of stream) {
              // Send each chunk to the client
              controller.enqueue(encoder.encode(JSON.stringify({ chunk: chunk.text, done: chunk.done }) + '\n'));
              
              // If done, close the stream
              if (chunk.done) {
                controller.close();
                break;
              }
            }
          } catch (error) {
            // Send error to client and close stream
            controller.enqueue(
              encoder.encode(JSON.stringify({ error: (error as Error).message, done: true }) + '\n')
            );
            controller.close();
          }
        },
      });

      return new NextResponse(customReadable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
        },
      });
    }

    // Handle non-streaming response
    const response = await generateText({
      prompt,
      temperature,
      systemMessage,
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic'; 