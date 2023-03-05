import styled from 'styled-components';
import { FormHelperText } from '@mui/material';

export const PassengerSelectorStyled = styled.div`
  .passenger-input-adornment {
    background-color: #c7d1f4;
    height: 21px;
    width: 21px;
    borderRadius: 4px;

    & :hover {
      height: 24px;
      background-color: #7786d2;
      padding: 0;
      border-radius: 0;
      overflow: hidden;
    }

    .MuiIconButton-root {
      transition: unset !important;
    }
    .MuiFormHelperText-root > .Mui-error {
      color: #d32f2f !important;
      margin: 0 !important;
  }

`;

export const ErrorMessage = styled(FormHelperText)`
  color: #d32f2f !important;
  margin: 0;
  height: 0;
`;
