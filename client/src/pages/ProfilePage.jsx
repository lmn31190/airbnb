import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPages from "./PlacesPages";
import AccountNav from "../components/AccountNav";

const ProfilePage = () => {
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

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

 

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />

      {subpage === "profil" && (
        <div className="text-center max-w-lg mx-auto">
          Connecté en tant que {user.name} ( {user.email} )
          <button onClick={logout} className="primary max-w-sm mt-2">
            Se déconnecter
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPages />}
    </div>
  );
};

export default ProfilePage;
