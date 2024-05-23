import React, { useState } from 'react';

interface IntegranteProps {
  name: string;
  usuarioGithub: string;
  usuarioLinkedin: string;
  foto: string;
  linkLinkedin: string;
  linkGithub: string;
}

const Integrantes: React.FC<IntegranteProps> = ({ name, usuarioGithub, usuarioLinkedin, foto, linkLinkedin, linkGithub }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-white shadow-lg transition-transform duration-300 ${expanded ? 'h-90' : 'h-70'} hover:shadow-xl transform hover:-translate-y-2`}
      onMouseEnter={handleToggleExpand}
      onMouseLeave={handleToggleExpand}
    >
      <img className="w-full h-48 object-cover object-center sm:h-56" src={foto} alt={name} />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
      </div>
      {expanded && (
        <div className="absolute bottom-0 left-0 right-0 bg-white py-2 px-4 flex flex-col items-start">
          <a
            href={linkGithub}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-2 text-black hover:text-gray-700 transition-transform transform hover:scale-105"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub"
              className="w-6 h-6 mr-2"
            />
            {usuarioGithub}
          </a>
          <a
            href={linkLinkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-black hover:text-gray-700 transition-transform transform hover:scale-105"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-6 h-6 mr-2"
            />
            @{usuarioLinkedin}
          </a>
        </div>
      )}
    </div>
  );
};

export default Integrantes;
