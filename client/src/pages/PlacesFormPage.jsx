import { useState } from "react";
import Perks from "../components/Perks";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate } from "react-router-dom";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const inputHeader = (text) => {
    return <h2 className="text-xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-gray-400 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addNewPlace = async (e) => {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    await axios.post("/places", placeData);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  return (
    <div>
      <AccountNav />

      <form onSubmit={addNewPlace}>
        {preInput("Titre", "Titre pour votre hébergement")}
        <input
          type="text"
          placeholder="Appartement 50m² centre ville"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {preInput("Adresse", "Adresse de votre hébergement")}
        <input
          type="text"
          placeholder="124 rue Chinatown"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {preInput("Photos", "Présentez votre héberment en image")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {preInput("Description", "Description de l'hébergement")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {preInput("Avantages", "Sélectionnez les details de votre hébergement")}
        <div className="grid mt-5 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Infos supplémentaires", "Règles...")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        {preInput(
          "Arrivé & Départ, invités maximum",
          "Ajouter une heure d'arriver et de départ, n'oubliez pas de garder un moment afin de nettoyer le logement entre deux réservations"
        )}
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <h3 className="mt-2 -mb-1">Arrivé</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="14:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Départ</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              placeholder="17:00"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Voyageurs maximums</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
            />
          </div>
        </div>
          <button className="primary my-4">Valider</button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
