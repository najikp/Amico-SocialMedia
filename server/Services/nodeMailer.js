import nodeMailer from "nodemailer"
import * as dotenv from 'dotenv'
dotenv.config()

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_PASSWORD,
  },
});

export const otpSend = (email) => {
  try {
    console.log(email, 'emaillllllll');
    // console.log(transporter,"TRANSPORTER")
    return new Promise(async (resolve, reject) => {
      const otp = `${Math.floor(10000 + Math.random() * 99999)}`;
      console.log(otp, 'otpppp');
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Verify your email ",
        html: `Your email verification code is : ${otp}`,

      };
      console.log('heloooooooooooooo');
      console.log(mailOptions)
      await transporter
        .sendMail(mailOptions)
        .then((response) => {
          console.log(response, 'ppppppppppppppppppp');
          response.otp = otp;
          resolve(response);
        })
        .catch((err) => {
          console.log("ERROR OTP")
          console.log(err, 'eroorrrrr');
          resolve(err);
        });
    }).catch((err) => {
      reject(err);
    });
  } catch (err) {
    console.log("ERROR OCCURRED", err);
  }
};