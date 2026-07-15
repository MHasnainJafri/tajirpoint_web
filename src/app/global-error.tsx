"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          padding: "24px",
          background: "#060D0A",
          color: "#F2F7F4",
          fontFamily: "system-ui, -apple-system, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-280px",
            left: "50%",
            width: "1000px",
            height: "620px",
            transform: "translateX(-50%)",
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.13),transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", textAlign: "center", maxWidth: "480px" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "ui-monospace, monospace",
              fontSize: "12px",
              letterSpacing: "2.5px",
              color: "#FF7A6B",
            }}
          >
            CRITICAL
          </p>
          <h1
            style={{
              margin: "20px 0 0",
              fontSize: "clamp(30px,5vw,48px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            Critical error
          </h1>
          <p
            style={{
              margin: "18px 0 0",
              fontSize: "17px",
              lineHeight: 1.6,
              color: "rgba(242,247,244,.62)",
            }}
          >
            {error.message || "A critical error occurred."}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "32px",
              padding: "15px 32px",
              border: "none",
              borderRadius: "999px",
              background: "#00D27A",
              color: "#04130B",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
