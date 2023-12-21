import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPages from "./PlacesPages";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profil";
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/login");
    setUser(null);
  };

  if (!ready) {
    return "Chargement...";
  }

  if (ready && !user && ! redirect) {
    return <Navigate to={"/login"} />;
  }

  const linkClasses = (type = null) => {
    let classes = "py-2 px-6";

    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className="w-full flex justify-center gap-2 mt-8 mt-4 mb-8">
        <Link className={linkClasses("profil")} to={"/account"}>
          Mon profil
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          Mes réservations
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          Mes hébergements
        </Link>
      </nav>

      {subpage === "profil" && (
        <div className="text-center max-w-lg mx-auto">
          Connecté en tant que {user.name} ( {user.email} )
          <button onClick={logout} className="primary max-w-sm mt-2">
            Se déconnecter
          </button>
        </div>
      )}
      {subpage === "places" && (
        <PlacesPages />
      )}
    </div>
  );
};

export default AccountPage;
