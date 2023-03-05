import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Grid, Box, LinearProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';
import fetchDistanceData from '../../helpers/fetchDistanceData';
import calculateTotalDistance from '../../helpers/calculateTotalDistance';
import { DistanceData } from '../../types';
import { TripSummaryContainer, TripSummaryBox } from './styles';

import { IconGroup } from '../trip-planner-form/IconGroup';

const TripSummary = () => {
  const [searchParams] = useSearchParams();
  const [distances, setDistances] = useState<DistanceData[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const params = [...searchParams.entries()];

  useEffect(() => {
    setIsLoading(true);
    fetchDistanceData(params)
      .then((data) => {
        setDistances(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log(distances);

  return (
    <TripSummaryContainer>
      <TripSummaryBox>
        <Box>
          <Box mb={4}></Box>
          <Grid container spacing={2} className='summary-grid'>
            {distances?.map((dist, index) => (
              <Grid item xs={12} className='dist-grid-container' key={index}>
                <Grid item className='distance-calc-grid'>
                  <div id='chat-bubble'>
                    <Typography className='summary-distance'>
                      {dist.distance}
                      km
                    </Typography>
                  </div>
                </Grid>
                <Grid item sx={{ padding: 0, width: '44px' }}>
                  <IconGroup count={distances.length}></IconGroup>
                </Grid>

                <Grid item sx={{ padding: 0, margin: 0, width: '85px' }}>
                  <Typography className='summary-typography'>
                    {dist.origin}
                  </Typography>
                  <Typography className='summary-typography'>
                    {dist.destination}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <div>
            {error ? (
              <Box className='summary-error-message'>{error.message}</Box>
            ) : (
              <>
                {isLoading && (
                  <Box>
                    <LinearProgress />
                  </Box>
                )}

                {distances && (
                  <Typography className='dist-typography'>
                    <Typography component='span' className='summary-text'>
                      {`${calculateTotalDistance(distances)} km `}
                    </Typography>
                    is total distance
                  </Typography>
                )}
                <Typography className='pass-typography'>
                  <Typography className='summary-text' component='span'>
                    {`${searchParams.get('passengers')} `}
                  </Typography>
                  passengers
                </Typography>
                <Typography className='summary-text'>
                  {`${dayjs(searchParams.get('date')).format('MMM DD YYYY')}`}
                </Typography>
              </>
            )}
          </div>
        </Box>
        <Box mt={8} mb={3} style={{ textAlign: 'center' }}>
          <Link to='/' className='back-btn'>
            Back
          </Link>
        </Box>
      </TripSummaryBox>
    </TripSummaryContainer>
  );
};

export default TripSummary;
