import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../contexts/AuthContext'
import Categoria from '../../../models/Categoria'
import { buscar } from '../../../services/Service'
import { CardDefault } from './CardDefault'

function DeletarCategoria() {
    const [, setCategoria] = useState<Categoria>({} as Categoria)

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
    
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-emerald-500 to-emerald-700 relative z-[-1]'>
          <div className="md:mt-20 w-full flex flex-col md:flex-row justify-around items-center">
            {/* Imagem à esquerda */}
            <div className="flex w-full md:w-1/3 justify-start items-center">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
                alt="Imagem 1"
                className={`${window.innerWidth < 768 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} md:w-auto h-auto flip-horizontal`}
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
      
            {/* Conteúdo central */}
            <div className={`flex flex-col items-center w-full md:w-1/3 z-10 ${window.innerWidth < 768 ? '' : ''}`}>
              <CardDefault />
            </div>
      
            {/* Imagem à direita */}
            <div className="flex w-full md:w-1/3 justify-end items-center md:mb-0">
              <img
                src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
                alt="Imagem 2"
                className={`${window.innerWidth < 768 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} md:w-auto h-auto`}
              />
            </div>
          </div>
        </div>
      )
      
      
      
}

export default DeletarCategoria