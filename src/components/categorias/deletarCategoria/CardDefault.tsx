
import { buscar, deletar } from "../../../services/Service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
   
  export function CardDefault() {

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

    const navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente.')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado.')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/categorias")
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Categoria apagada com sucesso.')

        } catch (error) {
            alert('Erro ao apagar o Categoria')
        }

        retornar()
    }

    return (
      <div className="flex justify-center items-center">
        <div className="container mx-auto px-4 lg:mt-20">
          <div className="lg:h-auto w-full max-w-sm lg:max-w-lg xl:max-w-xl border border-black bg-white rounded-lg shadow-lg pt-10 pl-10 pr-10">
    
            <div className="relative h-100 border-2 border-gray-300 rounded-lg">
              <img
                src="https://thumbs.dreamstime.com/b/grunge-black-category-word-round-rubber-seal-stamp-white-background-171944878.jpg"
                alt="card-image"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="flex flex-col items-center justify-center text-center break-words">
                <h1 className="mb-4 mt-8 text-blue-gray font-bold text-2xl"> {/* Adicionei "text-2xl" para aumentar o tamanho da fonte */}
                  Categoria: <span className="text-red-500">{categoria.nome}</span>
                </h1>
                <p>
                  Subcategoria: <span className="text-red-500 text-xl font-sans">{categoria.subcategoria}*</span>
                </p>
              </div>
            </div>
            <div className="pt-10 pb-6">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                  className="font-bold rounded-lg w-full sm:w-1/2 h-10 bg-white text-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300"
                  onClick={retornar}>
                  Não
                </button>
                <button
                  className="font-bold rounded-lg w-full sm:w-1/2 h-10 bg-white text-lg border border-green-500 text-green-500 hover:bg-green-500 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300"
                  onClick={deletarCategoria}>
                  Sim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }