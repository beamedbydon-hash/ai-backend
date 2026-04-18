import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
});

// test route (so browser works)
app.get("/", (req, res) => {
  res.send("API is running");
});

// chat route
app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    if (!msg) {
      return res.status(400).json({ reply: "No message provided" });
    }

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: msg,
    });

    res.json({
      reply: response.output_text || "No response",
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ reply: "server error" });
  }
});

// use Render's port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
