import { HttpClient } from "./http-client.js";
import { API_URL_TEST } from "./config.js";

const possibleContributions = {
  content: [
    "Observed child labor in a local factory",
    "Children selling goods on the street without supervision",
    "Suspicious activity involving minors at a bus station",
    "Children begging near shopping areas",
    "Underage workers at a construction site",
    "Minors frequently seen at a suspected brothel",
    "Child performers working late at night",
    "Teens possibly involved in illegal drug distribution",
    "Children working with hazardous materials in agriculture",
    "Suspicious domestic situation with a child",
    "Underage marriage reported in the community",
    "Children coerced into political demonstrations",
    "Children performing dangerous street acts",
    "Online exploitation involving minors",
    "Children employed at local restaurants",
  ],
  filepaths: [
    [], // Empty arrays as placeholders
    ["/path/to/image1.jpg"],
    ["/path/to/image2.jpg"],
    ["/path/to/image1.jpg", "/path/to/image2.jpg"],
    ["/path/to/image3.jpg"],
    ["/path/to/image1.jpg", "/path/to/image3.jpg"],
  ],
};

const httpClient = new HttpClient(`${API_URL_TEST}/api/contribution-case`, [
  "user_id",
  "case_id",
  "content",
  "filepaths",
]);

export const createCase = async (payload) => {
  const { data: caseData } = await httpClient
    .with(possibleContributions)
    .post(payload);

  return caseData;
};

export const createContribution = async (payload) => {
  const { data: contribution } = await httpClient
    .with(possibleContributions)
    .post(payload);

  return contribution;
};

export const getRandomContributions = (amount) => {
  return httpClient.getRandomBodies(amount, possibleContributions);
};
