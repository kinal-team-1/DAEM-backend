import { HttpClient } from "./http-client.js";

const API_URL_TEST = `http://localhost:${process.env.PORT}`;

const httpClient = new HttpClient(`${API_URL_TEST}/api/auth/signup`);
export const createUser = async () => {
  const { data: user } = await new HttpClient(`${API_URL_TEST}/api/auth/signup`)
    .with([
      {
        email: "john.doe@test.com",
        username: "johndoe",
        lastname: "Doe",
        name: "John",
        password: "Pa$sword123a",
      },
      {
        email: "jane.doe@test.com",
        username: "janedoe",
        lastname: "Doe",
        name: "Jane",
        password: "Pa$sword456a",
      },
      {
        email: "mike.smith@test.com",
        username: "mikesmith",
        lastname: "Smith",
        name: "Mike",
        password: "Pa$sword789a",
      },
      {
        email: "sarah.jones@test.com",
        username: "sarahjones",
        lastname: "Jones",
        name: "Sarah",
        password: "Pa$sword321a",
      },
      {
        email: "paul.brown@test.com",
        username: "paulbrown",
        lastname: "Brown",
        name: "Paul",
        password: "Pa$sword654a",
      },
      {
        email: "emma.wilson@test.com",
        username: "emmawilson",
        lastname: "Wilson",
        name: "Emma",
        password: "Pa$sword987a",
      },
      {
        email: "jack.taylor@test.com",
        username: "jacktaylor",
        lastname: "Taylor",
        name: "Jack",
        password: "Pa$sword234a",
      },
      {
        email: "lucy.davis@test.com",
        username: "lucydavis",
        lastname: "Davis",
        name: "Lucy",
        password: "Pa$sword567a",
      },
      {
        email: "tom.miller@test.com",
        username: "tommiller",
        lastname: "Miller",
        name: "Tom",
        password: "Pa$sword890a",
      },
      {
        email: "lily.thomas@test.com",
        username: "lilythomas",
        lastname: "Thomas",
        name: "Lily",
        password: "Pa$sword123a",
      },
    ])
    .post();

  return user;
};
