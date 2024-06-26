import { Oval } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Categoria from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import CardCategorias from '../cardCategorias/CardCategorias';
import { useContext, useEffect, useState } from 'react';
import '../formularioCategoria/FormularioCategoria.css';
import './ListaCategoria.css';

function ListaCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        alert('O token expirou, favor logar novamente.')
        handleLogout()
      }
    }
  }

  async function buscarCategoriasNome() {
    try {
      await buscar(
        `/categorias/nome/${searchTerm}`,
        setCategorias,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente.");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado.');
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    if (searchTerm !== "") {
      buscarCategoriasNome();
    } else {
      buscarCategorias();
    }
  }, [searchTerm]);

  return (
<>

    <div className='flex flex-col justify-center items-center min-h-screen bg-nature'>

    <div className="flex flex-wrap justify-center items-center w-full gap-28">
    <input
  onChange={(e) => setSearchTerm(e.target.value)}
  className="border-2 border-slate-700 rounded p-2 w-3/4 lg:w-1/2 mt-16 sticky mb-4"
  placeholder="Pesquise a categoria aqui..."
/>
    
  </div>

      <div className="lg:mt-20 w-full flex flex-col lg:flex-row justify-around items-center">
        {/* Imagem à esquerda */}
        <div className="flex w-full lg:w-1/3 justify-start items-center mb-8 mt-8 lg:mt-0 lg:mb-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
            alt="Imagem 1"
            className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto flip-horizontal`}
            style={{ transform: "scaleX(-1)" }}
          />
        </div>
        {/* Conteúdo central */}
        <div className='flex flex-col justify-center mb-8 lg:mb-96'> {/* Adicionei uma margem superior menor aqui */}
          {categorias.length === 0 && (
            <div className='px-64'>
            <Oval
              visible={true}
              height="120"
              width="120"
              color="#4fa94d"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
</div>
          )}
          <div className="container flex flex-col justify-center items-center gap-12 mt-4 xl:mt-0 px-12"> {/* Ajustei a margem superior aqui também */}
            {categorias.map((categoria) => (
              <CardCategorias key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>
        {/* Imagem à direita */}
        <div className="flex w-full lg:w-1/3 justify-end items-center mb-8 mt-8 lg:mt-0 lg:mb-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
            alt="Imagem 2"
            className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto`}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default ListaCategorias;