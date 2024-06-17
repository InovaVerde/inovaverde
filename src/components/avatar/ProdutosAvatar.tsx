interface ProdutosAvatarProps {
    foto?: string;
  }
  
  const ProdutosAvatar = ({ foto }: ProdutosAvatarProps) => {
    const defaultImage = "https://grafgearboxes.com/productos/images/df.jpg";
    
    const imageUrl = (foto && foto.trim() !== "") ? foto : defaultImage;
  
    return (
      <img
        src={imageUrl}
        alt="Produto"
        className={`rounded-t-lg w-full h-full`}
        style={{ minWidth: '100%', maxHeight: '200px', objectFit: 'fill', minHeight: '200px' }}
      />
    );
  };
  
  export default ProdutosAvatar;