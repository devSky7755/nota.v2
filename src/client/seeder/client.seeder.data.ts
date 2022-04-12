import { CreateClientDto } from "../dto/client.create-dto"

export const seedClients: Array<CreateClientDto> = [
    {
        "firstName": "David",
        "middleName": "J",
        "lastName": "Lam",
        "suffix": "JR",
        "addressOne": "1234 Street",
        "addressTwo": "",
        "city": "Dallas",
        "state": 1,
        "zipCode": "76262",
        "billingAddressOne": "1234 Street",
        "billingAddressTwo": "",
        "billingCity": "Dallas",
        "billingState": 1,
        "billingZipCode": "76262",
        "phone": "15552224444",
        "sendSms": true,
        "sendEmail": true,
        "email": "test1@testemail.com",
        "dob": "1970-01-01",
        "dlNum": "ABC1234567",
        "dlState": 1,
        "dlExp": "2025-04-02",
        "dlImage": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
        "signature": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
        "accIds": [
            1
        ],
        "kbas": [
            {
                "question": "Which city did you live in?",
                "possibleAnswers": [
                    {
                        "answer": "Dallas"
                    },
                    {
                        "answer": "Fort Worth"
                    },
                    {
                        "answer": "Huston"
                    },
                    {
                        "answer": "Austin"
                    }
                ],
                "correctAnswer": "Dallas"
            }
        ],
        "ssn": "234456456"
    }
];