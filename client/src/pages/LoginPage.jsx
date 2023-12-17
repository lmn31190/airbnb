import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const {setUser} = useContext(UserContext)
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
      try {
        const {data} = await axios.post(
          "/login",
          { email, password }
        );
        setUser(data)
        alert("Connexion réssite !");
        setRedirect(true);
      } catch (err) {
        alert("Verifiez vos informations !");
      }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Se connecter</h1>

        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
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
          <button className="primary">Valider</button>

          <div className="text-center py-2 text-gray-500">
            Vous n'avez pas encore de compte?{" "}
            <Link className="underline text-black" to={"/register"}>
              S'inscrire maintenant{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
