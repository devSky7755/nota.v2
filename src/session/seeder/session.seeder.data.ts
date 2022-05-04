export const seedSessionStatuses: Array<any> = [
    {
        "name": "Booked",
        "status": true,
    },
    {
        "name": "Active",
        "status": true,
    },
    {
        "name": "Complete",
        "status": true,
    },
    {
        "name": "Canceled",
        "status": true,
    },
]

export const seedSessions: Array<any> = [
    {
        "account": 1,
        "user": 1,
        "dateTime": 1651619560,
        "duration": 1,
        "docsNum": 2,
        "sessionType": 1,
        "sessionStatus": 1,
        "notarySessionType": 1,
        "caseMatterNum": "CN-01921928",
        "videoUrl": "1-20220104.mp4",
        "clientIds": [
            1,
            2
        ],
        "witnessIds": [
            1,
            2
        ],
        "associateIds": [
            1,
            2
        ],
        "docIds": [
            1,
            2
        ],
    },
];