import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Correction } from '@/types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  export async function POST(request: Request) {
    const { texto } = await request.json();
  
    const systemMessage = `You are a text correction assistant.
    Return a JSON with the following format:
    {
      "original": "original text",
      "corrected": "corrected text",
      "errors": [
        {
          "sentence": "sentence with error",
          "rules": ["Rule 1", "Rule 2"]
        }
      ]
    }.
    Make sure to strictly follow this format.`;
  
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: texto },
        ],
      });
  
      const responseContent = completion.choices[0].message?.content;
      const correction: Correction = JSON.parse(responseContent || '{}');
  
      return NextResponse.json(correction);
    } catch (error) {
      return NextResponse.json({ error: 'Error processing the request.' }, { status: 500 });
    }
  }