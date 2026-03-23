const generateBtn = document.getElementById('generateBtn');
const topicInput = document.getElementById('topicInput');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('resultSection');

generateBtn.addEventListener('click', async () => {
    const topic = topicInput.value.trim();
    if (!topic) return alert("Please enter a topic coordinate.");

    loading.classList.remove('hidden');
    resultSection.classList.add('hidden');

    try {
        const response = await fetch('http://localhost:5000/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error);

        // 1. Animated Notes (Typewriter feel)
        document.getElementById('notesContent').innerText = data.notes;

        // 2. Guidance
        const guidanceList = document.getElementById('guidanceList');
        guidanceList.innerHTML = data.guidance.map(item => `<li>➤ ${item}</li>`).join('');

        // 3. Videos
        const videoGrid = document.getElementById('videoGrid');
        videoGrid.innerHTML = data.videos.map(video => `
            <div class="video-card">
                <img src="${video.thumbnail}">
                <a href="${video.link}" target="_blank">${video.title}</a>
            </div>
        `).join('');

        loading.classList.add('hidden');
        resultSection.classList.remove('hidden');

    } catch (error) {
        alert("System Error: " + error.message);
        loading.classList.add('hidden');
    }
});
