import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UserUpdateData {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  role?: "ADMIN" | "CLIENT";
}

export const updateUser = async (userId: string, userData: UserUpdateData) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { id: userId }});

    if (!existingUser) {
      throw new Error("Utilisateur non trouvé.");
    }

    let hashedPassword;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: userData.email ?? existingUser.email,
        password: hashedPassword ?? existingUser.password,
        firstname: userData.firstname ?? existingUser.firstname,
        lastname: userData.lastname ?? existingUser.lastname,
        role: userData.role ?? existingUser.role,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw new Error("Impossible de mettre à jour l'utilisateur.");
  }
};
