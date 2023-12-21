import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
    });
    alert("Inscription réussite vous pouvez vous connecter !")
    window.location.href='/login'
    } catch (err) {
      alert("Merci de remplir les conditions !")
    }

    
    
    
  };
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">S'inscrire</h1>

        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="nom prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary my-4">Valider</button>

          <div className="text-center py-2 text-gray-500">
            Vous avez déjà un compte?{" "}
            <Link className="underline text-black" to={"/login"}>
              Se connecter{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
