import { SubmitFeedbackUseCase } from "./SubmitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      comment: 'example comment',
      type: 'BUG',
      screenshort: 'data:image/png;64dasdasdsadsadsadsadg'
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  })

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      comment: 'example comment',
      type: '',
      screenshort: 'data:image/png;64dasdasdsadsadsadsadg'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      comment: '',
      type: 'IDEA',
      screenshort: 'data:image/png;64dasdasdsadsadsadsadg'
    })).rejects.toThrow();
  })

  it('should not be able to submit a feedback wiht an invalid screenshort', async () => {
    await expect(submitFeedback.execute({
      comment: 'ta tudo bugado',
      type: 'BUG',
      screenshort: 'teste.png'
    })).rejects.toThrow();
  })
})