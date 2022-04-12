import { CreateBillingDto } from "../dto/billing.create-dto"

export const seedBillings: Array<CreateBillingDto> = [
    {
        "accountId": 16,
        "qbInvoiceId": "AFS129830193912823",
        "amountDue": 65400,
        "balance": 65400,
        "amountPayed": 0,
        "netAccount": 1,
        "dueDate": "2022-03-12",
        "status": 1,
        "items": [
            {
                "name": "Session Fees",
                "description": "Session #1234 on 01/12/2022 - 15 mins",
                "qty": 15,
                "amount": 15,
                "discount": 0,
                "taxable": true,
            },
            {
                "name": "Document Fees",
                "description": "Session #1234 on 01/12/2022 - 2 documents notarized",
                "qty": 2,
                "amount": 1600,
                "discount": 0,
                "taxable": true,
            }
        ],
        "payments": [
            {
                "qbPaymentId": "122339203n28",
                "amount": 4500,
                "paymentDate": "2022-03-12",
                "statusId": 1
            }
        ]
    }
];