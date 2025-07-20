const API_ENDPOINT = 'https://api.moonshot.cn/v1/chat/completions';
let userApiKey = '';

// Show instructions and warning on the main page
window.addEventListener('DOMContentLoaded', () => {
  const instructions = document.createElement('section');
  instructions.id = 'instructions';
  instructions.innerHTML = `
    <h2>How to Use</h2>
    <ol>
      <li>Get your Kimi API key from <a href="https://platform.moonshot.cn/" target="_blank" rel="noopener">Kimi Open Platform</a> (see README for details).</li>
      <li>Enter your API key below. <strong>Your key is never stored and is only used for your current session.</strong></li>
      <li>Enter a name to search and submit.</li>
    </ol>
    <p class="warning"><strong>Warning:</strong> If you use this site as a static page, your API key is visible to your browser and could be exposed. Do not use sensitive or production keys here.</p>
  `;
  document.body.insertBefore(instructions, document.body.firstChild);

  // Add API key input
  const apiKeyDiv = document.createElement('div');
  apiKeyDiv.id = 'api-key-div';
  apiKeyDiv.innerHTML = `
    <label for="apiKey">Kimi API Key:</label>
    <input type="password" id="apiKey" name="apiKey" required placeholder="Paste your Kimi API key here..." autocomplete="off" style="width: 100%; max-width: 400px;">
  `;
  document.body.insertBefore(apiKeyDiv, instructions.nextSibling);

  document.getElementById('apiKey').addEventListener('input', (e) => {
    userApiKey = e.target.value.trim();
  });
});

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
        model: 'moonshot-v1-8k',
        messages: [
          { role: 'user', content: `Find details about this person: ${query}` }
        ]
      })
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Try again later.');
      } else {
        throw new Error('API error: ' + response.status);
      }
    }
    const data = await response.json();
    // Kimi returns completions in data.choices[0].message.content
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      renderResults(`<pre>${escapeHtml(data.choices[0].message.content)}</pre>`);
    } else {
      renderResults('No results found.');
    }
  } catch (err) {
    renderResults(`<span class="error">${escapeHtml(err.message)}</span>`);
  }
}

document.getElementById('searchForm').addEventListener('submit', handleSearch);

function renderResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = typeof results === 'string' ? results : '';
}

function escapeHtml(text) {
  return text.replace(/[&<>'"]/g, function (c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'})[c];
  });
} 