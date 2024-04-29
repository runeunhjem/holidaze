// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useProfile from "../../hooks/useProfile";
// import useStore from "../../hooks/useStore";
// import { TbHomeEdit, TbUserEdit } from "react-icons/tb";
// import { HiOutlineUser } from "react-icons/hi";
// import { MdOutlineMarkEmailRead } from "react-icons/md";
// import { Popover, Typography } from "@mui/material";
// import defaultProfileBanner from "../../assets/images/profile-banner.png";
// import defaultAvatarImage from "../../assets/images/default-profile-image.png";
import useHeartToggle from "../../hooks/useHeartToggle";
// import "./index.css";

// function ProfilePage() {
//   const { username } = useParams();
//   const { fetchUserProfile } = useProfile();
//   const {
//     viewedProfile,
//     favoriteProfiles,
//     setViewedProfile,
//     setIsFavorite,
//     userDetails,
//     // addFavoriteProfile,
//     // removeFavoriteProfile,
//   } = useStore();
//   const { isFavorite, toggleHeart } = useHeartToggle(viewedProfile);

//   // const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     if (username) {
//       fetchUserProfile(username).then((profileData) => {
//         if (profileData) {
//           const isFav = favoriteProfiles.some(
//             (p) => p.name === profileData.name,
//           );
//           setViewedProfile({ ...profileData, isFav });
//           setIsFavorite(isFav);
//         }
//       });
//     }
//     document.title = `Holidaze - ${viewedProfile.name}'s Profile`;

//     let metaDescription = document.querySelector("meta[name='description']");
//     if (!metaDescription) {
//       metaDescription = document.createElement("meta");
//       metaDescription.setAttribute("name", "description");
//       metaDescription.setAttribute(
//         "content",
//         "Explore our wide range of destinations from around the world to find your special place.",
//       );
//       document.getElementsByTagName("head")[0].appendChild(metaDescription);
//     }
//   }, [
//     username,
//     fetchUserProfile,
//     favoriteProfiles,
//     setViewedProfile,
//     viewedProfile.name,
//     setIsFavorite,
//   ]);

//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   const handleClick = (event) => setAnchorEl(event.currentTarget);
//   const handleClose = () => setAnchorEl(null);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (
//         anchorEl &&
//         !anchorEl.contains(event.target) &&
//         !event.target.closest(".bio")
//       ) {
//         handleClose();
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [anchorEl]);

//   return (
//     <main
//       style={{ color: "var(--profile-text-color)" }}
//       className="min-h-screen profile-page"
//     >
//       <div className="relative mx-auto -mt-9 w-full max-w-1200">
//         <img
//           src={
//             viewedProfile.banner?.url ===
//             "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500"
//               ? defaultProfileBanner
//               : viewedProfile.banner?.url ?? defaultProfileBanner
//           }
//           alt={viewedProfile.banner?.alt || "Illustration of profile banner"}
//           className="h-64 w-full object-cover"
//         />

//         <div
//           style={{
//             borderRadius: "50%",
//             backgroundColor: "var(--body-bg-color)",
//             alignItems: "center",
//             border: "10px solid var(--body-bg-color)",
//           }}
//           className="absolute left-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-full object-cover align-middle"
//         >
//           <img
//             src={
//               viewedProfile.avatar?.url ===
//               "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
//                 ? defaultAvatarImage
//                 : viewedProfile.avatar?.url ?? defaultAvatarImage
//             }
//             alt={
//               viewedProfile.avatar
//                 ? viewedProfile.avatar.alt
//                 : "Illustration of profile avatar"
//             }
//             style={{
//               backgroundColor: "var(--body-bg-color)",
//               border: "2px solid var(--profile-text-color)",
//               borderRadius: "50%",
//               height: "calc(40vw - 0.5vw)",
//               maxHeight: "95%",
//               width: "calc(40vw - 0.5vw)",
//               maxWidth: "95%",
//               marginTop: "-0.5vw",
//             }}
//             className="object-cover"
//           />

