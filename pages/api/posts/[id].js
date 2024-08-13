import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            const deletedPost = await prisma.post.delete({
                where: { id: id },
            });
            res.status(200).json(deletedPost);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete post' });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}