import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: inherit;
    }
`
const BookCard = styled.div`
display: flex;
background-color: #f2f1f0;
width: 300px;
justify-content: center;
padding: 10px;
`
const BookInfo = styled.div`
width: 250px;
`
const BookImgContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 250px;
`
export const Image = styled.div`
background-color: grey;
background-image: url(${(props: { url: string }) => props.url});
background-size: cover;
width: 150px;
height: 212px;
font-weight: 700;
font-size: 30px;
text-align: center;
color: rgb(177, 177, 177);
box-shadow: 10px 10px 15px 2px rgba(107, 107, 107, 0.567);
`
const Category = styled.p`
text-decoration: underline;
font-size: 15px;
color: grey;
`
const Title = styled.p`
font-weight: 800;
margin: 16px 0 0;
`
const Authors = styled.p`
font-weight: 200;
color: grey;
margin: 8px 0 8px;
`

export interface IBookItem {
    bookData: {
        id: string,
        volumeInfo: {
            imageLinks: {
                thumbnail: string;
            }
            categories: string[];
            title: string;
            authors: string[];
        }
    }
}

export function BookItem({ bookData }: IBookItem) {
    const img = bookData.volumeInfo?.imageLinks?.thumbnail
    const category = bookData.volumeInfo?.categories?.[0] ?? 'Other'
    const title = bookData.volumeInfo?.title || 'Unnamed'
    const authors = (bookData.volumeInfo?.authors || ['Author is not specified']).join(', ')
    return (
        <BookCard>
            <StyledLink to={`/book-finder/book/${bookData.id}`}>
                <BookImgContainer>
                    <Image url={img}>{img ? null : 'PICTURE NOT FOUND'}</Image>
                </BookImgContainer>
                <BookInfo>
                    <Category>{category}</Category>
                    <Title>{title}</Title>
                    <Authors>{authors}</Authors>
                </BookInfo>
            </StyledLink>
        </BookCard>
    )
}