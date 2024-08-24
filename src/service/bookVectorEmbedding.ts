import getSession from "../../config/neo4j";
import * as use from '@tensorflow-models/universal-sentence-encoder';
import { Book } from "../models/Book";

export async function generateEmbeddingForBook(book: Book){
    const description = book.description;
        const model = await use.load();
         const embeddings = await model.embed(description);
         const embeddingArray = new Float32Array(embeddings.arraySync()[0]);
         console.log("Embeded Array",embeddingArray);
    console.log("Calling from embeddings Book",book.description);
}