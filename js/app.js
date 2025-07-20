const API_ENDPOINT = 'https://api.moonshot.cn/v1/chat/completions';
let userApiKey = '';

document.getElementById('apiKey').addEventListener('input', (e) => {
  userApiKey = e.target.value.trim();
});

document.getElementById('searchForm').addEventListener('submit', handleSearch);

async function handleSearch(event) {
  event.preventDefault();
  const query = document.getElementById('query').value.trim();
  if (!query) return;
  if (!userApiKey) {
    renderResults('Please enter your Kimi API key above.');
    return;
  }
  renderResults('Searching...');
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userApiKey}`
      },
      body: JSON.stringify({
        model: 'moonshotai/kimi-k2',
        messages: [
          { role: 'system', content: 'You are the most helpful assistant and will try to find all information available anywhere about people.' },
          { role: 'user', content: `Tell me everything you can about ${query}` }
        ],
      }),
    });
    const data = await response.json();
    renderResults(data.choices[0].message.content);
  } catch (error) {
    renderResults(`Error: ${error.message}`);
  }
}

function renderResults(content) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<p>${content}</p>`;
}