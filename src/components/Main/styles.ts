import styled from 'styled-components';

export const Container = styled.div`
  padding: 2% 3%;
  width: 40vw;
  background-color: #001f3f;
  margin-top: 20%;
  border-radius: 6px;

  .formulario {
    display: grid;
    grid-template-columns: 90% 10%;
    justify-content: center;
    align-content: center;
    grid-column-gap: 6px;
  }

  input[type='text'] {
    width: 100%;
  }

  .btn {
    display: grid;
    justify-content: center;
    align-content: center;
    font-size: 26px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  .btn-bs {
    color: #dddddd;
    cursor: pointer;
  }
  .tabela {
    display: grid;
    width: 100%;
    margin-top: 5%;
    background-color: #dddddd;
    border-radius: 6px;
    padding: 1% 2%;
  }
  thead tr {
    display: grid;
    grid-template-columns: 70% 30%;
  }
  .row {
    display: grid;
    grid-template-columns: 5% 80% 5% 5% 5%;
    padding: 1% 3%;
    border-bottom: 1px solid #111111;
  }

  .btn-op {
    display: grid;
    justify-content: center;
    align-content: center;
    font-size: 18px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .btn-op:hover {
    background-color: #001f3f;
    color: #fff;
    border-radius: 3px;
  }

  .inputDesc {
    background: transparent;
    outline: none;
    border: none;
    color: #111111;
  }
`;
