import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddresseLink from "../components/AddresseLink";

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
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-2xl">{place.title}</h1>
      <AddresseLink>{place.address}</AddresseLink>
      <PlaceGallery place={place}/>
      <div className="mt-8 mb-4 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Arrivé : {place.checkIn}h <br />
          Départ : {place.checkOut}h <br />
          Voyageurs maximum : {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl mt-4">Extra info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
