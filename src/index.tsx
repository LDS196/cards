import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "app/store"
import App from "app/App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { BrowserRouter, HashRouter } from "react-router-dom"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
    <HashRouter >
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
)

reportWebVitals()
