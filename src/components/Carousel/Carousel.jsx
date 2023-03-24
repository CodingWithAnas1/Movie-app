import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/data";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

export default function Carousel({ media_type, id }) {
  const [credits, setCredits] = useState();
  const items =
    credits &&
    credits.map((oneItem) => (
      <div className="carouselItem">
        <img
          src={
            oneItem.profile_path
              ? `${img_300}/${oneItem.profile_path}`
              : noPicture
          }
          alt={oneItem && oneItem.name}
          onDragStart={handleDragStart}
          className="carouselItem_image"
        />
        <b className="carouselItem_text">{oneItem?.name}</b>
      </div>
    ));
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 37,
    },
  };
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP__API_KEY}&language=en-US`
    );
    setCredits(data.cast);
  };
  useEffect(() => {
    fetchCredits();
  }, []);
  return (
    <AliceCarousel
      autoPlay
      responsive={responsive}
      infinite
      disableButtonsControls
      disableDotsControls
      mouseTracking
      items={items}
    />
  );
}
