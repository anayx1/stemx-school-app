// app/api/ai-assistant/route.js
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { message } = await request.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant. Give the simplest, clearest explanations possible in 50 words or less.' },
                { role: 'user', content: message },
            ],
            max_tokens: 100,
            temperature: 0.5,
        }),
    });

    const data = await response.json();

    if (data.error) {
        return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ message: data.choices[0].message.content.trim() });
}
