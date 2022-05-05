import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/FeedbacksRepository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshort?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshort } = request;

    if (!type || !comment) {
      throw new Error('Type or Comment is required.');
    }

    if (screenshort && !screenshort.startsWith('data:image/png;64')) {
      throw new Error('Invalid screenshort format.');
    }
    
    await this.feedbacksRepository.create({
        comment,
        type,
        screenshort
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p>Tipo do feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join('\n')
    })
  }
}