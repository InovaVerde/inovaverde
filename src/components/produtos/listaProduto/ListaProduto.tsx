import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Produto from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProduto from "../cardProduto/CardProduto";
import Categoria from "../../../models/Categoria";
import { Pagination } from "@mui/material";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const maxSizePage = 2;

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado.");
      navigate("/");
    }
  }, [token]);

  async function buscarProdutos() {
    console.log('Iniciando a busca de produtos...');
    console.log(`Termo de pesquisa: ${searchTerm}`);
    console.log(`Categoria selecionada: ${selectedCategory}`);
    console.log(`Pagina: ${page - 1}`);
    console.log(`Tamanho máximo da pagina: ${maxSizePage}`);

    let url = `/produtos/pagina?page=${page - 1}&size=${maxSizePage}`;
    if (searchTerm || selectedCategory) {
        url = `/produtos/filtro?nome=${searchTerm}&categoria=${selectedCategory}`;
    }

    try {
        const response = await buscar(url, setProdutos, {
            headers: {
                Authorization: token,
            },
        });

        if (response && response.content) {
            setProdutos(response.content);
            setTotalPages(response.totalPages);
            setPage(response.pageable.pageNumber + 1); // Atualize a página atual
        } else if (response) {
            setProdutos(response);
            setTotalPages(1); // Apenas uma página de resultado de filtro
            setPage(1);
        } else {
            setProdutos([]);
            setTotalPages(0);
        }
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        if (error.toString().includes("403")) {
            alert("O token expirou, favor logar novamente.");
            handleLogout();
        }
    }
}

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado.");
      navigate("/");
    }
    buscarCategorias();
  }, [token]);

useEffect(() => {
    buscarProdutos();
}, [page, searchTerm, selectedCategory]);


  return (
    <>
      <div className="flex flex-wrap justify-center items-center w-full gap-28 mt-12">
<input
    onChange={(e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Resetar a página ao fazer nova busca
    }}
    className="border-2 border-slate-700 rounded-lg p-2 w-full md:w-1/2"
    placeholder="Procure por seu produto aqui..."
></input>
<select
    onChange={(e) => {
        setSelectedCategory(e.target.value);
        setPage(1); // Resetar a página ao fazer nova busca
    }}
    name="categoria"
    id="categoria"
    className="border p-2 border-slate-800 rounded w-full md:w-1/6"
>
    <option value="">Categorias</option>
    {categorias.map((categoria) => (
        <option key={categoria.id} value={categoria.nome}>
            {categoria.nome}
        </option>
    ))}
</select>
      </div>

      <div className="relative flex mb-40 w-screen justify-center items-center">
        {produtos.length === 0 && (
          <>
            <div className="flex flex-wrap justify-center items-center w-full gap-28 mt-36">
              <img src="https://cdn-icons-png.flaticon.com/512/1178/1178479.png" alt="Descrição da imagem"></img>
              <h1 className="" style={{ fontSize: "1.5em" }}>Nenhum produto foi encontrado!</h1>
            </div>
          </>
        )}
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center 3xl:grid-cols-4 2xl:mx-24 lg:mx-0 mx-16">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} post={produto} />
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </>
  );
}

export default ListaProdutos;