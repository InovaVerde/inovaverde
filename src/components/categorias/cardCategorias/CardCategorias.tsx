import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import categoriasImage from '../../../assets/categorias.png';

interface CardCategoriaProps {
  categoria: Categoria
}

function CardCategorias({categoria}: CardCategoriaProps) {
  const { usuario } = useContext(AuthContext);
  
return (
    <div className={`rounded-2xl overflow-hidden pb-12 xl:pb-6 mx-auto lg:min-w-[30vw] lg:max-w-[30vw] bg-white bg-opacity-40 min-w-[70vw] max-w-[70vw] lg:flex lg:flex-col lg:items-center border-2 border-black`}>
      <div className="w-full">
      <header className='py-2 px-6 mb-4 bg-yellow-900 text-white font-bold text-2xl justify-center text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>
          Deletar Categoria
          </header>
        <div className={`xl:grid xl:grid-cols-2 mb-4`}>
          <div className="flex justify-center xl:justify-start xl:pl-10 xl:mb-8 w-full mt-6">
            <img
              src={categoriasImage}
              alt="Imagem de Categorias"
              className="w-full h-auto max-w-[100px] max-h-[100px] object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full xl:text-right xl:items-end items-center text-center lg:pr-0 xl:pr-10 lg:mb-10 2xl:mb-0">
            <h2 className="xl:mt-8 mb-2 text-xl font-semibold w-full items-center text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Nome:<br></br><span className="text-yellow-800">{categoria.nome}</span></h2>
            <p className="mb-8 lg:mb-0 w-full items-center text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>Subcategoria: <span className="text-yellow-700">{categoria.subcategoria}</span></p>
          </div>
        </div>
      </div>
      <div className={`flex flex-col xl:flex-row xl:gap-10 gap-4 items-center justify-center lg:mt-0 w-full`}>
        {(usuario.id === 1) && (
          <Link to={`/editarCategoria/${categoria.id}`} className="font-bold rounded-lg w-1/2 xl:ml-6 xl:w-1/2 h-12 bg-white text-lg border border-yellow-500 text-yellow-500 flex items-center justify-center hover:bg-yellow-600 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
          </Link>
        )}
        {(usuario.id === 1) && (
          <Link to={`/deletarCategoria/${categoria.id}`} className="font-bold rounded-lg w-1/2 xl:mr-6 xl:w-1/2 h-12 bg-white text-lg border border-red-600 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </div>
  );


}

export default CardCategorias