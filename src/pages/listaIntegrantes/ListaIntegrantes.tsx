import React from 'react';
import Integrantes from '../../components/integrantes/Integrantes';

const integrantes = [
  { name: "Asttryd Pacheco", usuarioGithub: "@Asttryd", usuarioLinkedin: "asttryd-pacheco", foto: "https://avatars.githubusercontent.com/u/95387263?v=4", linkLinkedin: "https://www.linkedin.com/in/asttryd-pacheco/", linkGithub: "https://github.com/Asttryd" },
  { name: "Dafne Duda", usuarioGithub: "@dafneduda", usuarioLinkedin: "dafneduda", foto: "https://avatars.githubusercontent.com/u/147463270?v=4", linkLinkedin: "https://www.linkedin.com/in/dafneduda/", linkGithub: "https://github.com/dafneduda" },
  { name: "Douglas Papani", usuarioGithub: "@douglasppn", usuarioLinkedin: "douglas-papani", foto: "https://avatars.githubusercontent.com/u/19985517?v=4", linkLinkedin: "https://linkedin.com/in/douglas-papani/", linkGithub: "https://github.com/douglasppn" },
  { name: "Gabriel Vieira", usuarioGithub: "@GabrielVieiraz9", usuarioLinkedin: "gabriel-vieira-z9", foto: "https://avatars.githubusercontent.com/u/147213232?v=4 ", linkLinkedin: "https://www.linkedin.com/in/gabriel-vieira-z9/", linkGithub: "https://github.com/GabrielVieiraz9" },
  { name: "Guilherme Moura", usuarioGithub: "@gumeeee", usuarioLinkedin: "guilherme-moura-13a991259", foto: "https://avatars.githubusercontent.com/u/124413755?v=4", linkLinkedin: "https://www.linkedin.com/in/guilherme-moura-13a991259/", linkGithub: "https://github.com/gumeeee" },
  { name: "Millena Oliveira", usuarioGithub: "@MillenaOliveiraSouza", usuarioLinkedin: "millena-oliveira-souza", foto: "https://avatars.githubusercontent.com/u/91639335?v=4", linkLinkedin: "https://www.linkedin.com/in/millena-oliveira-souza/", linkGithub: "https://github.com/MillenaOliveiraSouza" },
  { name: "Rodrigo Rodrigues", usuarioGithub: "@ddigo99", usuarioLinkedin: "dev-rodrigo-rodrigues", foto: "https://avatars.githubusercontent.com/u/157827964?v=4", linkLinkedin: "https://www.linkedin.com/in/dev-rodrigo-rodrigues/", linkGithub: "https://github.com/ddigo99" }
];

const ListaIntegrantes: React.FC = () => {
  return (
    <div style={{ backgroundImage: `url('/bgIntegrantes.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-12">Conheça os Desenvolvedores do Inova Verde</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {integrantes.map((integrante) => (
            <Integrantes key={integrante.name} {...integrante} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaIntegrantes;
