import propTypes from "prop-types";
// import { FaStar } from "react-icons/fa";

// function RatingStar({ rating }) {
//   return (
//     <div className="flex gap-0.5">
//       {Array.from({ length: rating }, (_, index) => (
//         <FaStar key={index} />
//       ))}
//     </div>
//   );
// }

import { AiFillStar } from "react-icons/ai";

function RatingStar({ rating }) {
  return (
    <div className="flex">
      {rating > 0 ? (
        Array.from({ length: rating }, (_, i) => <AiFillStar key={i} className="text-yellow-500" />)
      ) : (
        <span>reviews yet</span>
      )}
    </div>
  );
}

RatingStar.propTypes = {
  rating: propTypes.number.isRequired,
};

export default RatingStar;
