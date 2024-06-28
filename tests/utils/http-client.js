export class HttpClient {
  constructor(url, schemaProps) {
    this.url = url;
    this.schemaProps = schemaProps;
  }

  with(data) {
    this.dataset = data;
    return this;
  }

  getRandomBody(dataset = this.dataset) {
    const newObj = {};
    for (const key of this.schemaProps) {
      const random = Math.floor(Math.random() * dataset[key].length);
      newObj[key] = dataset[key][random];
    }

    return newObj;
  }

  getRandomBodies(amount, dataset = this.dataset, uniqueProps = []) {
    const mapUniqueProps = uniqueProps.reduce((map, prop) => {
      map[prop] = new Set();
      return map;
    }, {});
    const bodies = [];
    for (let i = 0; i < amount; i++) {
      const body = this.getRandomBody(dataset);
      // avoid du
      const isSomeUniquePropRepeated = Object.keys(mapUniqueProps).some(
        (prop) => {
          return mapUniqueProps[prop].has(body[prop]);
        },
      );
      // avoid duplicates
      if (isSomeUniquePropRepeated) {
        i--;
        continue;
      }

      Object.keys(mapUniqueProps).forEach((prop) => {
        mapUniqueProps[prop].add(body[prop]);
      });

      bodies.push(body);
    }

    return bodies;
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

  delete(url = this.url) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "accept-language": Math.random() > 0.5 ? "en" : "es",
      },
      // eslint-disable-next-line @joao-cst/enforce-consistent-return-express
    }).then((response) => response.json());
  }
}
