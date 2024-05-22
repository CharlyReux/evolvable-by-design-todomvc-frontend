const API_URL = process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-8080.app.github.dev/rest` : "http://localhost:8080/rest"

export default API_URL