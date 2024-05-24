import React from 'react';
import sobre from '../../assets/sobre.jpg';

function Sobre() {
  return (
    <div className="container mx-auto py-10 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-4 flex flex-col items-center">
          <h4 className="text-green-800 font-serif text-2xl font-bold mb-4">Sobre a Inova Verde</h4>
          <img src={sobre} alt="E-commerce" className="rounded-md mt-2" />
        </div>
        <div className="p-4">

          <h4 className="text-xl font-semibold mt-4 text-green-600">O Que Fazemos</h4>
          <p className="mt-2 text-justify">
            Nosso e-commerce oferece uma ampla variedade de produtos agrícolas e naturais, cuidadosamente selecionados para garantir a sustentabilidade em todas as etapas. Acreditamos que cada escolha conta e incentivamos nossos clientes a fazerem compras conscientes.
          </p>

          <h4 className="text-xl font-semibold mt-4 text-green-600">Nossos Benefícios</h4>
          <p className="mt-2 text-justify">
            Ao comprar conosco, você adquire produtos excelentes e recebe cashback em créditos de carbono. Esses créditos podem ser usados para apoiar projetos ambientais ou para reduzir sua própria pegada de carbono.
          </p>

          <h4 className="text-xl font-semibold mt-4 text-green-600">Junte-se a Nós</h4>
          <p className="mt-2 text-justify">
            Participe da mudança. Faça suas compras de forma consciente e contribua para um futuro sustentável.
          </p>

          <hr className="my-4" />

          <h4 className="text-xl font-semibold text-green-600">Entre em Contato</h4>
          <p className="mt-2 text-justify">
            Se tiver dúvidas, estamos aqui para ajudar!
          </p>

          <hr className="my-4" />
        </div>
      </div>
    </div>
  );
}

export default Sobre;