import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
    }

    let formattedImages = product.images;

    if (Array.isArray(product.images) && typeof product.images[0] === "string") {
      formattedImages = product.images.map((url: string) => ({
        url,
        public_id: "",
      })) as any;
    }

    // Adapter les images des options
    const formattedOptions = product.options.map((option) => {
      const rawValues = option.values as any[]; // on force le cast en tableau

      return {
        ...option,
        values: rawValues.map((value: any) => ({
          ...value,
          image: typeof value.image === "string" ? { url: value.image, public_id: "" } : value.image,
          miniature: typeof value.miniature === "string" ? { url: value.miniature, public_id: "" } : value.miniature,
        })),
      }
    });

    return NextResponse.json({
      ...product,
      images: formattedImages,
      options: formattedOptions,
    });
  } catch (error) {
    console.error("Erreur API GET /products/[id] :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Logique de modification
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name, description, priceFormula, images, options } = body;

    // Supprimer les options existantes (avec cascade pour values si setup Prisma)
    await prisma.option.deleteMany({
      where: { productId: params.id },
    });

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        description,
        priceFormula,
        images,
        options: {
          create: options.map((opt: any) => ({
            name: opt.name,
            type: opt.type,
            values: opt.values,
          })),
        },
      },
      include: { options: true },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("Erreur API PUT /products/[id] :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Logique de suppression
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      options: true,
    }
  });

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  // Supprimer les options liées
  await prisma.option.deleteMany({
    where: {
      productId: params.id
    }
  })

  // Suppression des images depuis Cloudinary (avec public_id stocké)
  const images: Array<{ public_id: string }> = product.images as any;

  for (const image of images) {
    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }
  }

  // Suppression du produit
  await prisma.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
