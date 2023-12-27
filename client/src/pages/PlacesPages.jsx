import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPages = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    await axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ajouter un hébergement
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={"Ajouter avec un lien ....jpg"}
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 grow px-4 rounded-2xl hover:bg-primary hover:text-white"
              >
                Ajouter
              </button>
            </div>
            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      className="rounded-2xl border w-full object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                      alt=""
                    />
                  </div>
                ))}
              <label
                className="h-32 flex cursor-pointer gap-1 items-center justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600"
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Ajouter
              </label>
            </div>

            {preInput("Description", "Description de l'hébergement")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {preInput(
              "Avantages",
              "Sélectionnez les details de votre hébergement"
            )}
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
            <div>
              <button className="primary my-4">Valider</button>
            </div>
          </form>
        </div>
      )}
      places
    </div>
  );
};

export default PlacesPages;
