import React from 'react';
import sobre from '../../assets/comprafinalizada.png';
import { useNavigate } from 'react-router-dom';




function CompraFinalizada() {

    const navigate = useNavigate();
    
    const lojaPage = () => {
        navigate('/produtos');
      }

    return (
        <>
            <div className="bg-nature min-h-[80vh] pt-12 pb-12 w-full flex flex-col lg:flex-row justify-center items-center">

      {/* Imagem à esquerda */}
      <div className="flex w-full lg:w-1/3 justify-start items-center mb-8 mt-8 lg:mt-0 xl:mb-16">
        <img
          src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
          alt="Imagem 1"
          className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto flip-horizontal`}
          style={{ transform: "scaleX(-1)" }}
        />
      </div>

{/* Conteúdo central */}
<div className="mt-10 container flex flex-col items-center mx-auto min-w-[10vw] max-w-[90vw] 2xl:max-w-[40vw] xl:max-w-[60vw] lg:max-w-[80vw] bg-white bg-opacity-70 pb-10 rounded-3xl border-2 border-black" style={{ textAlign: 'center' }}>
    <h1 className="text-3xl font-bold mt-10" style={{ fontFamily: 'Poppins, sans-serif' }}><span className="text-green-600">Compra Finalizada com Sucesso!</span></h1>
    <p className="text-xl mt-5" style={{ fontFamily: 'Poppins, sans-serif' }}>Obrigado pela sua compra e volte sempre!</p>
    <img className="mt-10 max-h-72 max-w-72" src={sobre} alt="Compra finalizada com sucesso" />
            <p className="underline text-red-500 cursor-pointer mt-12" onClick={lojaPage}>
            {'<<<'} voltar para a loja
    </p>
</div>

             {/* Imagem à direita */}
  <div className="flex w-full lg:w-1/3 justify-end items-center mb-8 mt-8 lg:mt-0 xl:mb-16">
            <img
              src="https://static.vecteezy.com/system/resources/previews/019/053/688/original/blue-macaw-illustration-png.png"
              alt="Imagem 2"
              className={`${window.innerWidth < 1024 ? 'w-1/4 mb-8 mt-8' : 'w-1/2'} lg:w-auto h-auto`}
            />
          </div>     

            </div>
        </>
    );
}

export default CompraFinalizada;