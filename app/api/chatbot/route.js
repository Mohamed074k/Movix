import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, conversationHistory } = await request.json();

    // Check if OpenAI API key is configured
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // English system prompt
    const systemPrompt = `You are MoveiBot, an AI assistant for the MovieHub website focused on movies and TV shows. 

Your Role:
- Help users discover movies and TV shows based on their preferences
- Provide relevant movie and TV show recommendations
- Answer questions about the entertainment world, actors, directors, and the film industry
- Give information about ratings, genres, and movie plots
- Assist with movie searches based on specific criteria

Communication Style:
- Friendly and helpful
- Give informative but concise answers
- Use natural English
- If asked for recommendations, give 3–5 options with short reasons
- If you are unsure about specific information, suggest checking the MovieHub website

Do not:
- Give spoilers unless specifically asked
- Make up false information about movies
- Answer questions unrelated to movies and entertainment`;

    // Format conversation history for OpenAI
    const formattedHistory = conversationHistory.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.content
    }));

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: systemPrompt },
      ...formattedHistory,
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || 'Sorry, I am unable to respond at the moment.';

    return NextResponse.json({ response: botResponse });

  } catch (error) {
    console.error('Chatbot API error:', error);
    return NextResponse.json(
      { 
        response: 'Sorry, I am experiencing technical difficulties. Please try again later.' 
      },
      { status: 500 }
    );
  }
}
