# People Search Website

A simple, mobile-friendly static website that allows users to search for details on private individuals using an AI-powered people search API (no data is retained, no mock data is used). Designed for deployment on GitHub Pages.

## Features
- Responsive, mobile-first design
- Search for individuals by name using a real AI API (Kimi/Moonshot)
- No user or search data is stored
- Accessible and SEO-friendly
- Easy to deploy to GitHub Pages
- CI for code quality

## How to Get and Use Your Kimi API Key

1. **Sign Up / Log In**
   - Go to the [Kimi Open Platform](https://platform.moonshot.cn/).
   - Log in or create an account.
2. **Create an API Key**
   - In the left sidebar, click on **API Key Management** (API Key 管理).
   - Click **New** (新建) to create a new API key.
   - Enter a name and select a project if prompted.
   - Click **Save** and **copy the API key** (it will only be shown once).
3. **Use the API Key in This App**
   - Open the site and paste your API key into the field at the top of the page.
   - Your key is never stored and is only used for your current session.

**Warning:** If you use this site as a static page, your API key is visible to your browser and could be exposed. Do not use sensitive or production keys here.

## Error Handling
- If your API key is invalid, you will see an error message.
- If you exceed rate limits, you will be notified.
- Other API errors are also displayed.

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/people-search.git
   cd people-search
   ```
2. Open `frontend/index.html` in your browser to use locally.

## Development
- All code is in the `frontend/` directory.
- Edit HTML, CSS, or JS as needed.
- Use `npm run lint` (after setup) to check code quality.

## Deployment
- Push to the `main` branch.
- Enable GitHub Pages in repository settings, set source to `/frontend` folder.

## Contributing
- Fork the repo, create a branch, submit a PR.
- All code is checked by CI for linting and quality.

## License
MIT 