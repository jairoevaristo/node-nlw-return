export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshort?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}