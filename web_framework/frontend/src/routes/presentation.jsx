import React, { useRef, useEffect, useState } from "react";
import { Carousel, Button } from "antd";
import "./presentation.css";
import phot from "../../images/blender/1.jpg";
import photo from "../../images/blender/2.jpg";
import photo0 from "../../images/blender/3.jpg";
import photo1 from "../../images/ansys/GeometryCapture.jpg";
import photo2 from "../../images/ansys/Capture.jpg";
import photo3 from "../../images/ansys/mesh_capture.jpg";
import photo4 from "../../images/ansys/udfCodeImage.jpg";
import photo5 from "../../images/ansys/난류모델.jpg";
import photo6 from "../../images/ansys/solution_general_setting.jpg";
import Video1 from "../../images/mesh movement_vrew.mp4";
import Video2 from "../../images/scaled velocity field_vrew.mp4";
import Video3 from "../../images/velocity field_vrew.mp4";

const mediaItems = [
  { type: "photo", src: phot },
  { type: "photo", src: photo },
  { type: "photo", src: photo0 },
  { type: "photo", src: photo1 },
  { type: "photo", src: photo2 },
  { type: "photo", src: photo3 },
  { type: "photo", src: photo4 },
  { type: "photo", src: photo5 },
  { type: "photo", src: photo6 },
  { type: "video", src: Video1 },
  { type: "video", src: Video2 },
  { type: "video", src: Video3 },
];

const PresentationPage = () => {
  const carouselRef = useRef(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!carouselRef.current) return;
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        carouselRef.current.next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        carouselRef.current.prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.next();
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleVideoEnd = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className="presentation-container">
      <Carousel autoplay={false} ref={carouselRef}>
        {mediaItems.map((item, index) => (
          <div key={index} className="slide">
            {item.type === "video" ? (
              <video autoPlay controls className="media-content" onEnded={handleVideoEnd}>
                <source src={item.src} type="video/mp4" />
              </video>
            ) : (
              <img src={item.src} alt={`Slide ${index}`} className="media-content" />
            )}
          </div>
        ))}
      </Carousel>
      <Button
        className="autoplay-button"
        onClick={() => setIsAutoPlay(!isAutoPlay)}
      >
        {isAutoPlay ? "연속 재생 모드 해제" : "연속 재생 모드"}
      </Button>
    </div>
  );
};

export default PresentationPage;
