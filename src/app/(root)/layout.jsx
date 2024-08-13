import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({ children }) {
    const { userId } = auth();
    
    // Redirect if the user is not authenticated
    if (!userId) {
        redirect("/sign-in");
        return null; // Ensure nothing is rendered after redirect
    }

    // Fetch the store based on the userId
    const store = await db.store.findFirst({
        where: {
            userId
        }
    });

    // Redirect if the store is found
    if (store) {
        redirect(`/${store.id}`);
        return null; // Ensure nothing is rendered after redirect
    }

    return (
        <>
            {children}
        </>
    );
}
