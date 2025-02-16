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
  DPI: [
    "1234567890123",
    "1234567890124",
    "1234567890125",
    "1234567890126",
    "1234567890127",
    "1234567890128",
    "1234567890129",
    "1234567890130",
    "1234567890131",
    "1234567890132",
    "1234567890133",
    "1234567890134",
    "1234567890135",
    "1234567890136",
    "1234567890137",
  ],
  phone_number: [
    "12345678",
    "12345679",
    "12345680",
    "12345681",
    "12345682",
    "12345683",
    "12345684",
    "12345685",
    "12345686",
    "12345687",
    "12345688",
    "12345689",
    "12345690",
    "12345691",
    "12345692",
  ],
};
const httpClient = new HttpClient(`${API_URL_TEST}/api/auth/signup`, [
  "name",
  "lastname",
  "email",
  "password",
  "DPI",
  "phone_number",
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
  return httpClient.getRandomBodies(amount, possibleUsers, ["email"]);
};
