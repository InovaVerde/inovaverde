import Produto from '../../../models/Produto';
import { CarrinhoContext } from '../../../contexts/CarrinhoContext';
import { useContext } from 'react';


interface CardProdutoProps {
  post: Produto;
}

function CardProduto({ post }: CardProdutoProps): JSX.Element {
  const { carrinho, atualizarQuantidadeCarrinho } = useContext(CarrinhoContext);

  // Encontre o item correspondente no carrinho
  const itemCarrinho = carrinho.find(item => item.id === post.id);

  // Use a quantidade do carrinho, se disponível, ou padrão para 1
  const carrinhoQuantidade = itemCarrinho ? itemCarrinho.quantidadeCarrinho : 1;

  const totalProdutoUnico = carrinhoQuantidade * post.preco;

  const handleIncrease = () => {
    if (carrinhoQuantidade < post.estoque) {
      atualizarQuantidadeCarrinho(post.id, carrinhoQuantidade + 1);
      console.log(`Quantidade aumentada para ${carrinhoQuantidade + 1}`);
    }
  };

  const handleDecrease = () => {
    if (carrinhoQuantidade > 1) {
      atualizarQuantidadeCarrinho(post.id, carrinhoQuantidade - 1);
      console.log(`Quantidade diminuída para ${carrinhoQuantidade - 1}`);
    }
  };

  const { removerDoCarrinho } = useContext(CarrinhoContext); // Importe removerDoCarrinho do contexto

  const handleRemoveFromCart = () => {
    // Chame removerDoCarrinho para remover o item do carrinho
    removerDoCarrinho(post.id);
  };

  return (
    <div className="mb-10 border-b pb-8 border-green-200">
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 md:pl-3">
        <img
          src={post.foto}
          alt={post.nome}
          className="rounded-lg object-center object-cover"
          style={{ maxHeight: '103.36px', minWidth: '139.14px', minHeight: '103.36px', maxWidth: '139.14px' }}
        />
        <div className="flex items-center gap-4 mt-4 md:mt-0 md:ml-4">
          <button
            onClick={handleDecrease}
            className="flex items-center justify-center rounded-full bg-red-500 text-xl text-white h-6 w-6"
            style={{paddingBottom: '4px'}}
          >
            -
          </button>
          <input
            type="text"
            value={carrinhoQuantidade}
            readOnly
            className="border-2 text-center w-12 h-8"
          />
          <button
            onClick={handleIncrease}
            className="flex items-center justify-center rounded-full bg-blue-500 text-xl text-white h-6 w-6"
            style={{paddingBottom: '4px'}}
          >
            +
          </button>
        </div>
      </div>

      <div className="md:pl-3 pr-6">
        <div className="flex items-center justify-between w-full pt-6">
          <p className="text-base font-black leading-none text-gray-800">
            {post.nome}
          </p>
        </div>
        <p className="text-xs leading-3 text-gray-600 pt-2">
          {post.descricao}
        </p>

        <div className="flex items-center justify-between pt-5 pr-6 gap-8">
          <div className="flex items-center">
            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
              Adicionar aos favoritos
            </p>
            <p
              className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
              onClick={handleRemoveFromCart}
            >
              Remover
            </p>
          </div>
          <p className="text-base font-black leading-none text-gray-800">
            R$ {totalProdutoUnico.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;