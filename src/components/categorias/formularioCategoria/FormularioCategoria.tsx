import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Categoria from '../../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { useState, useContext, useEffect, ChangeEvent } from 'react';
import './FormularioCategoria.css';

function FormularioCategoria() {
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        'Authorization': token
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })

    console.log(JSON.stringify(categoria))
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        alert('Categoria atualizada com sucesso!')
        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente.')
          handleLogout()
        } else {
          alert('Erro ao atualizar a categoria.')
          console.log(error)
        }

      }

    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: {
            'Authorization': token
          }
        })

        alert('Categoria cadastrada com sucesso!')

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente.')
          handleLogout()
        } else {
          alert('Erro ao cadastrar a categoria.')
        }
      }
    }

    retornar()
  }

  function retornar() {
    navigate("/categorias")
  }

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado.');
      navigate('/login');
    }
  }, [token]);

  return (
    <div className="bg-nature min-h-[80vh] pt-36 pb-36">
      <div className="container flex flex-col items-center mx-auto min-w-[10vw] max-w-[90vw] px-10 bg-white bg-opacity-40 pb-10 border-black border-2 rounded-3xl">
        <h1 className="text-4xl text-center my-1 mt-4 text-yellow-900 font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {id === undefined ? 'Cadastrar uma categoria' : 'Editar a categoria'}
        </h1>
        <div className="w-full flex items-center justify-center">
          <form className="w-full flex flex-col gap-16 items-center justify-center mt-4" onSubmit={gerarNovaCategoria}>
            <div className="flex flex-col gap-12 lg:gap-20 w-full lg:flex-row">
              <div className="flex flex-col w-full lg:w-3/4">
                <label htmlFor="nome" style={{ fontFamily: 'Poppins, sans-serif' }} className='mt-4 text-black'>Nome</label>
                <input
                  type="text"
                  placeholder="Ex.: Produtos orgânicos e sustentáveis"
                  name="nome"
                  className="border-2 border-slate-700 rounded p-2 h-24 sm:h-20 md:h-16 lg:h-14 xl:h-12 2xl:h-10.5 w-full"
                  value={categoria.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
                <label htmlFor="subcategoria" style={{ fontFamily: 'Poppins, sans-serif' }} className='mt-4 text-black'>Subcategoria</label>
                <input
                  type="text"
                  placeholder="Ex.: Frutas e vegetais orgânicos"
                  name="subcategoria"
                  className="border-2 border-slate-700 rounded p-2 h-24 sm:h-20 md:h-16 lg:h-14 xl:h-12 2xl:h-10.5 w-full"
                  value={categoria.subcategoria}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                />
              </div>
              <div className="flex flex-col w-full lg:w-1/6 justify-center items-center lg:mt-8">
                <button
                  className={`font-bold rounded-lg w-24 h-24 bg-white text-lg border flex items-center justify-center hover:border-transparent hover:scale-105 transition transform duration-300 ${
                    id === undefined
                      ? 'border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white'
                      : 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white'
                  }`}
                  type="submit"
                >
                  {id === undefined ? (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      
      ) : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>)}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default FormularioCategoria;