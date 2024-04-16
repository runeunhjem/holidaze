import { useEffect } from "react";
import useStore from "../../hooks/useStore";

function ProfilePage() {
  useEffect(() => {
    document.title = "Holidaze - Your Profile";
  }, []);

  // Accessing the logOut action from your Zustand store
  const logOut = useStore((state) => state.logOut);

  // Fetch user-specific data, like bookings, recent activity, etc.
  // Display that data in the profile page

  return (
    <main className="min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Profile</h1>
        <p>Welcome back, [Username]!</p>
        <div className="mt-8">
          {/* Example Profile Content */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Your Stats</h2>
            <p>Some interesting stats about your usage could go here.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
            <p>
              Display recent activity here, like recent logins, document edits, or whatever is relevant to your application.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">Quick Actions</h2>
            <p>Place some quick action buttons here, for easy access to common tasks.</p>
          </section>
          {/* Logout Button */}
          <button
            onClick={logOut}
            aria-label="Log Out"
            className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
