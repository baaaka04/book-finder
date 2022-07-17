import styled from 'styled-components';
import loading from '../img/loading.gif';


const LoadingIMG = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
position: fixed;
top: 0px;
background-color: rgba(108, 117, 125, 0.3);
`


export function Loading() {

    return (
        <LoadingIMG>
            <img src={loading} alt='Loading...' />
        </LoadingIMG>
    )
}