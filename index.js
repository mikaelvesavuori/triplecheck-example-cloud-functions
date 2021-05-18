// @ts-check
const { FirestoreRepository } = require('triplecheck-repository-firestore');
const { TripleCheckBroker } = require('triplecheck-broker');

const DATABASE_NAME = 'broker-demo'; // <----- Change this if your database has another name

/**
 * @description Basic implementation of TripleCheck broker with the Firestore repository, using Google Cloud Functions as the platform.
 */
exports.handler = async (req, res) => {
  /**
   * The broker requires a pre-cleaned object with some URL data.
   */
  const [request, payload] = await getRequestData(req);

  /**
   * Pass the repo your Firestore configuration and the collection name.
   * Because this is in the Google Cloud context, and we are using a self-defined
   * service account, we can skip sending it.
   * If you were however in a non-GCP context you'd need to use a keyfile or
   * some other way of providing credentials.
   * @see https://cloud.google.com/firestore/docs/quickstart-servers
   */
  const repository = FirestoreRepository(undefined, DATABASE_NAME);

  const { responseData, status, headers } = await TripleCheckBroker(
    request,
    payload,
    repository
  );

  res.send(JSON.stringify(responseData));
};

/**
 * @description Utility function to get the data we need to run the TripleCheck broker. Expects the full Cloud Function request object.
 * @todo Add to triplecheck-core?
 */
async function getRequestData(req) {
  const { body, method, url } = req;

  let [pathname, search] = url.split("?");
  if (!pathname) pathname = url;

  const payload = typeof body === "string" ? JSON.parse(body) : body;

  return [
    {
      method,
      pathname,
      search
    },
    payload
  ];
}
