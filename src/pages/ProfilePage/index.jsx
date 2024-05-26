import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import useStore from "../../hooks/useStore";
import { setTitleAndMeta } from "../../utils/setTitleAndMeta";
import BannerAndAvatar from "../../components/BannerAndAvatar";
import ProfileInfo from "../../components/ProfileInfo";
import ProfileDetails from "../../components/ProfileDetails";
import useHeartToggle from "../../hooks/useHeartToggle";
import defaultProfileBanner from "../../assets/images/profile-banner.png";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";
import MyVenues from "../../components/MyVenues";
import MyBookings from "../../components/MyBookings";
import MyFavoriteVenues from "../../components/MyFavoriteVenues";
import { ClipLoader } from "react-spinners";

function ProfilePage() {
  const { username } = useParams();
  const { fetchUserProfile } = useProfile();
  const { viewedProfile, favoriteProfiles, setViewedProfile, userDetails } =
    useStore();
  const { isFavorite, toggleHeart } = useHeartToggle(viewedProfile);

  const [bannerUrl, setBannerUrl] = useState(defaultProfileBanner);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarImage);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(
    async (username) => {
      setLoading(true);
      const profileData = await fetchUserProfile(username);

      if (profileData) {
        const isFav = favoriteProfiles.some((p) => p.name === profileData.name);
        setViewedProfile({ ...profileData, isFav });

        setBannerUrl(profileData.banner?.url ?? defaultProfileBanner);
        setAvatarUrl(profileData.avatar?.url ?? defaultAvatarImage);
      }
      setLoading(false);
    },
    [fetchUserProfile, favoriteProfiles, setViewedProfile],
  );

  useEffect(() => {
    if (username) {
      loadProfile(username);
    }
  }, [username, loadProfile]);

  useEffect(() => {
    setTitleAndMeta(
      `Holidaze - ${viewedProfile.name || "Profile"}'s Profile`,
      "Overview and shortcuts to all your favorite things in one place.",
    );
  }, [viewedProfile.name]);

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

  if (loading) {
    return (
      <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
        <ClipLoader color="var(--link-color)" loading={loading} size={50} />
        <p className="mt-4">Loading profile...</p>
      </div>
    );
  }

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
      <MyVenues loadProfile={loadProfile} /> {/* Pass loadProfile here */}
      {viewedProfile && viewedProfile.bookings && (
        <MyBookings viewedProfile={viewedProfile} />
      )}
      <MyFavoriteVenues />
    </div>
  );
}

export default ProfilePage;
