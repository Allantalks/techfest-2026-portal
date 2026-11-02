import React, { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// PERFORMANCE OPTIMIZATION: Lazy Loading Images
// Images are loaded only when they enter the viewport using
// the Intersection Observer API. This dramatically reduces
// initial page load time and bandwidth usage.
// ============================================================

const LazyImage = ({ src, alt, style }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {/* Placeholder shown while image loads */}
      {!isLoaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #16213e, #0f3460)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#a0a0b0", fontSize: "0.85rem",
        }}>
          Loading...
        </div>
      )}
      {isVisible && (
        <img
          src={src}
          alt={alt}  /* Accessibility: descriptive alt text for Lighthouse */
          loading="lazy" /* Native lazy loading as fallback */
          onLoad={() => setIsLoaded(true)}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease",
          }}
        />
      )}
    </div>
  );
};

const Gallery = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "8px" }}>Gallery</h1>
      <p style={{ color: "#a0a0b0", marginBottom: "24px" }}>
        Highlights from TechFest events (images lazy-loaded for performance)
      </p>

      <div style={styles.grid}>
        {galleryItems.map((item, index) => (
          <div key={index} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <LazyImage
              src={item.src}
              alt={item.alt}
              style={{ height: "200px", borderRadius: "12px 12px 0 0" }}
            />
            <div style={{ padding: "16px" }}>
              <h3 style={{ marginBottom: "4px" }}>{item.title}</h3>
              <p style={{ color: "#a0a0b0", fontSize: "0.9rem" }}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Placeholder gallery items
const galleryItems = [
  { src: "https://via.placeholder.com/400x200/6c63ff/ffffff?text=Hackathon+2025", alt: "Students working at hackathon tables with laptops", title: "Hackathon 2025", description: "Teams competing in the 24-hour coding challenge" },
  { src: "https://via.placeholder.com/400x200/ff6584/ffffff?text=AI+Workshop", alt: "Workshop instructor demonstrating AI concepts on screen", title: "AI Workshop", description: "Hands-on machine learning session" },
  { src: "https://via.placeholder.com/400x200/00c853/ffffff?text=Robotics+Arena", alt: "Robots competing in arena during robotics competition", title: "Robotics Arena", description: "Battle bots competition finals" },
  { src: "https://via.placeholder.com/400x200/ffc107/333333?text=Keynote+Session", alt: "Speaker presenting keynote on stage with audience", title: "Keynote Session", description: "Industry expert sharing insights" },
  { src: "https://via.placeholder.com/400x200/e91e63/ffffff?text=Cultural+Night", alt: "Students performing on stage during cultural night", title: "Cultural Night", description: "Music and dance performances" },
  { src: "https://via.placeholder.com/400x200/2196f3/ffffff?text=Award+Ceremony", alt: "Winners receiving trophies at award ceremony", title: "Award Ceremony", description: "Celebrating the winners of TechFest" },
];

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
};

export default Gallery;
