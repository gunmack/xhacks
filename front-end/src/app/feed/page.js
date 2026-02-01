"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // adjust path
import DropdownMenu from "@/components/dropdown";
import AddModal from "@/components/addModal";

export default function Feed() {
  const router = useRouter();
  const { user, loading } = useAuth(); // use context instead of local state
  const [openModal, setOpenModal] = useState(false);

  // redirect to auth page if not logged in
  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [loading, user, router]);

  const handleAdd = (data) => {
    console.log("New data:", data);
    // send to backend / Firebase later
  };

  return (
    <div className="relative bg-black min-h-screen">
      <DropdownMenu />
      <button
        className="fixed top-4 right-4 w-12 h-12 bg-blue-600 hover:bg-blue-700text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-50 cursor-pointer"
        onClick={() => setOpenModal(true)}
        title="Create new entry"
      >
        +
      </button>

      <AddModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAdd}
      />

      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-black dark:text-white sm:text-6xl text-center">
              <span className="text-blue-600">Feed</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
}