//           {viewedProfile.name !== userDetails.name && (
//             <div className="absolute bottom-0 right-1">
//               <div
//                 className="heart-toggle cursor-pointer"
//                 onClick={toggleHeart}
//               >
//                 {isFavorite ? "💖" : "➕"}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="container mx-auto max-w-1200 justify-center px-4 pb-8 pt-20">
//         <h1 className="text-center text-4xl font-bold capitalize">
//           {viewedProfile.name}
//         </h1>
//         {viewedProfile.venueManager ? (
//           <div
//             style={{ alignItems: "center", justifyContent: "center" }}
//             className="mt-2 flex"
//           >
//             <TbHomeEdit className="me-2 text-2xl" />
//             <h2 className="text-center text-2xl font-bold capitalize">
//               Venue Manager
//             </h2>
//           </div>
//         ) : (
//           <div
//             style={{ alignItems: "center", justifyContent: "center" }}
//             className="mt-2 flex"
//           >
//             <HiOutlineUser className="me-2 text-2xl" />
//             <h2 className="text-center text-2xl font-bold capitalize">
//               Registered User
//             </h2>
//           </div>
//         )}
//         <div
//           style={{ alignItems: "center", justifyContent: "center" }}
//           className="mt-2 flex"
//         >
//           <TbUserEdit className="me-2 text-2xl" />
//           <h2 className="text-center text-2xl font-bold capitalize">
//             Edit Profile
//           </h2>
//         </div>
//         <div
//           style={{ alignItems: "center", justifyContent: "center" }}
//           className="mt-2 flex"
//         >
//           <MdOutlineMarkEmailRead className="text-1xl me-2" />
//           <h3 className="text-1xl text-center font-bold">
//             {viewedProfile.email}
//           </h3>
//         </div>
//         <div className="relative">
//           <hr
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               borderTop: "2px solid var(--profile-text-color)",
//               backgroundColor: "transparent",
//               height: "0px",
//               maxWidth: "60%",
//               margin: "30px auto 20px auto",
//             }}
//           />
//           <div
//             style={{
//               position: "absolute",
//               top: "-15px",
//               left: "50%",
//               transform: "translateX(-50%)",
//               padding: "5px 10px",
//               borderRadius: "25px",
//               backgroundColor: "var(--profile-text-color)",
//               color: "var(--body-bg-color)",
//               cursor: "pointer",
//             }}
//             aria-describedby={id}
//             onClick={handleClick}
//             className="bio"
//           >
//             Read Bio
//           </div>
//           <Popover
//             sx={{ pointerEvents: "none", marginTop: "10px" }}
//             id={id}
//             open={open}
//             anchorEl={anchorEl}
//             onClose={handleClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "center",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "center",
//             }}
//           >
//             <Typography
//               style={{
//                 backgroundColor: "var(--profile-text-color-inverted)",
//                 border: "1px solid var(--profile-text-color)",
//                 borderRadius: "5px",
//                 padding: "20px",
//               }}
//             >
//               {viewedProfile.bio || "No biography provided."}
//             </Typography>
//           </Popover>
//           <div className="mx-auto flex max-w-300 flex-col items-center ps-12 pt-6">
//             <div className="min-w-300 mx-auto flex flex-wrap items-start text-left">
//               <div className="min-w-300 w-full text-left">
//                 Active Venues: {viewedProfile.venues?.length || 0}
//               </div>
//               <div className="min-w-300 w-full text-left">
//                 Your Venues&apos; Bookings: {viewedProfile.venuesBookings ?? 0}
//               </div>
//             </div>
//             <div className="min-w-300 mx-auto flex flex-wrap items-start text-left">
//               <div className="min-w-300 w-full text-left">
//                 Your Bookings: {viewedProfile.bookings?.length || 0}
//               </div>
//               <div className="min-w-300 w-full text-left">
//                 Your Favorites: {(viewedProfile.favorites ?? []).length}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default ProfilePage;
// ProfilePage.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useStore from "../../hooks/useStore";
import { setMetaDescription } from "../../utils/setMetaDescription";
import BannerAndAvatar from "../../components/BannerAndAvatar";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails";
import defaultProfileBanner from "../../assets/images/profile-banner.png";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";

function ProfilePage() {
    const { username } = useParams();
    const { fetchUserProfile } = useProfile();
    const { viewedProfile, favoriteProfiles, setViewedProfile, userDetails } = useStore();
    const { isFavorite, toggleHeart } = useHeartToggle(viewedProfile);

    const [bannerUrl, setBannerUrl] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (username) {
            fetchUserProfile(username).then((profileData) => {
                if (profileData) {
                    const isFav = favoriteProfiles.some(
                        (p) => p.name === profileData.name,
                    );
                    setViewedProfile({ ...profileData, isFav });

                    setBannerUrl(profileData.banner?.url ?? defaultProfileBanner);
                    setAvatarUrl(profileData.avatar?.url ?? defaultAvatarImage);
                }
            });
        }

        setMetaDescription("Explore our wide range of destinations from around the world to find your special place.");
    }, [username, fetchUserProfile, favoriteProfiles, setViewedProfile]);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                anchorEl &&
                !anchorEl.contains(event.target) &&
                !event.target.closest(".bio")
            ) {
                handleClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [anchorEl]);

    return (
        <main
            style={{ color: "var(--profile-text-color)" }}
            className="min-h-screen profile-page"
        >
            <BannerAndAvatar
                viewedProfile={viewedProfile}
                bannerUrl={bannerUrl}
                avatarUrl={avatarUrl}
                toggleHeart={toggleHeart}
                isFavorite={isFavorite}
                userDetails={userDetails}
            />
            <ProfileInfo viewedProfile={viewedProfile} />
            <ProfileDetails
                viewedProfile={viewedProfile}
                id={id}
                handleClick={handleClick}
                open={open}
                anchorEl={anchorEl}
                handleClose={handleClose}
            />
        </main>
    );
}

export default ProfilePage;
