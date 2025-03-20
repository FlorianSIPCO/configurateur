import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    throw new Error("Impossible de récupérer les utilisateurs.")
  }
};

export const getUserById = async (id: string, selectFields?: object) => {
  return await prisma.user.findUnique({
    where: { id },
    select: selectFields || { 
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      role: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const getClients = async () => {
  try {
    const clients = await prisma.user.findMany({
      where: { role: "CLIENT" },
      orderBy: { createdAt: "desc" },
    });
    return clients;
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    throw new Error("Impossible de récupérer les clients.");
  }
};

export const getAdmin = async () => {
  try {
    const admin = await prisma.user.findMany({
      where: { role: "ADMIN" },
      orderBy: { createdAt: "desc" },
    });
    return admin;
  } catch (error) {
    console.error("Erreur lors de la récupération des admins :", error);
    throw new Error("Impossible de récupérer les admins.");
  }
};
