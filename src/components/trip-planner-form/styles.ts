import styled from 'styled-components';
import { Paper } from '@mui/material';
import { sizes } from '../../helpers/responsiveSizes';

export const TripSearchContainer = styled(Paper)`
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
  box-shadow: none;
  margin: 96px;
  padding-left: 48px;
  padding-right: 48px;
  padding-top: 72px;
  padding-bottom: 72px;
  max-width: 712px;

  .submit-trip-btn {
    background: #374151;
  }
  .submit-trip-btn:hover {
    background: #1d2431;
  }
  .MuiFormLabel-root,
  .MuiInputLabel-root {
    font-family: 'Inter', sans-serif;
  }
  .date-label {
    padding-top: 21px !important;
  }

  .origin-grid {
    padding-right: 40px;
  }
  .passengners-label {
    margin-bottom: 23px;
  }
  .delete-btn {
    position: absolute;
    color: #7786d2;
    right: 27px;
    top: 128px;
    z-index: 3;
  }

  @media (max-width: ${sizes.tablet}) {
    background-color: #fff !important;
    padding-left: 48px;
    padding-right: 48px;
    padding-top: 72px;
    padding-bottom: 72px;
    margin-top: 39%;

    .icon-grid-container {
      justify-content: space-between;
    }

    .origin-grid {
      max-width: unset;
      padding-right: unset;
    }
    .passenger-date-grid {
      display: contents;
    }

    .submit-trip-btn {
      width: 100%;
      margin-top: 36px;
    }
    .passengners-label {
      max-width: 46%;
    }
    .date-label {
      max-width: 46%;
    }

    .add-destionation-btn {
      position: relative;
      right: 78%;
      bottom: 20px;
    }

    @media (max-width: ${sizes.mobileL}) {
      .passengners-label {
        max-width: unset;
      }
      .date-label {
        max-width: unset;
      }
    }
    @media (max-width: ${sizes.mobileM}) {
      .passengners-label {
        max-width: unset;
      }
      .add-destionation-btn {
        position: relative;
        right: unset;
        bottom: 20px;
      }
      .icon-grid {
        display: none;
      }
    }
  }
`;
