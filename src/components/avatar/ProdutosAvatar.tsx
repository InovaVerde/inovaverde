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
        className={`rounded-t-lg min-h-60 max-h-60`}
      />
    );
  };
  
  export default ProdutosAvatar;