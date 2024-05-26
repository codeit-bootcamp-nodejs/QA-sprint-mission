import { PrismaClient } from "@prisma/client";
import { assert } from "superstruct";
import { PatchComment } from "../comment.struct.js";

const prisma = new PrismaClient();

export async function Comment_update(req, res) {
  assert(req.body, PatchComment);
  const { id } = req.params;

  const comment = await prisma.comment.findUnique({
    where: { id },
    include: { writer: true },
  });

  // 내거인지 확인하는 로직
  try {
    if (comment.writer.email !== req.email) {
      return res.status(403).send({ error: "You are not authorized to delete this product" });
    }

    const updateComment = await prisma.comment.update({
      where: {
        id,
      },

      data: req.body,
    });

    res.send(updateComment);
  } catch (error) {
    res.status(500).send({ error: "Error deleting product" });
  }
}
