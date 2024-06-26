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
    <>
    <div className="mb-10 border-b pb-8 border-green-200">
    <div className="w-1/2 flex gap-4">

    <img
  src={post.foto} 
  alt={post.nome}
  className="rounded-lg object-center object-cover"
  style={{ maxHeight: '103.36px', minWidth: '139.14px', minHeight: '103.36px', maxWidth: '139.14px' }}
/>

<button 
  onClick={handleDecrease} 
  style={{ height: '20px', width: '20px', marginLeft: '80px', paddingBottom: '9px', marginTop: '91px' }}
  className='flex items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white ml-5'
>
  -
</button>

<input 
  type="text" 
  value={carrinhoQuantidade} 
  readOnly 
  style={{ textAlign: 'center', width: '40px', height: '24px', marginTop: '90px' }}
  className='border-2'
/>

<button 
  onClick={handleIncrease} 
  style={{ height: '20px', width: '20px', marginLeft: '4px', paddingBottom: '9px', marginTop: '91px'  }} // Adicione paddingBottom aqui
  className='flex items-center justify-center rounded-full bg-blue-500 p-2 text-xs text-white ml-5'
>
  +
</button>
      
  </div>

    <div className="md:pl-3 pr-10">
    <div className="flex items-center justify-between w-full pt-1">

      <p className="text-base font-black leading-none text-gray-800">
        {post.nome}
      </p>

    </div>
    <p className="text-xs leading-3 text-gray-600 pt-2">
      {post.descricao}
    </p>

    <div className="flex items-center justify-between pt-5 pr-6 gap-8">
      <div className="flex itemms-center">
        <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">
          Adicionar aos favoritos
        </p>
        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={handleRemoveFromCart}>
      Remover
    </p>
      </div>
      <p className="text-base font-black leading-none text-gray-800">
        R$ {totalProdutoUnico.toFixed(2)}
      </p>
    </div>
  </div>
  </div>
  </>
  );
}

export default CardProduto;