# AI Smart Study Assistant

An intelligent study assistant that generates notes, guidance, and video resources for any topic using AI.

This project helps students learn concepts quickly with structured explanations and supporting content.

---

## Features

* AI-generated study notes (using Groq API)
* Study guidance and strategies
* YouTube video recommendations
* Fast and responsive interface
* Clean and modern UI
* Fully responsive (mobile and desktop)

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js
* Axios

### APIs Used

* Groq API (AI Notes)
* YouTube Data API (Video suggestions)

---

## Project Structure

```
📦 AI-Smart-Study
 ┣ index.html
 ┣ style.css
 ┣ script.js
 ┣ server.js
 ┣ package.json
 ┗ README.md
```

---

## Installation and Setup

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
GROQ_API_KEY=your_groq_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

### 4. Run the server

```
node server.js
```

Server will run on:

```
http://localhost:5000
```

---

## Deployment

### Backend (Render)

* Deploy `server.js` on Render
* Add environment variables
* Obtain the live API URL

### Frontend (Netlify / Vercel)

* Upload static files
* Connect frontend to backend API

---

## API Endpoint

### POST `/generate`

#### Request Body:

```
{
  "topic": "Quantum Computing"
}
```

#### Response:

```
{
  "notes": "...",
  "guidance": ["...", "..."],
  "videos": [
    {
      "title": "...",
      "link": "...",
      "thumbnail": "..."
    }
  ]
}
```

---

## Future Improvements

* User authentication system
* Voice search support
* Streaming AI responses
* Save notes feature
* Multi-language support

---

## Author

Trilok Singh Chouhan

---

## Support

If you find this project useful, consider starring the repository and sharing it.

---

## Feedback

Suggestions and improvements are welcome through issues or pull requests.
