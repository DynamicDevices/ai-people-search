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
          { role: 'system', content: 'You are a helpful assistant that finds public information about people.' },
          { role: 'user', content: `Tell me everything you can about ${query}` }
        ],
        temperature: 0.2,
        max_tokens: 512
      })
    });
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Try again later.');
      } else {
        const errText = await response.text();
        throw new Error('API error: ' + response.status + (errText ? ' - ' + errText : ''));
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

function renderResults(results) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = typeof results === 'string' ? results : '';
}

function escapeHtml(text) {
  return text.replace(/[&<>'"]/g, function (c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'})[c];
  });
} 