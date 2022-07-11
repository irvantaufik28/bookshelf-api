const finished = (pageCount , readPage) => {
    return (pageCount === readPage ? true :false);
}
console.log(finished(1,1));