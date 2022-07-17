import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { BooksSpace } from './BooksSpace';
import { BookView } from './BookView';
import { SearchBar } from './SearchBar';
import { useAppSelector } from '../redux/hooks';
import { Loading } from './Loading';
import { IBookItem } from './BookItem'

let fetchedBooks: IBookItem['bookData'][] = [];
let count = 0;

function App() {

  const [bookItems, setBookItems] = useState(fetchedBooks);
  const [totalItemsNumber, setTotalItemsNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreBooks, setHasMoreBooks] = useState(true);

  const book = useAppSelector((state) => state.book.value);
  const category = useAppSelector((state) => state.category.value);
  const sorting = useAppSelector((state) => state.sorting.value);

  const navigate = useNavigate();
  let maxResult = 30;

  function getBooks() {
    const url = 'https://www.googleapis.com/books/v1/';
    const cat = category === 'all' ? '' : category;
    console.log('count+30=', count + 30);
    console.log('totalItemsNumber=', totalItemsNumber);
    if (!!totalItemsNumber && count + 30 >= totalItemsNumber) {
      maxResult = totalItemsNumber - count
      setHasMoreBooks(false)
    }
    const reqURL = url +
      'volumes?q=' + book +
      '+subject:' + cat +
      '&orderBy=' + sorting +
      '&startIndex=' + count +
      '&maxResults=' + maxResult
    setIsLoading(true)
    console.log(reqURL) // request

    fetch(reqURL)
      .then(resp => resp.json())
      .then(data => {
        if (!!data.totalItems) {
          fetchedBooks = [...fetchedBooks, ...data.items]
        }
        console.log(data) //response
        setTotalItemsNumber(data.totalItems)
        setBookItems([...fetchedBooks])
        navigate("../book_search/")
        setIsLoading(false)
      })
      .catch(err => console.error(err))
  }

  function addBooks() {
    count += 30
    getBooks()
  }

  function onKeyDown(event: any) {
    if (event.key === "Enter") {
      count = 0
      fetchedBooks = []
      getBooks()
    }
  }

  function onPressFind() {
    count = 0
    fetchedBooks = []
    getBooks()
  }

  return (
    <>
      <button onClick={() => console.log(maxResult)}>maxResult</button>
      <button onClick={() => console.log(count)}>count</button>
      <SearchBar
        onKeyDown={onKeyDown}
        onPressFind={onPressFind}
      />
      <Routes>
        <Route path="/book_search/" element={<BooksSpace
          books={bookItems}
          totalItemsNumber={totalItemsNumber}
          addBooks={addBooks}
          isLoading={isLoading}
          hasMoreBooks={hasMoreBooks}
        />} />

        <Route path="/book_search/book/:bookId" element={<BookView />} />
      </Routes>
      {isLoading ? <Loading /> : null}
    </>
  )
}

export default App
