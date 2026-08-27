"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownMessage({ content }) {
  return (
    <div className="markdown-template" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#9FD23A", margin: "1.2rem 0 0.6rem", letterSpacing: "-0.01em" }}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 style={{ fontSize: "1.35rem", fontWeight: 600, color: "#9FD23A", borderBottom: "1px solid rgba(159,210,58,0.2)", paddingBottom: "0.4rem", margin: "1.2rem 0 0.6rem" }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "#F4EDE6", margin: "1rem 0 0.5rem" }}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ marginBottom: "0.85rem", opacity: 0.95 }}>{children}</p>
          ),
          ul: ({ children }) => (
            <ul style={{ paddingLeft: "1.2rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ paddingLeft: "1.4rem", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li style={{ listStyleType: "disc", color: "#9FD23A" }}>
              <span style={{ color: "#F4EDE6" }}>{children}</span>
            </li>
          ),
          strong: ({ children }) => (
            <strong style={{ color: "#9FD23A", fontWeight: 700 }}>{children}</strong>
          ),
          em: ({ children }) => (
            <em style={{ color: "rgba(244, 237, 230, 0.85)", fontStyle: "italic" }}>{children}</em>
          ),
          hr: () => (
            <hr style={{ border: "none", height: "1px", backgroundColor: "rgba(244, 237, 230, 0.15)", margin: "1.5rem 0" }} />
          ),
          blockquote: ({ children }) => (
            <blockquote style={{ borderLeft: "3px solid #9FD23A", paddingLeft: "1rem", margin: "1rem 0", color: "rgba(244, 237, 230, 0.85)", backgroundColor: "rgba(159, 210, 58, 0.05)", borderRadius: "0 8px 8px 0" }}>
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <code style={{ backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "0.2rem 0.4rem", borderRadius: "4px", fontSize: "0.9em", color: "#9FD23A", fontFamily: "monospace" }}>
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
