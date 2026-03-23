require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

//
// 🤖 Generate Notes (Groq FREE AI)
//
async function generateNotes(topic) {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // ✅ FIXED MODEL
        messages: [
          {
            role: "user",
            content: `Explain ${topic} in simple bullet points for students with examples.`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Groq ERROR:", error.response?.data || error.message);
    throw new Error("AI failed");
  }
}

//
// 💡 Study Guidance
//
function getStudyGuidance(topic) {
  return [
    `Start with basics of ${topic}`,
    "Use Feynman technique (teach someone)",
    "Follow Pomodoro (25 min focus)",
    `Make notes & diagrams`
  ];
}

//
// 🎥 YouTube Videos
//
async function getYouTubeVideos(topic) {
  try {
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: `${topic} class explanation`,
          type: "video",
          maxResults: 3,
          key: YOUTUBE_API_KEY
        }
      }
    );

    return res.data.items.map(item => ({
      title: item.snippet.title,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      thumbnail: item.snippet.thumbnails.medium.url
    }));

  } catch (error) {
    console.error("YouTube ERROR:", error.message);
    return [];
  }
}

//
// 🚀 Main Route
//
app.post('/generate', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  try {
    const notes = await generateNotes(topic);
    const guidance = getStudyGuidance(topic);
    const videos = await getYouTubeVideos(topic);

    res.json({ notes, guidance, videos });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate study materials" });
  }
});

//
// ▶️ Start Server
//
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
