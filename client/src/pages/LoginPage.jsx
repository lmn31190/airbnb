import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Se connecter</h1>
        <form className="max-w-md mx-auto">
          <input type="email" placeholder="email@email.com" />
          <input type="password" placeholder="mot de passe" />
          <button className="primary">Valider</button>
          <div className="text-center py-2 text-gray-500">
            Vous n'avez pas encore de compte?{" "}
            <Link className="underline text-black" to={"/register"}>S'inscrire maintenant </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
