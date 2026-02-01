"use client";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { getFirebaseAuth } from "../../firebase_config";

export default function SignOutPage() {
  const router = useRouter();
  const auth = getFirebaseAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth");
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
