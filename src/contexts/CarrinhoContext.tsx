import React, { createContext, useContext, useEffect, useState } from 'react';
import Produto from '../models/Produto';
import { AuthContext } from './AuthContext';

type CarrinhoContextType = {
  carrinho: Produto[];
  setCarrinho: React.Dispatch<React.SetStateAction<Produto[]>>;
  adicionarAoCarrinho: (produto: Produto) => void;
  removerDoCarrinho: (idProduto: number) => void;
  atualizarQuantidadeCarrinho: (idProduto: number, novaQuantidade: number) => void;
  limparCarrinho: () => void;
};

export const CarrinhoContext = createContext<CarrinhoContextType>({
  carrinho: [],
  setCarrinho: () => {},
  adicionarAoCarrinho: () => {},
  removerDoCarrinho: () => {},
  atualizarQuantidadeCarrinho: () => {},
  limparCarrinho: () => {},
});

export function CarrinhoProvider({ children }) {

  const { usuario } = useContext(AuthContext); // Use o AuthContext para obter o usuário atual

  const limparCarrinho = () => {
    setCarrinho([]);
    sessionStorage.removeItem('carrinho');
  };
  
  const atualizarQuantidadeCarrinho = (idProduto, novaQuantidade) => {
    setCarrinho(carrinho.map(produto => 
      produto.id === idProduto ? { ...produto, quantidadeCarrinho: novaQuantidade } : produto
    ));
  };

  useEffect(() => {
    // Quando o usuário muda, limpa o carrinho
    if (usuario.id === 0) { // Verifique se o usuário está deslogado
      setCarrinho([]);
      sessionStorage.removeItem('carrinho');
    }
  }, [usuario]); // Adicione o usuário como dependência do useEffect

  const [carrinho, setCarrinho] = useState(() => {
    const carrinhoSalvo = sessionStorage.getItem('carrinho');
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
  });

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((carrinhoAtual) => {
      // Verifique se o produto já está no carrinho
      const produtoExistente = carrinhoAtual.find(item => item.id === produto.id);
  
      if (produtoExistente) {
        // Se o produto já estiver no carrinho, atualize a quantidade
        return carrinhoAtual.map(item =>
          item.id === produto.id ? { ...item, quantidadeCarrinho: item.quantidadeCarrinho + 1 } : item
        );
      } else {
        // Se o produto não estiver no carrinho, adicione-o com quantidade 1
        return [...carrinhoAtual, { ...produto, quantidadeCarrinho: 1 }];
      }
    });
  };
  

  const removerDoCarrinho = (idProduto) => {
    setCarrinho((carrinhoAtual) => {
      const novoCarrinho = carrinhoAtual.filter(produto => produto.id !== idProduto);
      sessionStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      return novoCarrinho;
    });
  };

  

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho, adicionarAoCarrinho, removerDoCarrinho, atualizarQuantidadeCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}