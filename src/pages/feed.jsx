import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";
import Loader from "../components/common/loader";

function Feed() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, Logout } = useFirebase(null);

  const navigate = useNavigate();

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);

  async function handleLogout() {
    setLoading(true);
    await Logout();
    navigate("/login"); // Navigate to login after logout
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div>{loading && <Loader />}</div>
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link to="/feed">My App</Link>
          </h1>
          <div className="relative">
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-white">
                {user ? user.displayName : "Guest"} v
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/edit-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 flex-grow">
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Welcome to My App {user ? user.displayName : "Guest"}
          </h2>
          <p className="text-gray-700 mb-8">
            Discover the best features and services tailored for you. Sign up
            today and explore the amazing possibilities.
          </p>
        </section>

        <section className="mt-16 space-y-6">
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 1</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
              sapien elit.
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 2</h3>
            <p className="text-gray-700">
              Nullam tristique tortor eget nisi consequat, sed viverra ligula
              dapibus.
            </p>
          </div>
          <div className="bg-white shadow-md rounded p-6">
            <h3 className="text-xl font-bold mb-2">Feature 3</h3>
            <p className="text-gray-700">
              Integer cursus nisl vel lectus tristique, in sodales massa
              malesuada.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 My App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Feed;
