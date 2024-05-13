import { useContext, useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardProduto/CardProduto";
import Categoria from "../../../models/Categoria";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado.");
      navigate("/");
    }
  }, [token]);

  async function buscarProdutos() {
    try {
      await buscar(
        `/produtos/filtro?nome=${searchTerm}&categoria=${selectedCategory}`,
        setProdutos,
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

  async function buscarCategorias() {
    await buscar("/categorias", setCategorias, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado.");
      navigate("/");
    }
    buscarCategorias(); // Adicione esta linha
  }, [token]);

  useEffect(() => {
    buscarProdutos();
  }, [produtos.length]);
  return (
    <>
      <div className="flex flex-wrap justify-center items-center w-full gap-28">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-slate-700 rounded p-2 w-full md:w-1/2"
        ></input>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="categoria"
          id="categoria"
          className="border p-2 border-slate-800 rounded w-full md:w-1/12"
        >
          <option value="">-- Categorias --</option>
          {categorias.map((categoria) => (
            <>
              <option value={categoria.nome}>{categoria.nome}</option>
            </>
          ))}
        </select>
        <button
          className="btn btn-primary bg-yellow-600 text-white rounded-lg w-44 h-9 py-0.5 text-center my-4 hover:bg-yellow-200 hover:text-yellow-900 md:w-1/24"
          onClick={buscarProdutos}
        >
          Pesquisar
        </button>
      </div>

      <div className="absolute flex mt-5 w-screen justify-center items-center">
        {produtos.length === 0 && (
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} post={produto} />
        ))}
      </div>
    </>
  );
}

export default ListaProdutos;
