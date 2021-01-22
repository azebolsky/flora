import * as functions from "firebase-functions";
import * as corsModule from "cors";

const cors = cors({ origin: true });

export const listener = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    return;
  });

  res.json({ some: "json" });
});
