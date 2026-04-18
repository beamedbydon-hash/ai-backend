import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const client = new OpenAI({
  api_key: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const msg = req.body.message;

    const response = await client.responses.create({
      model: "gpt-5.2",
      input: msg
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "error" });
  }
});

app.listen(3000, () => {
  console.log("running");
});