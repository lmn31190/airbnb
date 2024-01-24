import React from "react";

const BookingWidget = ( {place}) => {
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
            <input type="date" />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Départ :</label> <br />
            <input type="date" />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Nombre de voyageurs :</label>
          <br />
          <input type="number"  min={1} max={place.maxGuests}/>
        </div>
      </div>
      <button className="primary mt-4">Réserver</button>
    </div>
  );
};

export default BookingWidget;
