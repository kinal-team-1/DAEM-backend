import { HttpClient } from "./http-client.js";
import { API_URL_TEST } from "./config.js";

const possibleCases = {
  description: [
    "Multiple children observed working long hours in a textile factory, appearing to be under legal working age.",
    "Group of young children selling trinkets to passersby late at night, no adult supervision visible.",
    "Suspicious activity observed at bus station involving adults approaching unaccompanied minors.",
    "Several young children begging aggressively near mall entrances, seem to be coordinated by adults.",
    "Underage individuals spotted performing dangerous tasks at a local construction site without proper safety equipment.",
    "Reports of minors entering and leaving a suspected brothel during late night hours.",
    "Child performers observed working past midnight at local entertainment venue, violating labor laws.",
    "Teenagers suspected of being used to distribute illegal substances in school areas.",
    "Children seen working with hazardous chemicals in nearby agricultural fields without protective gear.",
    "Neighbors report a child never leaving a house and sounds of distress, suspecting domestic servitude.",
    "Community member reports planned marriage involving an underage individual in local neighborhood.",
    "Children observed being coerced into participating in political rallies and demonstrations.",
    "Young children performing dangerous acrobatic acts on busy streets for money.",
    "Tip received about an online group exploiting and sharing inappropriate content involving minors.",
    "Multiple restaurants in the area reportedly employing children for kitchen and serving duties.",
  ],
  latitude: [
    40.7128, 40.7138, 40.7118, 40.7108, 40.7148, 40.7158, 40.7168, 40.7178,
    40.7188, 40.7198, 40.7208, 40.7218, 40.7228, 40.7238, 40.7248,
  ],
  longitude: [
    -74.006, -74.007, -74.005, -74.004, -74.008, -74.009, -74.01, -74.011,
    -74.012, -74.013, -74.014, -74.015, -74.016, -74.017, -74.018,
  ],
  address: [
    "123 Main St",
    "456 Oak Ave",
    "789 Elm Rd",
    "321 Pine Ln",
    "654 Maple Dr",
    "987 Cedar Blvd",
    "147 Birch Way",
    "258 Spruce Ct",
    "369 Willow Pl",
    "741 Ash St",
    "852 Poplar Ave",
    "963 Sycamore Rd",
    "159 Chestnut Ln",
    "753 Walnut Dr",
    "951 Hickory Blvd",
  ],
  city: [
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
    "New York",
  ],
  country: [
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
    "United States",
  ],
  // key: [
  //   "507f1f77bcf86cd799439011",
  //   "507f1f77bcf86cd799439012",
  //   "507f1f77bcf86cd799439013",
  //   "507f1f77bcf86cd799439014",
  //   "507f1f77bcf86cd799439015",
  //   "507f1f77bcf86cd799439016",
  //   "507f1f77bcf86cd799439017",
  //   "507f1f77bcf86cd799439018",
  //   "507f1f77bcf86cd799439019",
  //   "507f1f77bcf86cd799439020",
  //   "507f1f77bcf86cd799439021",
  //   "507f1f77bcf86cd799439022",
  //   "507f1f77bcf86cd799439023",
  //   "507f1f77bcf86cd799439024",
  //   "507f1f77bcf86cd799439025",
  // ],
};

const httpClient = new HttpClient(`${API_URL_TEST}/api/anonymous-case`, [
  "description",
  "latitude",
  "longitude",
  "address",
  "city",
  "country",
  // "key",
]);

export const createAnonymousCase = async (payload) => {
  const { data: anonymousCase } = await httpClient
    .with(possibleCases)
    .post(payload);

  return anonymousCase;
};

export const getRandomAnonymousCases = (amount) => {
  return httpClient.getRandomBodies(amount, possibleCases);
};
