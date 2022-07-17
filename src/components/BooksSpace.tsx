import { BookItem } from "./BookItem";
import styled from 'styled-components';
import { IBookItem } from "./BookItem";

const BooksBoard = styled.div`
display: flex;
justify-content: space-around;
flex-wrap: wrap;
gap: 20px;
`
const TotalFound = styled.div`
text-align: center;
margin: 15px 0 35px;
font-size: 20px;
`
const MoreBooks = styled.div`
display: flex;
justify-content: center;
margin-top: 70px;
`
const LoadMoreBtn = styled.button`
max-width: 75%;
width: 700px;
height: 40px;
cursor: pointer;
font-weight: 700;
background-color: black;
color: white;
margin-bottom: 300px;
`

interface IBookSpace {
    books: IBookItem['bookData'][],
    totalItemsNumber: number,
    addBooks: React.MouseEventHandler<HTMLButtonElement>,
    isLoading: boolean,
    hasMoreBooks: boolean,
}

export function BooksSpace({ books, totalItemsNumber, addBooks, isLoading, hasMoreBooks }: IBookSpace) {

    return (
        <>
            <TotalFound>
                {!!totalItemsNumber ? 'Found ' + totalItemsNumber + ' items' : null}
            </TotalFound>
            <BooksBoard>
                {books.map(item => {
                    return (
                        <BookItem
                            key={item.id}
                            bookData={item}
                        />
                    )
                }
                )}
            </BooksBoard>
            {!!books.length && !isLoading && hasMoreBooks ?
                <MoreBooks>
                    <LoadMoreBtn onClick={addBooks}>Load More</LoadMoreBtn>
                </MoreBooks>
                : null}
        </>
    )
}