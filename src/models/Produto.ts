import Categoria from './Categoria';
import Usuario from './Usuario';

export default interface Produto {
  quantidadeCarrinho: number;
  id: number;
  nome: string;
  preco: number; //pode errado (BIG DECIMAL)
  descricao: string;
  foto: string;
  estoque: number; //pode errado (INT)
  dataValidade: Date; //pode errado (DATE)
  categoria: Categoria | null;
  usuario: Usuario | null;
}