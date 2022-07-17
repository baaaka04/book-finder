import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import styled from 'styled-components';
import { Image } from "./BookItem";

const Container = styled.div`
display: flex;
min-height: 100%;
`
const BookIMGBar = styled.div`
width: 40%;
min-height: 100%;
align-self: stretch;
display: flex;
justify-content: center;
align-items: start;
background-color: #f2f1f0;
`
const InfoBar = styled.div`
width: 60%;
min-height: 100%;
padding: 40px 50px 20px;
`
const ImageLarge = styled(Image)`
width: 300px;
height: 423px;
margin-top: 40px;
font-size: 60px;
`
const Category = styled.div`
font-weight: 200;
margin-bottom: 35px;
`
const Title = styled.div`
font-weight: 600;
margin-bottom: 20px;
font-size: 24px
`
const Authors = styled.div`
text-decoration: underline;
font-weight: 200;
margin-bottom: 30px;
color: grey;
`
const Description = styled.div`
font-weight: 600;
border: solid grey 1px;
padding: 15px;
min-height: 230px;
margin-bottom: 30px;
`

interface IbookInfo {
    imageLinks: {
        thumbnail: string,
    },
    categories: string[],
    title: string,
    description: string,
    authors: string[],
}

export function BookView() {
    const { bookId } = useParams()
    const [bookInfo, setBookInfo] = useState({} as IbookInfo)
    const [isLoading, setIsLoading] = useState(false)

    const img = bookInfo.imageLinks?.thumbnail
    const category = bookInfo.categories?.[0] ?? 'Other'
    const title = bookInfo.title || 'Unnamed'
    const description = bookInfo.description || ''
    const authors = (bookInfo.authors || ['Author is not specified']).join(', ')

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyAbjV7r8dnRKfkLQ2Ivt_r2zw1dPcxj5cU`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data.volumeInfo)
                setBookInfo({ ...data.volumeInfo })
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [bookId])

    return (
        <>
            {isLoading ?
                <Loading /> :
                <Container>
                    <BookIMGBar>
                        <ImageLarge url={img}>{img ? null : 'PICTURE NOT FOUND'}</ImageLarge>
                    </BookIMGBar>

                    <InfoBar>
                        <Category>{category}</Category>
                        <Title>{title}</Title>
                        <Authors>{authors}</Authors>
                        <Description>{description}</Description>
                    </InfoBar>

                </Container>
            }
        </>
    )
}