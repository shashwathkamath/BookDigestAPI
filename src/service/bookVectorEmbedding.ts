import { HfInference } from '@huggingface/inference';
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { Book } from "../models/Book";

export async function generateEmbeddingForBook(book: Book) {

    const description = book.description;
    classifyText(description);
    const model = await use.load();
    const embeddings = await model.embed(description);
    const embeddingArray = new Float32Array(embeddings.arraySync()[0]);
    console.log("Embeded Array --> ", embeddingArray);
}

async function classifyText(userInput: string) {
    const hf = new HfInference(process.env.HUGGIG_FACE_ACCESS_TOKEN);
    const response = await hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: userInput,
    });
    console.log(response);
}