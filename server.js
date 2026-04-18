import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OpenRouter API running");
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Missing prompt"
      });
    }

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
          kind: "Script",
          name: "SprintServer",
          parent: "ServerScriptService",
          source: `local ReplicatedStorage = game:GetService("ReplicatedStorage")
local SprintRemote = ReplicatedStorage:WaitForChild("SprintRemote")

SprintRemote.OnServerEvent:Connect(function(player, isSprinting)
\tprint(player.Name .. " sprinting: " .. tostring(isSprinting))
end)`
        },
        {
          kind: "LocalScript",
          name: "SprintClient",
          parent: "StarterPlayerScripts",
          source: `local UserInputService = game:GetService("UserInputService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local SprintRemote = ReplicatedStorage:WaitForChild("SprintRemote")
local sprinting = false

UserInputService.InputBegan:Connect(function(input, processed)
\tif processed then return end
\tif input.KeyCode == Enum.KeyCode.LeftShift then
\t\tsprinting = true
\t\tSprintRemote:FireServer(true)
\tend
end)

UserInputService.InputEnded:Connect(function(input)
\tif input.KeyCode == Enum.KeyCode.LeftShift then
\t\tsprinting = false
\t\tSprintRemote:FireServer(false)
\tend
end)`
        },
        {
          kind: "ScreenGui",
          name: "SprintGui",
          parent: "StarterGui",
          ui: {
            className: "ScreenGui",
            name: "SprintGui",
            properties: {
              ResetOnSpawn: false
            },
            children: [
              {
                className: "Frame",
                name: "StaminaBarBackground",
                properties: {
                  Size: { type: "UDim2", xScale: 0, xOffset: 220, yScale: 0, yOffset: 20 },
                  Position: { type: "UDim2", xScale: 0.5, xOffset: -110, yScale: 1, yOffset: -50 },
                  BackgroundTransparency: 0.2
                },
                children: [
                  {
                    className: "Frame",
                    name: "StaminaBarFill",
                    properties: {
                      Size: { type: "UDim2", xScale: 1, xOffset: 0, yScale: 1, yOffset: 0 }
                    },
                    children: []
                  }
                ]
              }
            ]
          }
        }
      ],
      promptUsed: prompt
    });
  } catch (error) {
    console.error("Generate error:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
