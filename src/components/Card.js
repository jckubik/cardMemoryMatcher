import '../css/Card.css';

const Card = ({ value, flipped, matched, index, handleFlip }) => {

  return (
    <div 
      className={`card-container ${matched ? "matched" : ""} `}
      style={{ background: flipped ? value : matched ? "" : "linear-gradient(109deg, red, white, red)" }}
      onClick={() => handleFlip(flipped, matched, index)}
    >
      <div>
      </div>
    </div>
  );
};

export default Card;