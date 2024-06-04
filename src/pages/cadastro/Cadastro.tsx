import React, { ChangeEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cadastro: React.FC = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
    confirmarSenha: '',
  });

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const [senhaValida, setSenhaValida] = useState(false);
  const [confirmarSenhaValida, setConfirmarSenhaValida] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));

    if (name === 'senha') {
      const isValid = value.length >= 8;
      setSenhaValida(isValid);
      setConfirmarSenhaValida(value === usuario.confirmarSenha);
    } else if (name === 'confirmarSenha') {
      setConfirmarSenhaValida(value === usuario.senha);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsuario({
      nome: '',
      usuario: '',
      foto: '',
      senha: '',
      confirmarSenha: '',
    });
    setSenhaValida(false);
    setConfirmarSenhaValida(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/cadastro.jpg')" }}
      />
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white bg-opacity-80 p-8 rounded-lg shadow-lg my-8 z-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Cadastro</h2>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-semibold mb-2">
            Nome<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={usuario.nome}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Nome"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="usuario" className="block text-gray-700 font-semibold mb-2">
            Usuário<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario.usuario}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="usuario@email.com"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="foto" className="block text-gray-700 font-semibold mb-2">
            Foto
          </label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={usuario.foto}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
            placeholder="Foto"
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
              value={usuario.senha}
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
          {usuario.senha && (
            <div id="senha-feedback" className="text-sm mt-1" aria-live="polite">
              {senhaValida ? (
                <span className="text-green-500">✓ Senha válida</span>
              ) : (
                <span className="text-red-500">✘ Mínimo 8 caracteres</span>
              )}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmarSenha" className="block text-gray-700 font-semibold mb-2">
            Confirmar Senha<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={mostrarConfirmarSenha ? 'text' : 'password'}
              id="confirmarSenha"
              name="confirmarSenha"
              value={usuario.confirmarSenha}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-500 focus:border-blue-500 focus:outline-none"
              placeholder="Confirmar Senha"
              aria-describedby="confirmar-senha-feedback"
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
              className="absolute top-0 right-0 px-3 py-2"
              aria-label={mostrarConfirmarSenha ? "Esconder confirmação de senha" : "Mostrar confirmação de senha"}
            >
              <FontAwesomeIcon icon={mostrarConfirmarSenha ? faEye : faEyeSlash} />
            </button>
          </div>
          {usuario.confirmarSenha && (
            <div id="confirmar-senha-feedback" className="text-sm mt-1" aria-live="polite">
              {confirmarSenhaValida ? (
                <span className="text-green-500">✓ Senha confirmada</span>
              ) : (
                <span className="text-red-500">✘ Senhas não coincidem</span>
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          disabled={!senhaValida || !confirmarSenhaValida}
        >
          Cadastrar
        </button>
        <p className="mt-4 text-gray-700 text-base text-center">
          Já tem cadastro?{' '}
          <Link to="/login" className="font-semibold text-green-600 hover:underline">
            Faça login aqui
          </Link>
          .
        </p>
      </form>
    </div>
  );
};

export default Cadastro;