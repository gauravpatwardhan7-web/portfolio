"use client";

import { useState } from "react";

export default function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [activated, setActivated] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-full"
      style={{ paddingBottom: "56.25%" /* 16:9 */, background: "#000" }}
    >
      {activated ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
          style={{ border: "none" }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 w-full h-full"
          style={{ border: "none", padding: 0, cursor: "pointer", background: "transparent" }}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            onError={(e) => {
              e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
            }}
            alt={title}
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover" }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.15)" }}
          >
            <span
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: hover ? "var(--accent)" : "rgba(0,0,0,0.65)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.15s ease, transform 0.15s ease",
                transform: hover ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                  borderLeft: "18px solid #fff",
                  marginLeft: 4,
                }}
              />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
