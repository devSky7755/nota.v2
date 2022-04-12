import { CreateRecordDto } from "../dto/record.create-dto"

export const seedRecords: Array<CreateRecordDto> = [
    {
        "uuid": "uuid",
        "notaryDate": "2022-03-12",
        "notaryCounty": "Dallas",
        "docDate": "2022-03-01",
        "docTitle": "Notice of Fun",
        "principleName": "John Doe",
        "principleAddress": "1234 Street, City Name, State, Zipcode",
        "principlePhone": "5552224444",
        "principleSig": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
        "witnessName": "John Smith",
        "witnessAddress": "1234 Street, City Name, State, Zipcode",
        "dlNum": "ABC1234567",
        "dlExp": "2025-01-01",
        "dlImg": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==",
        "fee": 1600,
        "isOnline": false,
        "typeOfNotarization": 1,
        "methodOfId": 1,
        "dlState": 1
    },
];