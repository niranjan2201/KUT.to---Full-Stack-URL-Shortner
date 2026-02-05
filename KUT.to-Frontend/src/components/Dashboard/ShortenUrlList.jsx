import React from "react";
import ShortenItem from "./ShortenItem";

const ShortenUrlList = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem
          key={item.id ?? item.shortUrl}
          {...item}
        />
      ))}
    </div>
  );
};

export default ShortenUrlList;
