import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import {Navigate} from 'react-router-dom';
import axios from "axios";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-md">
      <div className="text-2xl text-center">
        Prix : {place.price} € / par nuit
      </div>

      <div className="border shadow mt-4 rounded-md">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Arrivé :</label>
            <br />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Départ :</label> <br />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Nombre de voyageurs :</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
            min={1}
            max={place.maxGuests}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Nom :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              min={1}
              max={place.maxGuests}
            />
            <label>Mobile :</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              min={1}
              max={place.maxGuests}
            />
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        {numberOfNights > 0 ? (
          <>
            <span> {numberOfNights * place.price} €</span>
          </>
        ) : (
          "Sélectionner des dates"
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
