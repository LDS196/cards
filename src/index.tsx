import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { persistor, store } from "app/store"
import App from "app/App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { BrowserRouter, HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react"

const container = document.getElementById("root")!
const root = createRoot(container)

root.render(
    <HashRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </HashRouter>
)

reportWebVitals()
