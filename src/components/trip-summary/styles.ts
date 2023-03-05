import styled from 'styled-components';
import { Paper, Box } from '@mui/material';
import { sizes } from '../../helpers/responsiveSizes';

export const TripSummaryContainer = styled(Paper)`
  box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
    0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
  margin: 96px;
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 32px;
  padding-bottom: 32px;
  min-width: 712px;
  max-width: 400px;
  border-radius: 16px;
  background-color: #fff;
`;

export const TripSummaryBox = styled(Box)`
  min-width: 400;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-items: space-between;
  text-align: center;
  min-height: 373px;

  .summary-grid {
    justify-content: center;
    margin-bottom: 7px;
  }
  .summary-text {
    font-weight: bold;
    color: #7786d2;
    font-family: Inter;
  }
  .dist-grid-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .distance-calc-grid {
    padding: 0;
    width: 165px;
    text-align: start;
  }
  .dist-typography {
    margin-bottom: 10px;
    font-family: Inter;
  }
  .pass-typography {
    margin-bottom: 14px;
    margin-top: 14px;
    font-family: Inter;
  }
  .summary-typography {
    font-family: Inter;
    font-weight: 400;
    font-size: 15px;
    letter-spacing: 0.00938em;
    margin-bottom: 16px;
    text-align: start;
  }
  .summary-distance {
    font-weight: 100;
    color: #7786d2;
    font-size: 16px;
    text-align: center;
    font-family: Inter;
  }
  .summary-error-message {
    color: #7786d2;
    text-align: center;
    font-family: Inter;
  }

  .back-btn {
    background: #374151;
    color: white;
    text-decoration: none;
    width: 58px;
    height: 38px;
    padding: 8px 12px;
    border-radius: 4px;
  }

  #chat-bubble {
    width: 120px;
    background: white;
    position: relative;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    border: 1px solid #3a5fcd;
  }

  @media (max-width: ${sizes.tablet}) {
    .back-btn {
      padding: 8px 112px;
    }
  }
`;
