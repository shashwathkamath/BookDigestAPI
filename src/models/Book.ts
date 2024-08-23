export interface Book {
    pages: string;              // Number of pages in the book
    date_published: string;     // Year the book was published
    isbn13: string;             // ISBN-13 identifier
    isbn: string;               // ISBN-10 identifier
    msrp: string;               // Manufacturer's suggested retail price
    name: string;               // Title of the book
    publisher: string;          // Publisher of the book
    description: string;        // Description or synopsis of the book
    isbn10: string;             // ISBN-10 identifier (duplicate, consider removing if unnecessary)
    language: string;           // Language the book is written in
}