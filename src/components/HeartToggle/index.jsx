// import propTypes from "prop-types";
// import useStore from "../../hooks/useStore";

// const HeartToggle = ({ profile }) => {
//   const { favoriteProfiles, addFavoriteProfile, removeFavoriteProfile } =
//     useStore();
//   const isFavorite = favoriteProfiles.some((p) => p.id === profile.name);

//   const toggleFavorite = () => {
//     if (isFavorite) {
//       removeFavoriteProfile(profile.name);
//     } else {
//       addFavoriteProfile(profile);
//     }
//   };

//   return (
//     <button
//       onClick={toggleFavorite}
//       style={{
//         fontSize: "24px",
//         color: "red",
//       }}
//     >
//       {isFavorite ? "♥" : "♡"}
//     </button>
//   );
// };

// HeartToggle.propTypes = {
//   profile: propTypes.object.isRequired,
// };

// export default HeartToggle;
