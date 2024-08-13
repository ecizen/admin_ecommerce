import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, { params: {  bannerId } }) {
    try {
      if (!bannerId) {
        return NextResponse.json(
          { message: "Banner id dibutuhkan" },
          { status: 400 }
        );
      }
  
      const banner = await db.banner.findUnique({
        where: {
          id: bannerId,
        },
      });
  
      return NextResponse.json(banner);
    } catch (error) {
      console.log("[BANNER_GET]", error);
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
  }

export async function PATCH(req, { params: { storeId, bannerId } }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { label, imageUrl } = body;

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }
    if (!label) {
      return NextResponse.json(
        { message: "Harus menginput label" },
        { status: 400 }
      );
    }
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Harus menginput gambar" },
        { status: 400 }
      );
    }

    if (!bannerId) {
      return NextResponse.json(
        { message: "Banner id dibutuhkan" },
        { status: 400 }
      );
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const banner = await db.banner.updateMany({
      where: {
        id: bannerId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(req, { params: { storeId, bannerId } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    if (!bannerId) {
      return NextResponse.json(
        { message: "Banner id dibutuhkan" },
        { status: 400 }
      );
    }

    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const banner = await db.banner.deleteMany({
      where: {
        id: bannerId,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.log("[BANNER_DELETE]", error);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}



