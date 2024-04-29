// BannerAndAvatar.js
// import { isValidURL } from "../../utils/isValidURL";
// BannerAndAvatar.js
// import React from "react";
import PropTypes from "prop-types";
import defaultProfileBanner from "../../assets/images/profile-banner.png";
import defaultAvatarImage from "../../assets/images/default-profile-image.png";

const BannerAndAvatar = ({
    viewedProfile,
    toggleHeart,
    isFavorite,
    userDetails,
}) => {
    return (
        <div className="relative mx-auto -mt-9 w-full max-w-1200">
            {/* Banner */}
            <img
                src={
                    viewedProfile.banner?.url ===
                    "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500"
                        ? defaultProfileBanner
                        : viewedProfile.banner?.url ?? defaultProfileBanner
                }
                alt={viewedProfile.banner?.alt || "Illustration of profile banner"}
                className="h-64 w-full object-cover"
            />

            {/* Avatar */}
            <div
                style={{
                    borderRadius: "50%",
                    backgroundColor: "var(--body-bg-color)",
                    alignItems: "center",
                    border: "10px solid var(--body-bg-color)",
                }}
                className="absolute left-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform justify-center rounded-full object-cover align-middle"
            >
                <img
                    src={
                        viewedProfile.avatar?.url ===
                        "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400"
                            ? defaultAvatarImage
                            : viewedProfile.avatar?.url ?? defaultAvatarImage
                    }
                    alt={
                        viewedProfile.avatar
                            ? viewedProfile.avatar.alt
                            : "Illustration of profile avatar"
                    }
                    style={{
                        backgroundColor: "var(--body-bg-color)",
                        border: "2px solid var(--profile-text-color)",
                        borderRadius: "50%",
                        height: "calc(40vw - 0.5vw)",
                        maxHeight: "95%",
                        width: "calc(40vw - 0.5vw)",
                        maxWidth: "95%",
                        marginTop: "-0.5vw",
                    }}
                    className="object-cover"
                />

                {/* Conditional rendering for the heart toggle */}
                {viewedProfile.name !== userDetails.name && (
                    <div className="absolute bottom-0 right-1">
                        <div className="heart-toggle cursor-pointer" onClick={toggleHeart}>
                            {isFavorite ? "💖" : "➕"}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BannerAndAvatar.propTypes = {
    viewedProfile: PropTypes.object.isRequired,
    toggleHeart: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    userDetails: PropTypes.object.isRequired,
};

export default BannerAndAvatar;
