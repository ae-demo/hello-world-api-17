import { useCallback, useEffect, useState } from "react";
import { helloApi } from "../api";

type Status = "loading" | "connected" | "error";

export default function Greeting() {
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<Status>("loading");

  const fetchGreeting = useCallback(() => {
    setStatus("loading");
    helloApi
      .GET("/greeting")
      .then(({ data, error }) => {
        if (error || !data) {
          setStatus("error");
          return;
        }
        setMessage(data.message);
        setStatus("connected");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    fetchGreeting();
  }, [fetchGreeting]);

  const statusLabel =
    status === "loading"
      ? "Connecting..."
      : status === "connected"
        ? "Connected"
        : "Error";

  const statusDetail =
    status === "loading"
      ? "Waiting on hello-api..."
      : status === "connected"
        ? "hello-api responded successfully"
        : "hello-api did not respond";

  return (
    <div className="page">
      <nav className="navbar">
        <span className="navbar-brand">Hello World</span>
      </nav>
      <main className="content">
        <h1 className="heading">
          {status === "loading" ? "Loading greeting..." : message}
        </h1>
        <p className="body-text">
          This greeting was fetched live from the hello-api service.
        </p>
        <div className={`card card-${status}`}>
          <div className="card-label">Status</div>
          <div className="card-value">{statusLabel}</div>
          <div className="card-caption">{statusDetail}</div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={fetchGreeting}
        >
          Refresh greeting
        </button>
      </main>
    </div>
  );
}
