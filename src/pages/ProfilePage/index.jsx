// import { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import useProfile from "../../hooks/useProfile";
// import useStore from "../../hooks/useStore";

// function ProfilePage() {
//   const { username } = useParams();
//   const { fetchUserProfile, viewedProfile } = useProfile();
//   const { clearUser } = useStore();

//   useEffect(() => {
//     if (username) {
//       fetchUserProfile(username);
//     }
//     document.title = "Holidaze - Profile";
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
//   }, [username, fetchUserProfile]); // Added fetchUserProfile to the dependency array

//   return (
//     <main className="min-h-screen p-8">
//       <div className="container mx-auto">
//         <h1 className="mb-4 text-4xl font-bold">Profile</h1>
//         {viewedProfile ? (
//           <>
//             <p>Welcome back, {viewedProfile.name}!</p>
//             <div className="mt-8">
//               <section className="mb-8">
//                 <h2 className="text-2xl font-semibold">Your Details</h2>
//                 <p>Email: {viewedProfile.email}</p>
//                 <p>Bio: {viewedProfile.bio}</p>
//               </section>
//               <button
//                 onClick={clearUser}
//                 className="mt-8 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
//               >
//                 Log Out
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>Loading profile...</p>
//         )}
//       </div>
//     </main>
//   );
// }

// export default ProfilePage;

import { useEffect } from "react";
import useProfile from "../../hooks/useProfile";
import useStore from "../../hooks/useStore";

function ProfilePage() {
  const { userDetails, clearUser } = useStore();
  useProfile(); // This initializes the fetching logic when the component mounts

  useEffect(() => {
    document.title = "Holidaze - Your Profile";
  }, []);

  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="mb-4 text-4xl font-bold">Profile</h1>
        <p>Welcome back, {userDetails.name}!</p>
        <div className="mt-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Your Details</h2>
            <p>Email: {userDetails.email}</p>
            <p>Bio: {userDetails.bio}</p>
          </section>
          <button
            onClick={clearUser}
            className="mt-8 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
