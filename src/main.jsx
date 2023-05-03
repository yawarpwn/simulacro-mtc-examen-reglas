import { render } from "preact"
import Layout from "./components/Layout.jsx"
import App from "./app.jsx"
import "./index.css"

render(
    <Layout>
      <App />
    </Layout>,
  document.getElementById("app")
)
