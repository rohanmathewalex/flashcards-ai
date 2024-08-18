// import { NextResponse } from "next/server";
// import OpenAI from 'openai'

// const systemPrompt = `
// You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines 

// 1. create clear and concise for the front of the flashcard. 
// 2. Provide accurate and informative answer for the back of the flashcard.
// 3. Ensure that each flashcard focuses on a single concept or piece of information. 
// 4. Use simple language to make the flashcards accessible to a wide range of learner.
// 5. Include a variety of question types, such as definitions, examples, comparisons and applications.
// 6. Avoid overly complex or ambiguous phrasing in both questions and answers.
// 7. WHen appropriate, use mnemonics or memory aids to help reinforce the information. 
// 8. Tailor the difficulty level of the flashcards tp the user's specified preferences. 
// 9. If given a body of text, extract the most important and relevant information for the flashcards. 
// 10. AIm to crate a balanced set of flashcards that covers the topic comprehensively.
// 11. Only Generate 10 flashcards.

// Remember, the goal is to facilitate effective learning and retention og the information through these flashcards

// Return  in the following JSON format
//  {
//     "flashcards": [
//     {
//     "front: str,
//     "back": str
//     }
//   ]
// }

// `
// export async function POST(req) {
//     const openai = new OpenAI()
//     const data = await req.text()
//     const completion = await openai.chat.completions.create({
//         messages: [
//             { role: 'system', content: systemPrompt },
//             { role: 'user', content: data },
//         ],
//         model: "gpt-4o",
//         response_format: { type: 'json_object' }
//     })
//     console.log(completion.choices(0).message.content)

//     const flashcards = JSON.parse(completion.choices[0].message.content)

//     return NextResponse.json(flashcards.flashcards)
// }




import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Ensure that each flashcard focuses on a single concept or piece of information.
4. Use simple language to make the flashcards accessible to a wide range of learners.
5. Include a variety of question types, such as definitions, examples, comparisons, and applications.
6. Avoid overly complex or ambiguous phrasing in both questions and answers.
7. When appropriate, use mnemonics or memory aids to help reinforce the information.
8. Tailor the difficulty level of the flashcards to the user's specified preferences.
9. If given a body of text, extract the most important and relevant information for the flashcards.
10. Aim to create a balanced set of flashcards that covers the topic comprehensively.
11. Only generate 10 flashcards.

Return the flashcards in the following JSON format:
{
  "flashcards": [
    { "front": "string", "back": "string" }
  ]
}
`;

export async function POST(req) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY // Ensure your API key is properly configured
    });

    try {
        const data = await req.text();
        const completion = await openai.chat.completions.create({
            model: "gpt-4", // Ensure this is the correct model name
            messages: [
                { role: 'system', content: systemPrompt }, // Fixed typo: 'role' instead of 'roles'
                { role: 'user', content: data },
            ],
        });

        // Parse the response
        const messageContent = completion.choices[0].message.content;
        const flashcards = JSON.parse(messageContent);
        console.log(completion.choices[0].message.content)

        return NextResponse.json(flashcards.flashcards); // Fixed property access

    } catch (error) {
        console.error("Error generating flashcards:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
