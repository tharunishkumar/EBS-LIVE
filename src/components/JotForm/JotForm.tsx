import { useEffect } from "react";

export default function JotformAgent() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jotfor.ms/agent/embedjs/019cb758ff1372d4b6cbe7ab2f43f2ff0e61/embed.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}