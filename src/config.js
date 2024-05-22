const API_URL = process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-3000.app.github.dev` : "http://localhost:3000"

export default API_URL