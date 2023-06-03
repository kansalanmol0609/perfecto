//types
import {GraphQLContext} from '../context';

type CreateFeedbackInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const createFeedback = async (
  _parent: any,
  args: {feedbackInput: CreateFeedbackInput},
  ctx: GraphQLContext,
) => {
  const {feedbackInput} = args;

  const feedback = await ctx.prisma.feedback.create({
    data: {
      name: feedbackInput.name,
      email: feedbackInput.email,
      subject: feedbackInput.subject,
      message: feedbackInput.message,
    },
  });

  return feedback;
};
