"use client";
import { useAuth } from "../../context/AuthContext";
export default function Profile() {
  const { user } = useAuth();
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center font-sans bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16bg-black">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-white sm:text-6xl text-center">
              <span className="text-blue-600">Profile</span>
            </h1>
            {user && (
              <p className="mt-4 text-gray-300">
                Logged in as: {user.displayName || user.email || "Guest"}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
