import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("OpenRouter API running");
});

// chat route
app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    if (!msg) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // FREE model
        messages: [
          { role: "user", content: msg }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content || "No response";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running");
});
