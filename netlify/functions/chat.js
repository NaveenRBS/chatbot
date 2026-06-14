export const handler = async (event) => {
 
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // 2. Extract the user's message from the frontend
  const { message } = JSON.parse(event.body);
  
  // 3. Grab the API key securely from Netlify's environment
  const API_KEY = process.env.OPENAI_API_KEY;

  try {
    // 4. Send the request to OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can change this to gpt-4o-mini if you prefer
        messages: [{ role: "user", content: message }],
      })
    });

    const data = await response.json();
    
    // 5. Send OpenAI's reply back to your React frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to communicate with OpenAI" })
    };
  }
};