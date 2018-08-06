import faker from "faker";

let buildItem = () => {
    return {
        id: faker.random.uuid(),
        rowNumberId: faker.random.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        address: faker.address.city(),
        phone: faker.phone.phoneNumber(),
        company: faker.company.companyName(),
        status: faker.random.word()
    };
};

let store = {
    query: (param, success, error) => {
        let rows = param.rows,
            datas = [];

        for (let i = 0; i < rows; ++i) {
            datas.push(buildItem());
        }
        success({total: 200, datas});
    }
};

export default store;