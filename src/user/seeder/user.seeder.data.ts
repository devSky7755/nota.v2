import { CreateUserDto } from "../dto/user.create-dto"

export const seedUsers: Array<CreateUserDto> = [
    {
        "email": "test@testemail.com",
        "firstName": "John",
        "lastName": "Smith",
        "phone": "15552224444",
        "password": "jonas320",
        "status": true,
        "isNotary": true,
        "signature": "base64://svg:0s9cdjcs8hw9ndff9w38hndwb9e8hd0w3hn908hdwb...",
        "accIds": [
            1,
            2
        ],
        "userDetails": [],
        "notaryDetails": [],
        tz: 1,
    }
];