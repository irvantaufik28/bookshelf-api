const { addBooksHandler, getAllBooksHandler, getBooksByIdhanler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBooksHandler,
        
        
        options: {
            cors: {
              origin: ['*'],
            },
        },

        
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler :getBooksByIdhanler,
    }
];

module.exports = routes;













// {
//     "name": string,
//     "year": number,
//     "author": string,
//     "summary": string,
//     "publisher": string,
//     "pageCount": number,
//     "readPage": number,
//     "reading": boolean
// }









// {
//     "id": "Qbax5Oy7L8WKf74l",
//     "name": "Buku A",
//     "year": 2010,
//     "author": "John Doe",
//     "summary": "Lorem ipsum dolor sit amet",
//     "publisher": "Dicoding Indonesia",
//     "pageCount": 100,
//     "readPage": 25,
//     "finished": false,
//     "reading": false,
//     "insertedAt": "2021-03-04T09:11:44.598Z",
//     "updatedAt": "2021-03-04T09:11:44.598Z"
// }