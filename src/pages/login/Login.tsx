import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario, navigate]);

  const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    });
  }

  const login = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/image.png')" }}>
      <form onSubmit={login} className="relative z-10 max-w-md w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-lg my-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Entrar</h2>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-gray-700 font-semibold mb-2">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="usuario@email.com"
          />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="senha" className="block text-gray-700 font-semibold mb-2">Senha</label>
          <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              name="senha"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Senha"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute top-0 right-0 px-3 py-2"
              aria-label={mostrarSenha ? "Esconder senha" : "Mostrar senha"}
            >
              <FontAwesomeIcon icon={mostrarSenha ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex justify-center items-center"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>Entrar</span>
          )}
        </button>
        <p className="mt-4 text-gray-700 text-base text-center">
          Não tem cadastro?{' '}
          <Link to="/cadastro" className="font-semibold text-green-600 hover:underline">Cadastre-se aqui</Link>.
        </p>
      </form>
    </div>
  );
}

export default Login;
