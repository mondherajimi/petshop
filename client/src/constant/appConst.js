const appConst = {}

// =============================
// CONF SPECIFIQUE PRODUCTION
// =============================
if (window.__ENVIRONMENT__ === 'production') {
	appConst.api = {
		baseUrl: window.___API_URL___
	}
} else {
  // =============================
  // DEVELOPPEMENT
  // =============================
	appConst.api = {
		baseUrl: 'http://localhost:4000/api'
	}
}

export default appConst
