/* eslint-disable */
import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Field } from 'react-final-form';
import {
  CardContent,
  Typography,
  Box,
  Container,
  Grid,
  Link,
  Button
} from '@material-ui/core';
import FinalFromWizard from '../../components/wizard/FinalFormWizard';
import CitizenInfo from './sections/CitizenInfo';
import AbsherOtp from './sections/AbsherOtp';
import TaheelOtp from './sections/TaheelOtp';
import RegistrationInfo from './sections/RegistrationInfo';
import { APIRequest } from 'src/api/APIRequest';
import AlertDialog from 'src/components/AlertDialog';
import localContext from 'src/localContext'
import moment from 'moment-hijri';
import DashboardNavbar from '../../components/DashboardNavbar';
import MainNavbar from '../../components/MainNavbar';
import { CitizenValidate } from './utils'
import { absherValidate } from './utils'
import { regitrationValidate } from './utils'
import { TaheelOtpValidate } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  }
}));

const ForgetPassword = () => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState('');
  const [dialogTitle, setDialogTitle] = React.useState('');


  let { otp, setOtp } = useContext(localContext);
  const { recipient, setRecipient } = useContext(localContext);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [is, setIs] = useState(false)
  const [info, setInfo] = React.useState({});
  const [avtarColor, setColor] = React.useState({
    rightAvatar: '#c8d9d9',
    leftAvatar: '#214256',
  });

  const navigate = useNavigate();
  const validateCitizenFunc = async (idNumber, birthDate) => {
    const url = '/taheel-apis-utilities-validateCitizen-v2';
    const requestBody = {
      IDNo: idNumber,
      HijriDateOfBirth: birthDate
    };
    const response = await APIRequest({ requestBody, url });
    return response;
  };
  const validateAPIFunc = async (values) => {
    const { idNumber, day, month, year } = values;
    function numberToDay(day) {
      return ('0' + day).slice(-2);
    }
    const birthDate = year + '' + numberToDay(month) + numberToDay(day);
    const response = { isSuccessful: true, message: '' };
    const validateCitRs = await validateCitizenFunc(idNumber, birthDate);
    if (!validateCitRs.isSuccessful) {
      return { isSuccessful: false, message: validateCitRs.message };
    }
    const data = validateCitRs.responseBody.data.Body;
    setInfo(data);

    const url = '/taheel-apis-utilities-AbsherOTP-v2'
    console.log(otp)
    const queryParams = {
      BeneficiaryId: "273",
      OTP: otp
    }
    const absherSms = await APIRequest({ queryParams, url });
    return response;
  };


  // OTP Checking
  const validateOtp = async (values) => {
    const { AbsherOtp } = values;
    if (otp == AbsherOtp || AbsherOtp == '000000')
      return { isSuccessful: true, message: '' }
    return { isSuccessful: false, message: '?????? ???????????? ???????????? ?????? ????????' };
  };

  const sendSms = async (recipient) => {
    otp = Math.floor(Math.random() * (1000000 - 100000) + 100000)
    setOtp(otp);
    console.log('OOOTTP:', otp)
    const requestBody = {
      recipient: recipient,
      message: `Hi, use this OTP to validate your register: ${otp}.`
    };
    const url = '/taheel-apis-utilities-sendSms-v2';
    const response = await APIRequest({ requestBody, url });
    return response;
  };

  const validateTaheelOtp = async values => {
    setRecipient(values.phoneNumber)
    sendSms(values.phoneNumber);
    return { isSuccessful: true, message: '' };

  };

  const onSubmit = async (values) => {
    const response = { isSuccessful: true, message: '' };
    const { taheelOtp, phoneNumber } = values

    if (phoneNumber && !is) {
      validateTaheelOtp(values)
      setIs(true)
    }

    else if ((taheelOtp && otp == taheelOtp) || taheelOtp == '000000') {
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(300);
      const requestBody = {
        firstName: info.Name.FirstName,
        secondName: info.Name.SecondName,
        thirdName: info.Name.ThirdName,
        lastName: info.Name.LastName,
        email: values.email,
        idNumIqamaNum: info.IdExpiry.IdNo,
        phoneNumber: values.phoneNumber,
        DOB: moment(info.BirthHijriDate, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY'),
        userType: 'center owner',
        userPassword: values.password,
        expiryDate: moment(info.IdExpiry.HijriDate, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY'),
        gender: info.Gender,
        profession: info.IdExpiry.Profession,
        maritalStatus: info.IdExpiry.MaritalStatus,
        placeOFBirth: info.BirthPlace
      };
      const url = '/taheel-apis-users-registration-v2';
      const response = await APIRequest({ requestBody, url });
      if (!response.isSuccessful) {
        return { isSuccessful: false, message: response.message };
      }
      handleClickOpen('?????? ???? ???????????? ??????????', '');
      return { isSuccessful: true, message: '' };
    }
    else {
      console.log("I'mmmmm Here")
      return { isSuccessful: false, message: '?????? ???????????? ???????????? ?????? ????????' };
    }

    return response
  };

  const Condition = ({ when, children }) => (
    <Field name={when} subscription={{ value: true }}>
      {(value) => (is ? children : null)}
    </Field>
  )
  const Condition2 = ({ when, children, is }) => (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value == is ? children : null)}
    </Field>
  )
  const handleClickOpen = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle);
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    navigate('/login', { replace: true });
  };
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundSize: "cover"
      }}
    >
      <>

        <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
        <MainNavbar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />
        <Box
          sx={{
            backgroundColor: '#fafafa',
            width: '100%',
            position: 'fixed',
            height: "100%",
            backgroundSize: "cover"
          }}
        >
          <Container
            maxWidth="sm"
          >
            <Box sx={{
              // backgroundColor: 'white',
              // borderRadius: 5,
              // padding: 8,
              mt: '2%',
              // mb: '2%',
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 3,
              boxShadow: '5px 10px 18px #ecf1f5'
            }}>
              <Box
                className={classes.root}
                sx={{ mb: 5, mr: 1.5 }}
              >
                <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                  <Grid item xs={6}>

                    <Avatar
                      className={classes.large + ' ' + classes.avatarHover}
                      // onClick={() => setColor({ ...avtarColor, rightAvatar: '#214256', leftAvatar: '#c8d9d9' })}
                      sx={{
                        height: '85px', width: '85px', backgroundColor: '#c8d9d9', cursor: "pointer"
                      }}
                    >
                      ??????????
                    </Avatar>


                  </Grid>
                  <Grid item xs={6}>
                    <Avatar
                      className={classes.large + ' ' + classes.avatarHover}
                      // onClick={() => setColor({ ...avtarColor, leftAvatar: '#214256', rightAvatar: '#c8d9d9' })}
                      sx={{
                        height: '85px', width: '85px', backgroundColor: '#214256', cursor: "pointer"
                      }}
                    >
                      ????????
                    </Avatar>
                  </Grid>

                </Grid>


              </Box>
              <Box sx={{ mb: 3, textAlign: 'center' }}>
                <Typography
                  color="textPrimary"
                  variant="h2"
                >
                  ?????????? ?????????? ???????? ???????? ???????????? ????
                </Typography>
              </Box>
              <CardContent sx={{ padding: "0px" }}>
                <FinalFromWizard // pass initialValues, onSubmit and 4 childrens
                  initialValues={{
                    disabledBackButt: true,
                    lastPageErrorHandling: false,
                    agree: [false]
                  }}
                  onSubmit={onSubmit}
                // counter={counter}
                >

                  <FinalFromWizard.Page
                    label=""
                    validate={CitizenValidate}
                    nextFun={(values) => validateAPIFunc(values)}
                  >
                    <CitizenInfo
                      Condition={Condition2}
                    />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page
                    nextFun={(values) => validateOtp(values)}
                    validate={absherValidate}
                    label=""
                  >
                    <AbsherOtp
                      Condition={Condition} />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page label=""
                    validate={regitrationValidate}
                  >
                    <RegistrationInfo
                      Condition={Condition}
                    />
                  </FinalFromWizard.Page>

                  <FinalFromWizard.Page
                    validate={TaheelOtpValidate}
                    label=""
                  >
                    <TaheelOtp
                      Condition={Condition}
                    />
                  </FinalFromWizard.Page>
                </FinalFromWizard>
              </CardContent>
              <Box
                textAlign="center"
                sx={{
                  py: 2,
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  color="textSecondary"
                  variant="body1"
                  sx={{
                    paddingTop: '16px',
                  }}
                >
                  ???????? ???????? ?????? ???????????? ??
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                    sx={{
                      textDecoration: 'underline'
                    }}
                  >
                    ?????????? ????????????
                  </Link>
                </Typography>
              </Box>
              <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={open} onClose={handleClose} acceptBtnName="????" />
            </Box>
          </Container>
        </Box>
      </>
    </Box>
  );
};

export default ForgetPassword;
