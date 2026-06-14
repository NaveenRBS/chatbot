export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { message } = JSON.parse(event.body);
  const API_KEY = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Gemini Error:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Gemini API rejected the request." })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.candidates[0].content.parts[0].text })
    };

  } catch (error) {
    console.error("Server crash:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Backend crashed." })
    };
  }
};