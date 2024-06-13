import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import homeLogo from "../../assets/logologo.svg";
import arara from "../../assets/arara.jpg";
import planta from "../../assets/sustainability.jpg";
import slide1 from "../../assets/slide1.png";
import slide2 from "../../assets/slide2.png";
import slide3 from "../../assets/slide3.png";
import slide4 from "../../assets/slide4.png";

function Home() {
  const { usuario } = useContext(AuthContext);

  return (
    <>
      <div className="relative h-96">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={5000}
          className="absolute inset-0 w-full h-full z-[-1]"
        >
          <div>
            <img
              src={slide1}
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={slide2}
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={slide3}
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img
              src={slide4}
              alt="Slide 4"
              className="w-full h-full object-cover"
            />
          </div>
        </Carousel>
        <div className="cor-fundo flex justify-center z-0 relative">
          <div className="flex flex-col gap-4 items-center justify-center py-4 text-white mt-40 bg-green-800 opacity-90 rounded-lg">
            <h2 className="text-5xl font-bold">Olá, {usuario.nome},</h2>
            <h3 className="text-5xl font-bold mx-6">
              você está na Inova Verde!
            </h3>
            <p className="text-xl">Do produtor sustentável para a sua casa.</p>

            <div className="flex justify-around gap-4">
              <Link to="/produtos" className="hover:underline">
                <button className="rounded bg-white text-green-800 py-2 px-4 hover:bg-green-500 hover:text-white">
                  Veja nossa loja
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-64">
        <section className="mt-8 z-10 relative">
          <div className="flex px-20 flex-row">
            <div className="text-justify mt-10 mr-20">
              <p>
                Queremos transformar o mundo em um lugar melhor, focando na
                sustentabilidade e inovação. Buscamos soluções criativas para os
                desafios ambientais, promovendo o consumo consciente e a
                preservação do meio ambiente.
              </p>
              <br />
              <p>
                Nossa meta é liderar a conscientização ambiental e fornecer
                produtos sustentáveis, impulsionando um futuro mais verde.
              </p>
              <br />
              <h5 className="font-bold font-serif text-blue-500">
                Nossos valores:{" "}
              </h5>
              <ol className="list-decimal pl-10">
                <li>
                  Sustentabilidade: Práticas ecológicas em todas as operações.
                </li>
                <li>Inovação: Soluções criativas para desafios ambientais.</li>
                <li>
                  Qualidade: Produtos agrícolas e naturais de alta qualidade.
                </li>
                <li>Consciência: Educar e inspirar escolhas conscientes.</li>
                <li>
                  Compromisso: Apoiar projetos ambientais com créditos de
                  carbono.
                </li>
                <li>
                  Colaboração: Parcerias com comunidades, organizações e
                  clientes.
                </li>
                <li>
                  Transparência: Comunicação aberta sobre práticas e impactos
                  ambientais.
                </li>
              </ol>
            </div>
            <div className="w-full relative">
              <h4 className="text-blue-900 font-serif text-2xl text-end font-bold">
                Nossa missão
              </h4>
              <img src={arara} alt="Arara" className="w-2/3 mt-2 ml-72 pl-20" />
            </div>
          </div>
        </section>
        <section className="mt-8 z-20">
          <div className="relative mt-20">
            <img
              src={planta}
              className="object-cover rounded-md z-0"
              alt="Planta"
            />
            <div className="absolute inset-0 bg-green-900 opacity-60 rounded-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-3xl font-bold opacity-100 text-center px-20">
                  Junte-se a nós na jornada rumo a um futuro mais verde e
                  sustentável. Vamos inovar juntos, preservando o planeta para
                  as gerações futuras!
                </h2>
              </div>
              <div className="absolute inset-0 flex items-end justify-center pb-80">
                <h1 className="text-white text-7xl font-bold opacity-100 text-center px-20">
                  Inova Verde
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
