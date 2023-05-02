import { render } from "preact"
import Layout from "./components/Layout.jsx"
import { QuestionProvider } from "./hooks/useQuestion"
import App from "./app.jsx"
import "./index.css"

render(
  <QuestionProvider>
    <Layout>
      <App />
    </Layout>
  </QuestionProvider>,
  document.getElementById("app")
)
