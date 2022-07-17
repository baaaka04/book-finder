import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { written } from '../redux/reducer';
import { changed } from '../redux/categoryReducer';
import { sorted } from '../redux/sortingReducer';
import backgroundIMG from '../img/searchbar-pic.webp';
import SearchSVG from '../img/search.svg';

const SearchContainer = styled.div`
background-image: url(${(props: { url: string }) => props.url});
background-size: cover;
background-color: gray;
display: flex;
flex-direction: column;
align-items: center;
height: 220px;
color: white;
`
const Options = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top: 5px;
font-size: 18px;
`
const Search = styled.div`
border: solid grey 1px;
display: flex;
align-items: center;
background-color: white;
width: 60%;
max-width: 480px;
`
const LoupeIMG = styled.img`
wigth: 20px;
height: 20px;
background-color: white;
cursor: pointer;
margin: 5px;
`
const SearchInput = styled.input`
height: 30px;
border: none;
width: 100%;
max-width: 500px;
font-size: 20px;
font-weight: 500;
padding: 5px;
box-sizing: border-box;
color: black;
`
const Selector = styled.select`
height: 30px;
border: none;
width: 200px;
font-size: 20px;
font-weight: 500;
padding: 5px;
margin: 10px;
color: grey;
`
const Header = styled.h1`
text-align: center;
`
interface ISearchBar {
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>,
    onPressFind: React.MouseEventHandler<HTMLImageElement>,
}

export function SearchBar({ onKeyDown, onPressFind }: ISearchBar) {

    const dispatch = useAppDispatch();
    const book = useAppSelector((state) => state.book.value);

    const categories = [
        'all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'
    ];


    return (
        <SearchContainer url={backgroundIMG} >
            <Header>
                Search for books
            </Header>
            <Search>
                <SearchInput
                    type="text"
                    value={book}
                    onChange={(e) => dispatch(written(e.target.value))}
                    onKeyDown={onKeyDown}
                />
                <LoupeIMG src={SearchSVG} onClick={onPressFind} />
            </Search>

            <Options>
                <div>
                    Categories
                    <Selector name="" id="" onChange={e => dispatch(changed(e.target.value))}>
                        {categories.map(item => <option key={item}>{item}</option>)}
                    </Selector>
                </div>
                <div>
                    Sotring by
                    <Selector name="" id="" onChange={e => dispatch(sorted(e.target.value))}>
                        <option value="relevance">relevance</option>
                        <option value="newest">newest</option>
                    </Selector>
                </div>
            </Options>
        </SearchContainer>
    )
}