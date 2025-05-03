/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { HfInference } from '@huggingface/inference';
import { DataAPIClient } from "@datastax/astra-db-ts";

const {
    ASTRA_DB_APPLICATION_TOKEN,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_NAMESPACE,
    HF_API_KEY,
} = process.env;

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
const db = client.db(ASTRA_DB_API_ENDPOINT as string, { keyspace: ASTRA_DB_NAMESPACE });
const hf = new HfInference(HF_API_KEY);

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const latestMessage = messages[messages.length - 1]?.content;

        if (!latestMessage) {
            return new Response("No message content found", { status: 400 });
        }

        let docContext = "";
        if (latestMessage.toLowerCase().includes('formula 1') || latestMessage.toLowerCase().includes('f1')) {
            try {
                const collection = await db.collection(ASTRA_DB_COLLECTION as string);
                const cursor = collection.find({}, { limit: 5 });

                const documents = await cursor.toArray();

                if (documents && documents.length > 0) {
                    docContext = documents.map(doc => {
                        return `Content: ${doc.text}\nSource: ${doc.source || "Unknown"}\n---`;
                    }).join("\n");
                } else {
                    console.log("No documents found in the database");
                }
            } catch (error) {
                console.error("Error retrieving documents from AstraDB:", error);
            }
        }

        let modelMessages = [];

        // Add system prompt
        if (docContext) {
            modelMessages.push({
                role: "system",
                content: `You are AssumeBot, a helpful assistant with knowledge about Formula 1. Use this context if relevant: ${docContext}`
            });
        } else {
            modelMessages.push({
                role: "system",
                content: "You are AssumeBot, a helpful assistant. Be concise and direct in your answers."
            });
        }

        // Add conversation history
        for (const msg of messages) {
            modelMessages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        }

        try {
            const response = await hf.textGeneration({
                model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
                inputs: formatChatPrompt(modelMessages),
                parameters: {
                    max_new_tokens: 300,
                    temperature: 0.7,
                    top_p: 0.95,
                    return_full_text: false
                }
            });

            console.log("Hugging Face Response: ", response);

            if (response && response.generated_text) {
                const generatedText = cleanGeneratedText(response.generated_text);

                return new Response(JSON.stringify({
                    role: 'assistant',
                    content: generatedText
                }), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                console.error("Error: Hugging Face response is missing generated_text:", response);
                return new Response(JSON.stringify({
                    error: "Failed to generate response",
                    details: "Response from Hugging Face did not contain generated_text",
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

        } catch (error: any) {
            console.error("Error generating with Hugging Face:", error);
            return new Response(JSON.stringify({
                error: "Failed to generate response",
                details: error.message,
                solution: "Make sure you have a valid Hugging Face API key"
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error: any) {
        console.error("Error processing request:", error);
        return new Response(JSON.stringify({ error: "Failed to process request", details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

function formatChatPrompt(messages: any) {
    let prompt = "";

    for (const msg of messages) {
        if (msg.role === "system") {
            prompt += `<s>[INST] ${msg.content} [/INST]\n`;
        } else if (msg.role === "user") {
            prompt += `<s>[INST] ${msg.content} [/INST]\n`;
        } else if (msg.role === "assistant") {
            prompt += `${msg.content} </s>\n`;
        }
    }

    if (!prompt.endsWith("[INST]\n")) {
        prompt += "<s>[INST] Please respond to the above query. [/INST]\n";
    }

    return prompt;
}

function cleanGeneratedText(text: string) {
    if (!text) return "";
    text = text.replace(/<\/?s>|\[INST\]|\[\/INST\]/g, "").trim();
    text = text.replace(/^AssumeBot:\s*/i, "").trim();
    text = text.replace(/^Assistant:\s*/i, "").trim();

    return text;
}
