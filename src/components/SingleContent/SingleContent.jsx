import React from "react";
import "./SingleContent.css";
import { img_300, unavailable } from "../../Config/data";
import { Badge } from "@mui/material";
import ContentModal from "../contentModal/ContentModal";

const SingleContent = ({
  title,
  poster,
  date,
  media_type,
  vote_average,
  id,
}) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge
        badgeContent={vote_average}
        color={vote_average < 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <b className="title">{title}</b>
      <span className="subtitle">
        {media_type === "tv" ? " TV Series" : " Movie"}
        <span>{date}</span>
      </span>
    </ContentModal>
  );
};

export default SingleContent;
