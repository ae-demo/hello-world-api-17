import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// Dynamic import: a synchronous top-level throw further down the import
// graph (env.ts, when runtime config failed to load) would otherwise abort
// this whole module before any fallback UI could render, leaving the page
// blank. Loading App as a promise lets that failure be caught here instead.
import("./App")
  .then(({ default: App }) => {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  })
  .catch((error) => {
    console.error("Failed to load app:", error);
    root.render(
      <div className="page">
        <nav className="navbar">
          <span className="navbar-brand">Hello World</span>
        </nav>
        <main className="content">
          <h1 className="heading">Hello, World!</h1>
        </main>
      </div>,
    );
  });
