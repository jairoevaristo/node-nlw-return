import { Router } from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

import { PrismaFeedbacksRepository } from './repositories/prisma/PrismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/SubmitFeedbackUseCase';

export const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshort } = request.body;

  const feedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    feedbacksRepository, 
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({ comment, type, screenshort });

  return response.status(201).send();
});