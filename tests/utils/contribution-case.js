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
  user_id: [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013",
    "507f1f77bcf86cd799439014",
    "507f1f77bcf86cd799439015",
    "507f1f77bcf86cd799439016",
    "507f1f77bcf86cd799439017",
    "507f1f77bcf86cd799439018",
    "507f1f77bcf86cd799439019",
    "507f1f77bcf86cd799439020",
    "507f1f77bcf86cd799439021",
    "507f1f77bcf86cd799439022",
    "507f1f77bcf86cd799439023",
    "507f1f77bcf86cd799439024",
    "507f1f77bcf86cd799439025",
  ],
  case_id: [
    "5f9d1b3b5f3b9b001f3b9b00",
    "5f9d1b3b5f3b9b001f3b9b01",
    "5f9d1b3b5f3b9b001f3b9b02",
    "5f9d1b3b5f3b9b001f3b9b03",
    "5f9d1b3b5f3b9b001f3b9b04",
    "5f9d1b3b5f3b9b001f3b9b05",
    "5f9d1b3b5f3b9b001f3b9b06",
    "5f9d1b3b5f3b9b001f3b9b07",
    "5f9d1b3b5f3b9b001f3b9b08",
    "5f9d1b3b5f3b9b001f3b9b09",
    "5f9d1b3b5f3b9b001f3b9b10",
    "5f9d1b3b5f3b9b001f3b9b11",
    "5f9d1b3b5f3b9b001f3b9b12",
    "5f9d1b3b5f3b9b001f3b9b13",
    "5f9d1b3b5f3b9b001f3b9b14",
  ],
};

const httpClient = new HttpClient(`${API_URL_TEST}/api/contribution-case`, [
  "user_id",
  "case_id",
  "content",
  "filepaths",
]);

export const createContribution = async (payload) => {
  const { data: contribution } = await httpClient
    .with(possibleContributions)
    .post(payload);

  return contribution;
};

export const getRandomContributions = (amount) => {
  return httpClient.getRandomBodies(amount, possibleContributions);
};
