import { HttpClient } from "./http-client.js";
import { API_URL_TEST } from "./config.js";

const possibleUsers = {
  name: [
    "John",
    "Jane",
    "Alice",
    "Bob",
    "Charlie",
    "Emma",
    "David",
    "Olivia",
    "Michael",
    "Sophia",
    "William",
    "Ava",
    "James",
    "Isabella",
    "Alexander",
  ],
  lastname: [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
  ],
  username: [
    "JohnS2023",
    "JaneJ_1995",
    "AliceW_88",
    "BobBrown22",
    "CharlieG_99",
    "EmmaM2024",
    "DavidD_1990",
    "OliviaR_77",
    "MichaelM33",
    "SophiaL_11",
    "WilliamH2021",
    "AvaA_2000",
    "JamesG_44",
    "IsabellaW55",
    "AlexA_66",
  ],
  email: [
    "john.smith@email.com",
    "jane.johnson@email.com",
    "alice.williams@email.com",
    "bob.brown@email.com",
    "charlie.garcia@email.com",
    "emma.miller@email.com",
    "david.davis@email.com",
    "olivia.rodriguez@email.com",
    "michael.martinez@email.com",
    "sophia.hernandez@email.com",
    "william.lopez@email.com",
    "ava.gonzalez@email.com",
    "james.wilson@email.com",
    "isabella.anderson@email.com",
    "alex.taylor@email.com",
  ],
  password: [
    "P@ssw0rd123",
    "Str0ngP@ss1",
    "SecureP@ss2",
    "C0mplexP@ss3",
    "S@feP@ssw0rd4",
    "Un1queP@ss5",
    "R0bustP@ss6",
    "F0rtifiedP@7",
    "Imp3netr@ble8",
    "Unbre@k@ble9",
    "Inv1nc1bleP@10",
    "Imp0ss1bleT0Cr@ck11",
    "UltraS@feP@ss12",
    "SuperStr0ngP@13",
    "MegaSecureP@14",
  ],
};
const httpClient = new HttpClient(`${API_URL_TEST}/api/auth/signup`, [
  "name",
  "lastname",
  "username",
  "email",
  "password",
]);
export const createUser = async (userBody) => {
  const { data: user } = await httpClient.with(possibleUsers).post(userBody);

  return user;
};

export const deleteUserById = async (id) => {
  const { data: user } = await httpClient.delete(
    `${API_URL_TEST}/api/user/${id}`,
  );
  return user;
};

export const getRandomUser = () => {
  return httpClient.getRandomBody(possibleUsers);
};

export const getRandomUsers = (amount) => {
  return httpClient.getRandomBodies(amount, possibleUsers, [
    "username",
    "email",
  ]);
};
