import React, { useContext, useState } from 'react';
import { CarrinhoContext } from '../../contexts/CarrinhoContext';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { carrinho } = useContext(CarrinhoContext); // Use o hook useContext para acessar o carrinho

    const subtotal = carrinho.reduce((acc, produto) => acc + Number(produto.preco * produto.quantidadeCarrinho), 0);
    const somaCreditos = subtotal/10;
    const taxa = carrinho.length === 0 ? 0 : 6.00;
    
    const { usuario, setUsuario } = useContext(AuthContext);
    const token = usuario.token;
    const navigate = useNavigate();
    const { limparCarrinho } = useContext(CarrinhoContext);

    const compraFinalizadaPage = () => {
      navigate('/compraFinalizada');
    }

    const produtosPage = () => {
      navigate('/produtos');
    }

    const checkoutPage = () => {
      navigate('/checkout#');
    }

    // Adicione um estado para a opção de entrega
const [deliveryOption, setDeliveryOption] = useState(1);

// Calcule o frete com base na opção de entrega
const frete = carrinho.length === 0 ? 0 : deliveryOption === 1 ? 10.34 : 5.71;
const total = subtotal + frete + taxa;

// Atualize o estado quando uma opção de entrega for selecionada
const handleDeliveryOptionChange = (event) => {
  setDeliveryOption(Number(event.target.value));
};

    async function comprar() {
        const compraData = {
          userId: usuario.id,
          itensCompra: carrinho.map(item => ({
            produtoId: item.id,
            quantidade: item.quantidadeCarrinho
          }))
        };
      
        try {
          const response = await axios.post('http://localhost:8080/compras', compraData, {
            headers: {
              'Authorization': token
            }
          });
      
          // Atualizar o crédito de carbono do usuário
          const novoUsuario = {...usuario, creditoCarbono: usuario.creditoCarbono + somaCreditos}; // atualiza o crédito de carbono
      
          setUsuario(novoUsuario); // Atualiza o estado do usuário

          alert(`Compra realizada com sucesso! Você ganhou: ${somaCreditos.toFixed(2)} créditos`);

          limparCarrinho();

          compraFinalizadaPage();
      
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <>

<div className="bg-nature min-h-[80vh] pt-12 pb-12">
      <div className="container flex flex-col items-center mx-auto min-w-[10vw] max-w-[90vw] bg-white bg-opacity-70 pb-10 rounded-3xl">

      <div className="flex flex-col items-center border-b border-black xl:gap-36 2xl:gap-64 3xl:gap-96 py-10 xl:flex-row sm:px-10 lg:px-20 xl:px-32 lg:mb-10">
  <a href="#" className="text-2xl font-bold text-black pb-6 xl:pb-0">Finalização de compra</a>

  <div className="mt-10 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base md:flex md:items-center md:justify-center">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <button onClick={produtosPage}>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-green-400 text-xs font-semibold text-gray-700" onClick={produtosPage}
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg></a>
          <span className="font-semibold text-gray-700">Compra</span>
        </li>
        </button>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <button onClick={checkoutPage}>
  <li className="flex items-center space-x-3 text-left sm:space-x-4">
    <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">2</a>
    <span className="font-semibold text-black">Entrega</span>
  </li>
</button>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <button onClick={checkoutPage}>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white" href="#">X</a>
          <span className="font-semibold text-red-500">Pagamento (Desativado)!</span>
        </li>
        </button>
      </ul>
    </div>
  </div>


</div>
<div className="grid sm:px-10 xl:grid-cols-2 lg:px-20 xl:px-32 mb-8 2xl:gap-52 xl:gap-36 lg:gap-24 ">
  <div className="px-4">
    <p className="text-xl font-medium mt-10 lg:mt-0" style={{ fontFamily: 'Poppins, sans-serif' }}>Resumo do Pedido</p>
    <p className="text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>Verifique seus itens e selecione um método de envio adequado.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

    <div style={{ maxHeight: '305px', overflowY: 'auto' }}> {/* Adicione esta div */}
  {carrinho.map((produto, index) => {
    const subtotalProduto = Number(produto.preco * produto.quantidadeCarrinho);
    return (
      <div
        className={`flex flex-col bg-white sm:flex-row py-5 ${index < carrinho.length - 1 ? 'border-b' : ''}`}
        style={{ minHeight: '100px' }}
        key={produto.id}
      >
        <img className="m-2 min-h-24 w-28 rounded-md border object-cover object-center" style={{ maxHeight: '103.36px', minWidth: '139.14px', minHeight: '103.36px', maxWidth: '139.14px' }} src={produto.foto} alt={produto.nome} />
        <div className="flex w-full flex-col px-4 py-4 mt-4">
          <span className="font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>{produto.nome} (Qnt. {produto.quantidadeCarrinho})</span>
          <p className="text-lg font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>R$ {subtotalProduto.toFixed(2)}</p>
        </div>
      </div>
    )
  })}
</div> {/* Feche a div aqui */}

    </div>

<p className="mt-8 text-lg font-medium pt-4 xl:pt-12" style={{ fontFamily: 'Poppins, sans-serif' }}>Métodos de Envio</p>
<form className="mt-5 grid gap-4">
  <div className="relative">
  <input className="peer hidden" id="radio_1" type="radio" name="radio" value="1" onChange={handleDeliveryOptionChange} defaultChecked />
    <span className="peer-checked:border-gray-900 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label htmlFor="radio_1" className="peer-checked:bg-gray-200 peer-checked:font-bold bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
      <img className="w-14 object-contain" src="https://us1-photo.nextdoor.com/business_logo/11/ea/11ea2b40356b2676d19214811659831d.png" alt="Fedex Delivery" />
      <div className="ml-5">
        <span className="mt-2 font-semibold">Fedex Delivery</span>
        <p className="text-slate-500 text-sm leading-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Entrega: 2-4 dias úteis</p>
        <p className="text-slate-500 text-sm leading-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Preço do frete: 10.34 R$</p>
      </div>
      </label>
  </div>
  <div className="relative">
  <input className="peer hidden" id="radio_2" type="radio" name="radio" value="2" onChange={handleDeliveryOptionChange} />
    <span className="peer-checked:border-gray-900 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
    <label htmlFor="radio_2" className="peer-checked:bg-gray-200 peer-checked:font-bold bg-white flex cursor-pointer select-none rounded-lg border border-gray-300 p-4">
      <img className="w-14 object-contain" src="https://gowood.lv/wp-content/uploads/2020/11/sedex-logo.png" alt="Correios Delivery" />
      <div className="ml-5">
        <span className="mt-2 font-semibold">Sedex Delivery</span>
        <p className="text-slate-500 text-sm leading-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Entrega: 5-11 dias úteis</p>
        <p className="text-slate-500 text-sm leading-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Preço do frete: 5.71 R$</p>
      </div>
    </label>
  </div>
</form>


  </div>
  
  <div className="mt-10 lg:mt-0" style={{ height: '835px' }}>

    <p className="text-xl font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>Detalhes do pagamento</p>
    <p className="text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Conclua seu pedido fornecendo seus dados de pagamento.</p>
    <div className="bg-gray-50 rounded-lg px-8 pb-8 pt-4">

      <label className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="SeuEmail@gmail.com" disabled />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
      </div>

      <label className="mt-4 mb-2 block text-sm font-medium">Titular do cartão</label>
      <div className="relative">
        <input type="text" id="card-holder" name="card-holder" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="Digite o nome no cartão aqui" disabled />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
      </div>

      <label className="mt-4 mb-2 block text-sm font-medium">Detalhes do cartão</label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="xxxx-xxxx-xxxx-xxxx" disabled />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
              <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
            </svg>
          </div>
        </div>
        <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="MM/AA" disabled />
        <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="CVC" disabled />
      </div>

      <label className="mt-4 mb-2 block text-sm font-medium">Endereço de Cobrança</label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input type="text" id="billing-address" name="billing-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="Endereço para cobrança" disabled />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img className="h-4 w-4 object-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" alt="" />
          </div>
        </div>
        <select name="billing-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" disabled>
          <option value="State">Estado</option>
        </select>
        <input type="text" name="billing-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="CEP" disabled />
      </div>

      <label className="mt-4 mb-2 block text-sm font-medium">Endereço de Entrega</label>
<div className="flex flex-col sm:flex-row">
  <div className="relative flex-shrink-0 sm:w-7/12">
    <input type="text" id="delivery-address" name="delivery-address" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="Endereço de Entrega" disabled />
    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
      <img className="h-4 w-4 object-contain" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" alt="" />
    </div>
  </div>
  <select name="delivery-state" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" disabled>
    <option value="State">Estado</option>
  </select>
  <input type="text" name="delivery-zip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed opacity-50" placeholder="CEP" disabled />
</div>

      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">R$ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Frete</p>
          <p className="font-semibold text-gray-900">R$ {frete.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Taxa</p>
          <p className="font-semibold text-gray-900">R$ {taxa.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">R$ {total.toFixed(2)}</p>
      </div>
      <button className="mt-8 3xl:mt-8 w-full rounded-md bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-900 transition duration-200 ease-in-out hover:font-bold" onClick={comprar}>Finalizar compra</button>
    </div>
    
  </div>
</div>

</div>
    </div>

      </>
    );
}
export default Checkout;