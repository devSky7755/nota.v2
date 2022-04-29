import { CreateDocActionDto } from "../dto/doc.action.create-dto";
import { CreateDocStatusDto } from "../dto/doc.status.create-dto";

export const seedDocActions: Array<CreateDocActionDto> = [
    {
        "name": "signature only",
        "status": true,
    }
];

export const seedDocStatuses: Array<CreateDocStatusDto> = [
    {
        "name": "un-signed",
        "status": true,
    }
];

export const seedDocs: Array<any> = [
    {
        "docTitle": "Sign Doc 1",
        "docDate": "2022-01-02",
        "destroyDate": "2022-01-20",
        "action": 1,
        "status": 1,
        "clientId": 1,
        "sessionId": 1,
        "docUrl": "https://s3.amazonaws.com/notary.io-docs/3c2a509f-dd0b-41ba-96fd-0e640a49953e-Coding-Website-Layout.jpg",
        "docType": "image/jpeg",
        "needsNotary": true,
    }
];