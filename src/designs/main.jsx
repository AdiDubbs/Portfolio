import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { designs, galleryFonts } from "./registry";
import Gallery from "./Gallery";
import Switcher from "./Switcher";
import "./shell.css";

function useFonts(hrefs) {
  const key = hrefs.join(" ");
  useEffect(() => {
    key.split(" ").forEach((href) => {
      if (document.querySelector(`link[href="${href}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });
  }, [key]);
}

const currentId = () => window.location.hash.replace("#", "");

function Root() {
  const [id, setId] = useState(currentId);
  const index = designs.findIndex((d) => d.id === id);
  const design = designs[index];

  useEffect(() => {
    const onHash = () => setId(currentId());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.background = design ? design.bg : "";
    document.title = design ? `${design.name} · Portfolio Directions` : "Ten Portfolio Directions";
  }, [design]);

  // The gallery previews every direction's display face, so it loads them all
  useFonts(design ? [galleryFonts, design.fonts] : [galleryFonts, ...designs.map((d) => d.fonts)]);

  if (!design) return <Gallery designs={designs} />;

  const Design = design.component;
  return (
    <>
      <Design key={design.id} />
      <Switcher designs={designs} index={index} />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
