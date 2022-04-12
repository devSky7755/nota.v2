import { CreateAccountDto } from "../dto/account.create-dto"

export const seedAccountStatuses: Array<any> = [
    {
        "id": 1,
        "name": "Pending",
        "status": true
    },
];

export const seedAccounts: Array<CreateAccountDto> = [
    {
        "companyName": "My Law Firm3",
        "firstName": "David",
        "lastName": "Lam",
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
        "email": "test3@testemail.com",
        "billingEmail": "test1@testemail.com",
        "phone": "15552224444",
        "billingPhone": "15555555555",
        "accType": 1,
        "qbAccountNumber": "ASB120921u20910120912u09iosdi898981",
        "brandColor": "#198271",
        "logo": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
        "whiteLabel": false,
        "status": 1,
        "closedDate": "2025-01-01"
    }
];