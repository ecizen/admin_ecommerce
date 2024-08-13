
import db from "@/lib/db";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children, params }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
    return null; // Ensure nothing is rendered if redirect occurs
  }

  const store = await db.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
    
  });

  if (!store) {
    redirect("/");
    return null; // Ensure nothing is rendered if redirect occurs
  }

  return (
    <>
     <Navbar />
      {children}
    </>
  );
}
