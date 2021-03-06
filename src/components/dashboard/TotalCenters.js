import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalCenters = (props) => {
  const { loading = false, totalcenters } = props;
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid  md={8} item>
            {loading ? (
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
                عدد المراكز
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {totalcenters}
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid  md={4} item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: '#103145',
                  height: 56,
                  width: 56
                }}
              >
                <LocationCityOutlinedIcon />
              </Avatar>
            ) : (
              <Skeleton animation="wave" variant="circle" height={56} width={56} />
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalCenters;

TotalCenters.propTypes = {
  loading: PropTypes.bool.isRequired,
  totalcenters: PropTypes.number.isRequired
};
