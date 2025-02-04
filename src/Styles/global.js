import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Kumar+One&family=Oswald:wght@200..700&family=Pacifico&display=swap');
* {
  box-sizing: border-box;
}
  
body {
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  font-family: "Roboto";
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-variation-settings: "wdth" 1000;
  margin: 0;
  padding: 0;
  transition: all 0.25s linear;
}
.pacifico-regular {
  font-family: "Pacifico", serif;
  font-weight: 400;
  font-style: normal;
}
.test {
  font-size: 15rem;
}
.canvas {
  display: grid;
  min-height: 100vh;
  grid-auto-flow: row;
  grid-template-row: auto 1fr auto;
  gap:0.5rem;
  padding:2rem;
  width:100vw;
  align-items:center;
  text-align:center;
}
  .type-box {
  display: block;
  max-width: 1000px;
  height: 140px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
   overflow-y: auto;
  padding: 10px; /* Adds padding for better visibility */
}

.words {
color:${({theme})=>theme.typeBoxTest}
 letter-spacing:0.02px; /* Adjust letter spacing */
  font-size: 32px;
  display: flex;
  flex-wrap: wrap;
  line-height: 1;
 
   /* Ensures proper spacing between lines */
}

.word {
  margin: 5px;
  padding-right: 2px;
  white-space: nowrap;
  letter-spacing: 2px; /* Adjust letter spacing */
}
  .hidden-input{
  opacity:0;
  }
  .current{
  border-left:1px solid;
  animation:blink 2s infinite;
  @keyframes blink{
  0%{border-left-color:${({theme})=>theme.textColor}}
  25%{border-left-color:${({theme})=>theme.background}}
  50%{border-left-color:${({theme})=>theme.textColor}}
  75%{border-left-color:${({theme})=>theme.background}}
  100%{border-left-color:${({theme})=>theme.textColor}}
  }
  }
  .current-r {
  border-right: 1px solid white ; /* Cursor appearance */
  animation: blink-right 2s infinite;
@keyframes blink-right{
  0%{border-right-color:${({theme})=>theme.textColor}}
  25%{border-right-color:${({theme})=>theme.background}}
  50%{border-right-color:${({theme})=>theme.textColor}}
  75%{border-right-color:${({theme})=>theme.background}}
  100%{border-left-color:${({theme})=>theme.textColor}}
  }
}
.correct{
  color:${({theme})=>theme.typeBoxTest};
}
.incorrect{
  color:yellow;
}
  .upper-menu{
  display:flex;
  width:1000px;
  margin-left:auto;
  margin-right:auto;
  font-size:1.25rem;
  justify-content:space-between;
  padding:0.8rem;
  }
  .modes{
  display:flex;
  gap:0.4rem;
  }
  .time-mode:hover{
  color:${({theme})=>theme.typeBoxTest};
  cursor:pointer;
  }
  .footer{
  display:flex;
  width:1000px;
  justify-content:space-between;
  margin-left:auto;
  margin-right:auto;
  padding:1.2rem;
  }
  .stats-box { 
  display: flex;
  width: 90%;
  max-width: 1000px;
  margin: auto; /* Center horizontally */
  background-color: ${({theme})=>theme.typeBoxTest}; /* Light background for contrast */
  border-radius: 12px; /* Rounded corners for a modern look */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.left-stats {
  width: 30%;
  padding: 30px; /* Reduced padding */
  border-right: 1px solid ${({theme})=>theme.background}; /* Divider between left and right */
}

.right-stats {
  width: 70%;
  padding: 30px; /* Reduced padding */
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-item {
  margin-bottom: 10px; /* Reduced margin */
}

.title {
  font-size: 20px; /* Slightly smaller font */
  font-weight: bold;
  color: ${({theme})=>theme.background}; /* Neutral color for readability */
  margin-bottom: 5px;
}

.subtitle {
  font-size: 24px; /* Slightly smaller font */
  font-weight: 600;
  color: ${({theme})=>theme.textColor}; /* Accent color for emphasis */
}

.placeholder {
  font-size: 14px; /* Slightly smaller font */
  color: #666;
}
.header{
width:1000px;
display:flex;
justify-content:space-between;
margin-left:auto;
margin-right:auto;
}


`;
