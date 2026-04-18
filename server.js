import express from "express";
import cors from "cors";

const app = express();

// IMPORTANT
app.use(cors());
app.use(express.json());

// health route (you already have this)
app.get("/", (req, res) => {
  res.send("OpenRouter API running");
});

// 🔥 THIS IS WHAT YOU ARE MISSING
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  console.log("Prompt:", prompt);

  // TEMP TEST RESPONSE (so your site works first)
  res.json({
    projectName: "Sprint System",
    summary: "Simple sprint system with stamina bar.",
    items: [
      {
        kind: "RemoteEvent",
        name: "SprintRemote",
        parent: "ReplicatedStorage"
      },
      {
        kind: "LocalScript",
        name: "SprintClient",
        parent: "StarterPlayerScripts",
        source: "print('Sprint system running')"
      }
    ]
  });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
