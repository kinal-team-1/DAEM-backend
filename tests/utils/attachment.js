import { HttpClient } from "./http-client.js";
import { API_URL_TEST } from "./config.js";

const httpClient = new HttpClient(`${API_URL_TEST}/api/attachment/upload`);

export const createSignedUploadUrl = async (filepaths) => {
  console.assert(Array.isArray(filepaths), "filepaths should be an array");
  const responses = await Promise.all(
    filepaths.map((filepath) => httpClient.post({ filepath })),
  );

  return responses.map((response) => response.data.signedUrl);
};
