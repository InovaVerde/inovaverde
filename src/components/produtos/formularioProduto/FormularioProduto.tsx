import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import Categoria from "../../../models/Categoria";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import './FormularioProduto.css';
import { toastAlerta } from "../../../utils/toastAlerta";

function FormularioProduto() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    subcategoria: "",
  });

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "", //titulo
    preco: 0, //texto
    descricao: "",
    estoque: 0,
    dataValidade: new Date(), //data
    foto: "",
    categoria: null,
    usuario: null,
    quantidadeCarrinho: 1,
  });

  async function buscarProdutoPorId(id: string) {
    await buscar(`/produtos/${id}`, setProduto, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function buscarCategorias() {
    await buscar("/categorias", setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      toastAlerta('Você precisa estar logado', 'info');
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
      console.log(categoria);
    }
  }, [id]);

  useEffect(() => {
    setProduto({
      ...produto,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
      categoria: categoria,
      usuario: usuario,
    });
  }

  function retornar() {
    navigate("/produtos");
  }

  async function gerarNovaProduto(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({ produto });

    if (id != undefined) {
      try {
        await atualizar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });
        toastAlerta('Produto atualizado com sucesso!', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlerta('Erro ao atualizar o produto.', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, produto, setProduto, {
          headers: {
            Authorization: token,
          },
        });

        toastAlerta('Produto cadastrado com sucesso!', 'sucesso');
        retornar();
      } catch (error: any) {
        if (error.toString().includes("403")) {
          toastAlerta('O token expirou, favor logar novamente', 'info');
          handleLogout();
        } else {
          toastAlerta('Erro ao cadastrar o produto.', 'erro');
        }
      }
    }
  }

  const carregandoCategoria = categoria.nome === "";

  return (
    <div className="bg-nature min-h-[80vh] pt-36 pb-36">
      <div className="container flex flex-col items-center mx-auto min-w-[10vw] max-w-[90vw] bg-white bg-opacity-40 pb-10 border-black border-2 rounded-3xl">
      <header className={`py-2 text-white font-bold text-2xl justify-center text-center w-full ${id !== undefined ? 'bg-yellow-500' : 'bg-green-600'}`} style={{borderTopLeftRadius: '22px', borderTopRightRadius: '22px', fontFamily: 'Poppins, sans-serif'}}>
    {id !== undefined ? "Editar Produto" : "Cadastre um novo produto"}
</header>
        <div className="w-full flex items-center justify-center mt-10">
          <form onSubmit={gerarNovaProduto} className="flex flex-col w-1/2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" style={{ fontFamily: 'Poppins, sans-serif' }}>Nome</label>
          <input
            value={produto.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Ex.: Tomate cereja"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" style={{ fontFamily: 'Poppins, sans-serif' }}>Preço R$</label>
          <input
            value={produto.preco}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Ex.: 20.43"
            name="preco"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Foto (Tenha a certeza de que é um link válido)
          </label>
          <input
            value={produto.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Ex.: https://nutritotal.com.br/publico-geral/wp-content/uploads/2019/12/shutterstock_375477457.jpg"
            name="foto"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="descricao" style={{ fontFamily: 'Poppins, sans-serif' }}>Descrição</label>
          <input
            value={produto.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Ex.: Tomatinho cereja é bom de se colocar nas saladas do dia a dia."
            name="descricao"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="titulo" style={{ fontFamily: 'Poppins, sans-serif' }}>Estoque</label>
          <input
            value={produto.estoque}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Ex.: 50"
            name="estoque"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <p style={{ fontFamily: 'Poppins, sans-serif' }}>Categoria do produto</p>
          <select
            name="categoria"
            id="categoria"
            className="border p-2 border-slate-800 rounded"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione a categoria
            </option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id}>{categoria.nome}</option>
              </>
            ))}
          </select>
        </div>
        <button
  disabled={carregandoCategoria}
  type="submit"
  className={`font-bold disabled:bg-gray-200 rounded-lg w-3/4 lg:w-1/2 mx-auto my-4 block py-2 h-12 text-lg border items-center justify-center hover:border-transparent hover:scale-105 transition transform duration-300 ${
    carregandoCategoria
      ? 'bg-white border-2 border-gray-400 text-gray-500 hover:bg-gray-300 hover:text-gray-300'
      : id !== undefined
        ? 'bg-white border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-600 hover:text-white'
        : 'bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
  }`}
  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
  {carregandoCategoria ? (
    <div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-400 animate-spin dark:text-gray-400 fill-gray-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Carregando...</span>
</div>
  ) : id !== undefined ? (
    <div className="flex justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
    </div>
  ) : (
    <div className="flex justify-center items-center">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
    </div>
  )}
</button>



      </form>
        </div>
      </div>
    </div>
  );
}

export default FormularioProduto;
