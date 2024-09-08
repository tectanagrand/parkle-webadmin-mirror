// app/page.tsx (this is the root route '/')
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation"; // Adjust the path according to your setup

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }
  return;
}
