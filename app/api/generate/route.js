import { NextResponse } from "next/server";
import OpenAI from 'openai'

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines 

1. create clear and concise for the front of the flashcard. 
2. Provide accurate and informative answer for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information. 
4. Use simple language to make the flashcards accessible to a wide range of learner.
5. Include a variety of question types, such as definitions, examples, comparisons and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. WHen appropriate, use mnemonics or memory aids to help reinforce the information. 
8. Tailor the difficulty level of the flashcards tp the user's specified preferences. 
9. If given a body of text, extract the most important and relevant information for the flashcards. 
10. AIm to crate a balanced set of flashcards that covers the topic comprehensively.

Remember, the goal is to facilitate effective learning and retention og the information through these flashcards

Return  in the following JSON format
 {
    "flashcards": [
    {
    "fronts: str,
    "back": str
    }
  ]
}
 
`
export async function POST(req) {
    const openai = OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completion.create({
        messages : [
            {roles: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: "gpt-4o",
        response_format: {type:'json_object'}
    })

    const flashcards = JSON.parse(completion.choices(0).message.content)

    return NextResponse.json(flashcards.flashcard)
}