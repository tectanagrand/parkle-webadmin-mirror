// app/page.tsx (this is the root route '/')
import { redirect } from "next/navigation"; // Adjust the path according to your setup

export default async function Home() {
  redirect("/dashboard/history");

  return;
}
