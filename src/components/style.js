import styled from 'styled-components'

export const MovieContainer = styled.div `
width: 100%;
max-width:1200px;
margin:auto;
`;

export const Movieul = styled.div `
ul{
    margin: 20px 0;
    padding: 10px;
    background-color: #edf2f3;
    list-style-type: none;
    border-radius:3px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-flow: row dense;
        li{
            background-color:#fff;
            margin: 5px;
            padding: 10px;
            border-radius: 3px;
            cursor:pointer;
            transition:0.5s ease;
                &:hover{
                        background-color:#a3c6e4;
                }
        }
}
`;

export const LoadWrapper = styled.div `
display:flex;
justify-content:center;
align-items:center;
width:100%;
padding:10px;
`;

export const FormContainer = styled.div `
background-color:#ebeff3;
width:100%;
max-width:1200px;
margin:auto;
padding:10px;
    form{
        max-width: 500px;
        width: 100%;
        margin: auto;
        background-color: rgba(255,255,255,.9);
        border-radius: 3px;
        transition:0.5s ease;
        padding: 10px;
            &:hover{
                box-shadow: 0px 0px 10px rgba(0,0,0,.2);
            }
    }
`;

export const FormEl = styled.div `
padding:5px 10px;
    input, textarea, button, select{
        width:100%;
        border:none;
        border-radius:3px;
        border:1px rgba(0,0,0,.2) solid;
        padding:5px;
    }
`;

export const LoadScreen = styled.div `
position:absolute;
top:0;
transform:translate(-50%);
left:50%;
z-index:3;
width:100%;
height:100vh;
background-color:rgba(0,0,0,.8);
`;