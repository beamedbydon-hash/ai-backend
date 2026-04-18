import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// Gemini API key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// test route
app.get("/", (req, res) => {
  res.send("Gemini API running");
});

app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: msg }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Gemini server running");
});
