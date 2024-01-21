import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return "";
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-2xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
      >
        {place.address}
      </a>
      <div className="grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                className="aspect-square object-cover rounded-md"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.photos?.[0] && (
            <img
              className="aspect-square object-cover rounded-md"
              src={`http://localhost:4000/uploads/${place.photos[1]}`}
              alt=""
            />
          )}
          <div className="overflow-hidden">
            {place.photos?.[0] && (
              <img
                className=" relative top-2 aspect-square object-cover rounded-md"
                src={`http://localhost:4000/uploads/${place.photos[2]}`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
