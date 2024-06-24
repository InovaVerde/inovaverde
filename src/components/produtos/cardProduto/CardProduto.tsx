import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { CarrinhoContext } from "../../../contexts/CarrinhoContext"; // Importe o contexto do carrinho
import Produto from "../../../models/Produto";
import ProdutosAvatar from "../../avatar/ProdutosAvatar";
import { toastAlerta } from "../../../utils/toastAlerta";

interface CardProdutoProps {
  post: Produto;
}

function CardProduto({ post }: CardProdutoProps): JSX.Element {
  const { usuario } = useContext(AuthContext);
  const { carrinho, adicionarAoCarrinho } = useContext(CarrinhoContext); // Use o contexto do carrinho

  const estoqueProduto = Math.floor(post.estoque);

  const handleAddToCart = () => {
    // Verifica se o produto já está no carrinho
    const isInCarrinho = carrinho.some((produto) => produto.id === post.id);

    if (isInCarrinho) {
      // Se o produto já está no carrinho, exibe um alerta
      toastAlerta('Este item já está no carrinho!', 'info');
    } else {
      // Define a quantidade do produto no carrinho
      post.quantidadeCarrinho = 1;
      // Se o produto não está no carrinho, adiciona ao carrinho e atualiza o estado
      adicionarAoCarrinho(post);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card card-compact w-80 bg-green-800 shadow-xl rounded-lg" style={{ position: 'relative', minHeight: '472px'}}>
      <figure style={{ maxWidth: '457.33px', maxHeight: '320px' }}>
        <ProdutosAvatar foto={post.foto}/>
      </figure>
      <div className="card-body ml-3">
      <div style={{ height: '70px', overflow: 'hidden'}}>
        <p className="card-title text-2xl font-semibold text-white">
          {post.nome}
        </p>
      </div>
      <div style={{ height: '100px',}}>
        <p className="font-bold text-green-100">R$ {post.preco}</p>
        <p className="text-green-50 text-sm">
          Estoque disponível: {estoqueProduto}
        </p>
        <p className="text-green-50 text-sm">
  <div style={{ display: 'inline-block' }}>
    {isExpanded || post.descricao.length <= 45 ? post.descricao : `${post.descricao.substring(0, 45)}... `}
  </div>
  {post.descricao.length > 45 && (
    <div style={{ display: 'inline-block' }}>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Ver menos' : 'Ver mais'}
      </button>
    </div>
  )}
</p>
      </div>
        <div className="card-actions" style={{ width: '100%' }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "10px",
              paddingTop: "0px",
              paddingBottom: "0px",
              paddingLeft: "60px",
              paddingRight: "0px",
            }}
          >
            <button
              onClick={handleAddToCart}
              className="btn btn-primary bg-yellow-600 text-white rounded-lg w-44 h-9 py-0.5 text-center my-4 hover:bg-yellow-200 hover:text-yellow-900"
            >
              Adicionar ao carrinho
            </button>
          </div>
          <div className="flex -ml-3 gap-16">
            {usuario.id === 1 && (
              <Link
                to={`/editarProduto/${post.id}`}
                className="w-full text-white bg-green-600 hover:bg-green-700 flex items-center justify-center py-2 rounded-bl-lg"
              >
                <button>Editar</button>
              </Link>
            )}
            {usuario.id === 1 && (
              <Link
                to={`/deletarProduto/${post.id}`}
                className="text-white bg-red-600 hover:bg-red-700 w-full flex items-center justify-center rounded-br-lg"
              >
                <button>Deletar</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default CardProduto;
