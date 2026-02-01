// client-only Firebase init
// use this for all client-side Firebase imports

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Make sure your Firebase config comes from environment variables
// Never hardcode API keys in code if possible
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once
export function getFirebaseApp() {
  if (typeof window === "undefined") return null; // skip SSR
  if (!getApps().length) {
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

// Get Auth instance safely in the browser
export function getFirebaseAuth() {
  const app = getFirebaseApp();
  if (!app) return null; // skip SSR
  return getAuth(app);
}
