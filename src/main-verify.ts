import { environment } from "./constants";

export async function verifyAuth() {
  const otp = 123456;
  const ref = 123456;
  const userNumber = "0811111111";
  const resp = await fetch(
    `https://${environment.domain}/user/salary/${userNumber}/${otp}/${ref}/${environment.userID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        option: JSON.stringify(environment.options),
      },
    }
  );
}
