const { response } = require("@hapi/hapi/lib/validation");
const { nanoid } = require("nanoid");
const books = require('./books');

const addBooksHandler = (request, h) => {
    const { name,
        year,
        author,
        summary,
        publisher,
        readCount,
        readPage,
        reading
    } = request.payload;

    const id = nanoid(16);
    const createdAt = new Date.toISOString();
    const updatedAt = createdAt;

    const finished = (pageCount, readPage) => {
        return (pageCount === readPage ? true : false);
    }

    const newBook = {
        name,
        year,
        author,
        summary,
        publisher,
        readCount,
        readPage,
        reading,
        finished,
        id,
        createdAt,
        updatedAt
    };

    books.push(newBook);

    // kriteria 1 menyimpan buku 

    const isSuccess = books.filter((book) => book.id === id).lenght > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
    // status code 400 client tidak melampirkan properti name

    if (books === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. mohon isi nama buku'
        });
        response.code(400)
        return response;
    }
    // end


    // status code 500 gagal memasukan buku
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan'
    });
    response.code(500);
    return response;
};

// end

// Kreteria 2 menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;
    if (name) {
        let books = books.filter((book) => book.name.toLowerCase() === name.tolowercase());
        return h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },

        }).code(200);
    };

    if (reading) {
        let books = books.filter((book) => book.reading.toLowerCase() === reading.tolowercase());
        return h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },

        }).code(200);
    };

    if (finished) {
        let books = books.filter((book) => book.finished.toLowerCase() === f.tolowercase());
        return h.response({
            status: 'success',
            data: {
                books: books.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher,
                })),
            },

        }).code(200);
    };

    if(!name && !reading && !finished){
        return h.response ({
            status : 'success',
            data : {
                books: books.map((book)=>({
                    id:book.id,
                    name:book.name,
                    publisher:book.publisher,
                })),
            },
        }).code(200);
    }
};


// end


// kriteria 3 menampilakan detail buku
const getBooksByIdhanler = (request, h) => {
    const { id } = request.params;

    const book = books.filter((n) => n.id === id)[0];

    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};
// end

module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdhanler };