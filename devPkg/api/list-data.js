import faker from "faker";

let generateData = (count) => {
    let result = [];

    for (let i = 0; i < count; ++i) {
        result.push({
            id: faker.random.uuid(),
            name: faker.random.word(),
            value: faker.random.uuid()
        });
    }

    return result;
}

export default generateData;
