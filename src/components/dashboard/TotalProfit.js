import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';

const TotalProfit = (props) => {
  const { loading = false } = props;
  return (
    <Card>
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            {loading ? (
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h5"
              >
                مجموع الرباح
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={200} style={{ marginBottom: 6 }} />
            )}
            {loading ? (
              <Typography
                color="textPrimary"
                variant="h3"
              >
                $23,200
              </Typography>
            ) : (
              <Skeleton animation="wave" height={10} width={100} style={{ marginTop: 10 }} />
            )}
          </Grid>
          <Grid item>
            {loading ? (
              <Avatar
                sx={{
                  backgroundColor: indigo[500],
                  height: 56,
                  width: 56
                }}
              >
                <AttachMoneyIcon />
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

export default TotalProfit;

TotalProfit.propTypes = {
  loading: PropTypes.bool.isRequired,
};
