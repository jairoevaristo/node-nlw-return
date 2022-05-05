import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../FeedbacksRepository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create ({ comment, type, screenshort }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        comment,
        type,
        screenshort
      }
    });
  };
}