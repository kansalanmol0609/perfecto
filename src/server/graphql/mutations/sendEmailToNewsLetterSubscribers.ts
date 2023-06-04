//types
import {GraphQLContext} from '../context';

//utils
import {sendBulkEmail} from '@/server/nodemailer';

type SendEmailToNewsLetterSubscribersInput = {
  receiverEmailAddresses: string[];
  subject: string;
  body: string;
};

export const sendEmailToNewsLetterSubscribers = async (
  _parent: any,
  args: {sendEmailToNewsLetterSubscribersInput: SendEmailToNewsLetterSubscribersInput},
  ctx: GraphQLContext,
) => {
  const {
    sendEmailToNewsLetterSubscribersInput: {receiverEmailAddresses, subject, body},
  } = args;

  await sendBulkEmail({
    subject,
    body,
    receivers: receiverEmailAddresses,
  });

  return true;
};
