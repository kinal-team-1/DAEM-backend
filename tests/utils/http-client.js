export class HttpClient {
  constructor(url) {
    this.url = url;
    this.list = [];
  }

  with(data) {
    this.list.push(...data);
    return this;
  }

  getRandomBody() {
    const keys = Object.keys(this.list[0]);
    const newObj = {};
    for (const key of keys) {
      const random = Math.floor(Math.random() * this.list.length);
      newObj[key] = this.list[random][key];
    }

    return newObj;
  }

  async post(body) {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept-language": Math.random() > 0.5 ? "en" : "es",
      },
      body: JSON.stringify(body || this.getRandomBody()),
    });
    // eslint-disable-next-line @joao-cst/enforce-consistent-return-express
    return response.json();
  }

  async get() {
    const response = await fetch(this.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept-language": Math.random() > 0.5 ? "en" : "es",
      },
    });
    // eslint-disable-next-line @joao-cst/enforce-consistent-return-express
    return response.json();
  }
}
