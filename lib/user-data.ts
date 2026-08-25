import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

export async function ensureUserProfile(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);
  const existing = await getDoc(userRef);

  if (!existing.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName,
      createdAt: serverTimestamp(),
    });
    return;
  }

  await setDoc(
    userRef,
    {
      email: user.email,
      displayName: user.displayName,
    },
    { merge: true }
  );
}

export async function ensureChildProfile(uid: string): Promise<void> {
  const childRef = doc(db, "users", uid, "child", "profile");
  const existing = await getDoc(childRef);

  if (existing.exists()) {
    return;
  }

  await setDoc(childRef, {
    name: "Aryaman",
    className: "Class 5",
    createdAt: serverTimestamp(),
  });
}
