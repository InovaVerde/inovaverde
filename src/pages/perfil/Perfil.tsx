import { useContext, useEffect } from "react";
import loginLogo from "../../assets/sustainability.jpg";
// import { buscar } from '../../services/Service'
import { useNavigate } from "react-router-dom";
// import UsuarioLogin from '../../models/UsuarioLogin';
import { AuthContext } from "../../contexts/AuthContext";
import Avatar from "../../components/avatar/Avatar.tsx";
import "./Perfil.css";

function Perfil() {
  const navigate = useNavigate();

  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    }
  }, [usuario.token]);

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="background">
      <div className="glass z-2 container mx-auto my-8 rounded-2xl overflow-hidden flex">
        <div className="my-5 mx-5 flex items-center justify-center z-[-1]">
          <div className="flex items-center flex-col gap-2">
            <div className="w-[10rem] h-[10rem] rounded-xl shadow-3xl ">
              <div className="h-full max-w-sm mx-auto w-30 lg:mx-0 relative -left-8 opacity-40 blur-xl bg-gradient-to-r from-yellow-400 via-green-700 to-green-600"></div>

              <img
                src={usuario.foto}
                alt="Foto integrante"
                className="w-full rounded-xl relative -top-[10rem] "
              />
            </div>

            <div className="flex justify-center items-center gap-2 text-lg text-center text-white">
              {usuario.usuario}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4 "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                ></path>
              </svg>
            </div>

            <div className="text-2xl text-center text-white font-semibold">
              {usuario.nome}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold"></div>
        <form className="flex justify-center items-center flex-col w-2/3 gap-3">
          <h2 className="text-slate-900 text-5xl">Informações</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">
              Nome<span className="red-star">*</span>
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.nome}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">
              Usuario<span className="red-star">*</span>
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="usuario@email.com"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.usuario}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.foto}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">
              Senha<span className="red-star">*</span>
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuario.senha}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">
              Confirmar Senha<span className="red-star">*</span>
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded p-2"
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2">
              Cancelar
            </button>
            <button
              className="rounded text-white bg-green-400 hover:bg-green-900 w-1/2 py-2"
              type="submit"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Perfil;
