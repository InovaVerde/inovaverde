import React, { ChangeEvent, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState({
    usuario: '',
    senha: ''
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioLogin((prevUsuarioLogin) => ({
      ...prevUsuarioLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode chamar a função handleLogin passando usuarioLogin
    // handleLogin(usuarioLogin);
    // Após o login, você pode redirecionar o usuário para a página desejada
    navigate('/home');
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/image.png')" }}
      />
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-lg my-8 z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Entrar</h2>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-gray-700 font-semibold mb-2">
            Usuário<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuarioLogin.usuario}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="usuario@email.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block text-gray-700 font-semibold mb-2">
            Senha<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              id="senha"
              name="senha"
              value={usuarioLogin.senha}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Senha"
              aria-describedby="senha-feedback"
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
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Entrar
        </button>
        <p className="mt-4 text-gray-700 text-base text-center">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="font-semibold text-green-600 hover:underline">
            Cadastre-se
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;

