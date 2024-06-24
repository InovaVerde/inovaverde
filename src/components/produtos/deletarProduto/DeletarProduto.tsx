import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import Produto from '../../../models/Produto'
import { buscar, deletar } from '../../../services/Service'
import { toastAlerta } from '../../../utils/toastAlerta'


function DeletarProduto() {
  const [produto, setProduto] = useState<Produto>({} as Produto)

  const navigate = useNavigate()

  const { id } = useParams<{ id: string }>()

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: {
          'Authorization': token
        }
      })
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlerta('O token expirou, favor logar novamente', 'info');
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      toastAlerta('Você precisa estar logado.', 'info');
      navigate('/login')
    }
  }, [token])

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function retornar() {
    navigate("/produtos")
  }

  async function deletarProduto() {
    try {
      await deletar(`/produtos/${id}`, {
        headers: {
          'Authorization': token
        }
      })

      toastAlerta('Produto apagado com sucesso.', 'sucesso');

    } catch (error) {
      toastAlerta('Erro ao apagar o produto.', 'erro');
    }

    retornar()
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-nature w-full'>
    <div className="lg:mt-20 w-full flex flex-col lg:flex-row justify-center items-center">

      {/* Imagem à esquerda */}
      <div className="flex w-full lg:w-1/3 justify-start items-center mb-8 mt-8 lg:mt-0 xl:mb-16">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
          alt="Imagem 1"
          className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto flip-horizontal`}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

    {/* Conteúdo central */}
    <div className="border-2 rounded-2xl overflow-hidden pb-12 xl:pb-6 mx-auto lg:min-w-[30vw] lg:max-w-[30vw] bg-white bg-opacity-40 min-w-[70vw] max-w-[70vw] lg:flex lg:flex-col lg:items-center lg:mx-6 border-black">
    <div className="container mx-auto">
      <div className="relative h-100 border-gray-300 rounded-lg w-full overflow-hidden">
        <header className='py-2 px-6 bg-red-700 text-white font-bold text-2xl justify-center text-center' style={{ fontFamily: 'Poppins, sans-serif' }}>
          Deletar Produto
          </header>
        <div className="w-full px-4">
          <div className="flex flex-col items-center justify-center text-center break-words">
          <img
                src="https://www.sindimetal.com.br/wp-content/uploads/2020/09/article.png"
                alt="card-image"
                className="w-full h-full object-cover rounded-lg"
              />
            <p className="text-xl font-sans font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}><span className="text-red-600">Deseja apagar o produto a seguir?</span></p>

            <div className="xl:flex xl:flex-grid">

            <div className="flex flex-col items-center justify-center xl:w-full lg:mt-12 xl:mt-8 xl:mr-5 3xl:mt-16">
    <h1 className="text-center text-blue-gray font-bold text-2xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
      Produto: <span className="text-yellow-900">{produto.nome}</span>
    </h1>
    <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-center lg:mt-6 font-bold">
      Preço: <span className="text-yellow-900 text-xl font-sans font-bold">R$ {produto.preco} </span>
    </p>
</div>
  <div className="flex justify-center items-center xl:flex xl:justify-end xl:items-end xl:mr-6">
    <img
      src={produto.foto}
      alt="card-image"
      className="w-[40vw] h-full mt-8 xl:w-[30vw] xl:h-3/4 object-cover rounded-lg lg:mt-8 lg:w-3/4 lg:h-3/4 2xl:mb-2"
    />
  </div>
</div>

          </div>
        </div>
        <div className="pt-10 pb-6 w-full px-4">
          <div className="flex flex-col xl:flex-row xl:gap-10 gap-4 items-center justify-center lg:mt-0 w-full mx-auto xl:pr-6 xl:pl-6">
          {usuario.id === 1 && (
            <button className='font-bold rounded-lg w-1/2 lg:w-3/4 lg:ml-0 h-12 bg-white text-lg border border-green-600 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300' onClick={retornar}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
            </button>
          )}
          {usuario.id === 1 && (
            <button className='font-bold rounded-lg w-1/2 lg:w-3/4 lg:mr-0 h-12 bg-white text-lg border border-red-600 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-transparent hover:scale-105 transition transform duration-300' onClick={deletarProduto}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Imagem à direita */}
  <div className="flex w-full lg:w-1/3 justify-end items-center mb-8 mt-8 lg:mt-0 xl:mb-16">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
              alt="Imagem 2"
              className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto`}
            />
          </div>
        </div>
      </div>
    );
}

export default DeletarProduto