const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/ask", (req, res) => {
  const userMessage = req.body.message;

  // Simple hardcoded Krishna-style dummy reply
  const dummyReply = `
    Jai Shree Krishna, my dear one! 🌸  
    You asked: "${userMessage}"  
    Remember: *“Do your duty without attachment to results.”*  
    Trust in Dharma and walk your path with faith. 🕉️
  `;

  res.json({ reply: dummyReply });
});

app.listen(port, () => {
  console.log("🕉️ Krishna server running on port", port);
});
