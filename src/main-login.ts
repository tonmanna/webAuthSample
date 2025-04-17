import {
  startRegistration,
  startAuthentication,
} from "@simplewebauthn/browser";

const elemBegin = document.getElementById("btnAuth");
const elemSuccess = document.getElementById("successAuth");
const elemError = document.getElementById("errorAuth");

if (!elemBegin || !elemSuccess || !elemError) {
  throw new Error("Missing elements in the DOM");
}

// Start registration when the user clicks a button
elemBegin.addEventListener("click", async () => {
  const userID = "123456";
  elemSuccess.innerHTML = "";
  elemError.innerHTML = "";

  // GET authentication options from the endpoint that calls
  // @simplewebauthn/server -> generateAuthenticationOptions()
  const resp = await fetch(
    "https://rast.more-commerce.com/generate-authentication-options/" + userID
  );
  const optionsJSON = await resp.json();
  console.log("optionsJSON: ", optionsJSON);
  let asseResp;
  try {
    // Pass the options to the authenticator and wait for a response
    asseResp = await startAuthentication({ optionsJSON });
  } catch (error) {
    // Some basic error handling
    elemError.innerText = error;
    throw error;
  }

  // POST the response to the endpoint that calls
  // @simplewebauthn/server -> verifyAuthenticationResponse()
  console.log("asseResp: ", asseResp);
  const verificationResp = await fetch(
    "https://rast.more-commerce.com/verify-authentication/" + userID,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asseResp),
    }
  );

  // Wait for the results of verification
  const verificationJSON = await verificationResp.json();

  // Show UI appropriate for the `verified` status
  if (verificationJSON && verificationJSON.verified) {
    elemSuccess.innerHTML = "Success!";
  } else {
    elemError.innerHTML = `Oh no, something went wrong! Response: <pre>${JSON.stringify(
      verificationJSON
    )}</pre>`;
  }
});
