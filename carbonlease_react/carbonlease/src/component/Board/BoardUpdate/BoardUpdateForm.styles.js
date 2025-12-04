import styled from "styled-components";

export const FormArea = styled.div`
  min-height: 65vh;
  width: 800px;
  margin: 0 auto;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.06);
  font-family: 'NanumSquare', sans-serif;
`

export const BoardForm = styled.form`
  padding: 48px 48px 45px;
  display: flex;
  flex-direction: column;
  font-family: 'NanumSquare', sans-serif;
  gap: 16px;

  label {
    font-size: 20px;
  }

  input {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }

  textarea {
    height: 250px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dcdcdc;

    &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
    }
  }

  button {
    height: 50px;
    width: 120px;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  button[type='submit'] {
    background: #2ecc71;
  }
  button[type='submit']:hover {
    background: #27ae60;
  }

  button[type="button"] {
    background: #e0e0e0;
    color: #333;
  }
  button[type='button']:hover {
    background: #d0d0d0;
  }
`

export const SelectRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`

export const CategorySelectWrapper = styled.div`
  padding: 10px;
  flex: 1;
`

export const CategorySelectButton = styled.select`
  border-radius: 10px !important;
  border: 1px solid #dcdcdc !important;
  padding: 10px;
  width: 100%;

  &:focus {
      outline: none;
      border-color: #00a36f !important;
      box-shadow: 0 0 0 2px rgba(0,163,111,0.15) !important;
  }
`

export const ButtonSection = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
`

export const SelectLabel = styled.label`
  font-weight: bold;
  width: 100%;
`
