import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useStore from "../../hooks/useStore";
import { setMetaDescription } from "../../utils/setMetaDescription";
import BannerAndAvatar from "../../components/BannerAndAvatar";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails";
import useHeartToggle from "../../hooks/useHeartToggle";
import defaultProfileBanner from "../../assets/images/profile-banner.png";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";
import MyVenues from "../../components/MyVenues";

function ProfilePage() {
  const { username } = useParams();
  const { fetchUserProfile } = useProfile();
  const { viewedProfile, favoriteProfiles, setViewedProfile, userDetails } =
    useStore();
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

    document.title = `Holidaze - ${viewedProfile.name}'s Profile`;
    setMetaDescription(
      "Explore our wide range of destinations from around the world to find your special place.",
    );
  }, [username, fetchUserProfile, favoriteProfiles, setViewedProfile, viewedProfile.name]);

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
    <div
      style={{ color: "var(--profile-text-color)" }}
      className="profile-page min-h-screen"
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
      <MyVenues />
    </div>
  );
}

export default ProfilePage;
