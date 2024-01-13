import '../css/Card.css';

const Card = ({ value, flipped, matched, index, handleFlip }) => {
  

  return (
    <div 
      className={`card-container ${matched ? "matched" : ""}`}
      style={{ backgroundColor: flipped ? value : "" }}
      onClick={() => handleFlip(flipped, matched, index)}
    >
      <div>
      </div>
    </div>
  );
};

export default Card;