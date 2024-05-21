import { useContext, useEffect, useState } from "react";
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
          className="border-2 border-slate-700 rounded-lg p-2 w-full md:w-1/2"
        ></input>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="categoria"
          id="categoria"
          className="border p-2 border-slate-800 rounded w-full md:w-1/12"
        >
          <option value="">Categorias</option>
          {categorias.map((categoria) => (
            <>
              <option value={categoria.nome}>{categoria.nome}</option>
            </>
          ))}
        </select>
        <button
          className="btn btn-primary bg-green-600 text-white rounded-lg w-44 h-9 py-0.5 text-center my-4 hover:bg-green-200 hover:text-green-900 md:w-1/24"
          onClick={buscarProdutos}
        >
          Pesquisar
        </button>
      </div>

      <div className="absolute flex mt-5 w-screen justify-center items-center">
        {produtos.length === 0 && (
          <h1 style={{ fontSize: '1.5em' }}>Nenhum produto foi encontrado!</h1>
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
