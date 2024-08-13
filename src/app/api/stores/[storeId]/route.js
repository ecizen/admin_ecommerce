import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PATCH(req, { params: { storeId } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    if (!name) {
      return NextResponse.json({ message: "Harus menginput nama" }, { status: 400 });
    }

    if (!storeId) {
      return NextResponse.json({ message: "Store id dibutuhkan" }, { status: 400 });
    }

    const store = await db.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params: { storeId } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!storeId) {
      return NextResponse.json({ message: "Store id dibutuhkan" }, { status: 400 });
    }

    const store = await db.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });


    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
