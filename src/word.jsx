import React from 'react';
import styled from '@emotion/styled';

const SingleLetter = styled.div`
width: 50px;
height: 60px;
background-color: white;
text-align: center;
line-height: 150%;
font-size: 200%;
float: left;
margin-top: 2px;
margin-left: 2px;
border-radius: 10px;
`
const Container = styled.div`
    display:flex;
    align-items: center;
    justify-content:center;
    width:calc(100vw-20px);
    height:20vh;
`
export default function Word(props){
    let lettersTable = [...props.letters]
    return(
        <Container>
        {lettersTable.map((value, i)=>(
            <SingleLetter key={i}>{value}</SingleLetter>
            )
        )}
        </Container>
    )
}