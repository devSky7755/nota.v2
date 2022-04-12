import { CreateKbaDto } from "../dto/kba.create-dto"

export const seedKbas: Array<CreateKbaDto> = [
    {
        "client": 1,
        "question": "Which city did you live in?",
        "possibleAnswers":
            [{
                "answer": "Dallas",
            }, {
                "answer": "Fort Worth",
            }, {
                "answer": "Huston",
            }, {
                "answer": "Austin",
            }],
        "correctAnswer": "Dallas",
    },
];