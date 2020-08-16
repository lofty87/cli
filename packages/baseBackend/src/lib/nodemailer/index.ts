import { transporter } from '@serverConfig/nodemailer';
import { renderPug } from '@lib/pug';

/**
 * * pug template engine 을 통해 html 렌더링
 */

/**
 * @name resolveCallback
 * * sendEmail callback 공통 처리
 */
const resolveCallback = (resolve: (value?: any) => void) => (error?: null | Error) => {
  if(error) {
    throw new Error(error.message);
  }

  resolve();
};

// ? e.g.
type Data = {
  header: 'header';
  content: 'content';
  footer: 'footer';
};

const sendEmail = async (to: string, title: string, data: Data) => {
  await new Promise((resolve) => {
    transporter.sendMail(
      {
        to,
        subject: title,
        html: renderPug('template', data),
      },
      resolveCallback(resolve)
    );
  });
};

export default {
  sendEmail,
};
