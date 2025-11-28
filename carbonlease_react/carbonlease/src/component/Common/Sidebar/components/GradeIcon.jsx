const GradeIcon = ({ grade }) => {
  const getIcon = (g) => {
    switch (g) {
      case "좋음": return "/images/Good.png";
      case "보통": return "/images/Normal.png";
      case "나쁨": return "/images/Bad.png";
      case "매우나쁨": return "/images/VeryBad.png";
      default: return "/images/No_Image.png";
    }
  };

  return <img src={getIcon(grade)} className="forecast-icon" alt={grade} />;
};

export default GradeIcon;