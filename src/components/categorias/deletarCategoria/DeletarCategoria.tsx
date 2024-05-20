import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';
import Categoria from '../../../models/Categoria';
import { buscar } from '../../../services/Service';
import { CardDefault } from './CardDefault';
import '../formularioCategoria/FormularioCategoria.css';

function DeletarCategoria() {
    const [, setCategoria] = useState<Categoria>({} as Categoria);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente.');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado.');
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    return (
      <div className='flex flex-col justify-center items-center min-h-screen bg-nature w-full'>
        <div className="lg:mt-20 w-full flex flex-col lg:flex-row justify-center items-center">
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
          <div className='flex flex-col justify-center mb-8 lg:mb-96 md:items-center px-12'> {/* Adicionei uma margem superior menor aqui */}
            <CardDefault />
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
    );
}

export default DeletarCategoria;