/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Link,
  Box,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import AlertDialog from 'src/components/AlertDialog';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FieldArray } from "react-final-form-arrays";
import FormDialog from 'src/components/FormDialog';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddPersonForm from './AddPersonForm';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { downloadDocument } from '../../services/finalLicenseAPI'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { DownloadButtTable } from '../../services/finalLicenseUtil'
import moment from 'moment-hijri';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const Row = ({ editMode, SponsorName, setSponsorName, values, fromEdit, setFromEdit, fieldName, setFieldName, open, setOpen, setField, fields, name, index }) => {
  const classes = useRowStyles();
  const [showen, setShowen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>

      <TableRow className={classes.root}  >
        {console.log("name", fields.value[index].cv)}
        <Field
          label="fullName"
          name={`${name}.fullName`}
          component={CustomTableCell}
        />

        {!fields.value[index].idNumber ?
          <>
            {setSponsorName(true)}
            <Field
              label="iqamaNo"
              name={`${name}.iqamaNo`}
              component={CustomTableCell}
            />
          </>
          :
          <Field
            label="idNumber"
            name={`${name}.idNumber`}
            component={CustomTableCell}
          />
        }

        <TableCell >

          {moment(`${fields.value[index].birthDate}`, 'iYYYYiMMiDD').format('iDD/iMM/iYYYY')}
        </TableCell>

        <Field
          label="staffTypes"
          name={`${name}.staffTypes`}
          component={CustomTableCell}
        />
        <Field
          label="gender"
          name={`${name}.gender`}
          component={CustomTableCell}
        />

        <Field
          label="nationality"
          name={`${name}.nationality`}
          component={CustomTableCell}
        />
        {SponsorName &&
          <Field
            label="sponsorName"
            name={`${name}.sponsorName`}
            component={CustomTableCell}
          />

        }


        <TableCell >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton onClick={() => setShowen(!showen)}>
                {showen ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={() => {
                  setFromEdit(true)
                  console.log("-- name :" + name);
                  setFieldName(name);
                  console.log('fields.value[index]', JSON.stringify(fields));
                  const { idNumber, iqamaNo, lastName, nationality, day, month, year, fullName, gender, birthDate, staffTypes, cv, EducationalQualification, MedicalPractice, sponsorName } = fields.value[index];
                  console.log('>>>>>>--EducationalQualification....', fields.value[index])
                  // setField("fullName", fullName);
                  setField("idNumber", idNumber);
                  setField("iqamaNo", iqamaNo);
                  setField("nationality", nationality)
                  setField("day", day);
                  setField("month", month);
                  setField("year", year);
                  setField("fullName", fullName)
                  setField("gender", gender)
                  setField("sponsorName", sponsorName)
                  setField("birthDate", birthDate)
                  setField("staffTypes", staffTypes)
                  setField("cv", cv)
                  setField("EducationalQualification", EducationalQualification)
                  setField("MedicalPractice", MedicalPractice)

                  handleClickOpen();
                }}
              >
                <EditIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              lg={3}
              md={3}
              xs={12}
            >
              <IconButton
                color="primary"
                component="span"
                onClick={() => {
                  var customers = [...values.customers]
                  fields.remove(index);
                  var managersCount = values.customers.filter(customer => customer.staffTypes === "????????").length
                  { console.log('Delete  values.customers.', values.customers) }
                  setField('managersCount', managersCount)
                  setField("nationality", "")
                  setField("idNumber", "");
                  setField("iqamaNo", "");
                  setField("day", "");
                  setField("month", "");
                  setField("year", "");
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={showen} timeout="auto" unmountOnExit  >

            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
              >
                < DownloadButtTable docIDs={fields.value[index].cv} name={`${name}.cv`} label='???????????? ??????????????' />


                {/* <Button
                name={`${name}.cv`}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                onClick={() => downloadFileFn(fields.value[index].cv)}
              >
                ??????????
          </Button> */}

              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                < DownloadButtTable docIDs={fields.value[index].EducationalQualification} name={`${name}.EducationalQualification`} label='???????????????? ??????????????????' />

                {/* <Button
                name={`${name}.EducationalQualification`}
                variant="contained"
                color="primary"
                startIcon={<CloudDownloadIcon />}
                onClick={() => downloadFileFn(fields.value[index].EducationalQualification)}
              >
                ??????????
          </Button> */}

              </Grid>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}

              >
                {['???????????? ???????? ??????????', '???????????? ???????? ??????????', '???????????? ?????? ?? ??????????'].includes(fields.value[index].staffTypes) &&
                  < DownloadButtTable docIDs={fields.value[index].MedicalPractice} name={`${name}.MedicalPractice`} label='???????? ????????????????' />

                  //   <Button
                  //     name={`${name}.MedicalPractice`}
                  //     variant="contained"
                  //     color="primary"
                  //     startIcon={<CloudDownloadIcon />}
                  //     onClick={() => downloadFileFn(fields.value[index].MedicalPractice)}
                  //   >
                  //     ??????????
                  //  </Button>
                }
              </Grid>
            </Grid>
          </Collapse >
        </TableCell>
      </TableRow>

    </>)

}
const managersCountComp = ({ }) => (
  <span>
    <IconButton>
      <FieldArray name="customers">
        {({ fields }) => {
          let count = 0;
          if (fields.value) {
            count = fields.value.filter(customer => customer.staffTypes === "????????").length
          }
          if (count > 0) {
            if (count === 1) {
              return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);
            } else
              return (<CancelIcon style={{ color: 'red' }} />);
          }
          return (<CheckCircleIcon style={{ color: 'gray' }} />);
        }}
      </FieldArray>
    </IconButton>
  </span>

)
const teachersCountComp = ({ maxValue }) => (
  <span>
    <IconButton>
      <FieldArray name="customers">
        {({ fields }) => {
          let count = 0;
          if (fields.value) {
            count = fields.value.filter(customer => customer.staffTypes === "???????? ?????????? ???????? ").length
          }
          if (count >= 1) {
            if ( maxValue/ 8 <= count) {
              return (<CheckCircleIcon style={{ color: '#04AA6D' }} />);
            } else
              return (<CancelIcon style={{ color: 'red' }} />);
          }
          return (<CheckCircleIcon style={{ color: 'gray' }} />);
        }}
      </FieldArray>
    </IconButton>
  </span>

)

const PersonDetials = ({ Condition, MedicalPracticeCondition, setField, pop, push, values }) => {
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [fromEdit, setFromEdit] = React.useState(false)
  const [SponsorName, setSponsorName] = React.useState(false)
  const [dialogContent, setDialogContent] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const [openInfo, setOpenInfo] = React.useState(false);
  var [managersCount, setManagersCount] = React.useState(0);

  React.useEffect(() => {
    console.log("I'mmmm Here ppppppoooooooooooooopuuuuuuuup")
    handleClickOpenInfo(`???? ?????? ???????????? ???????????? ???????? ?????????????? ?????????? ???? ???????????? (???????????? ?? ????????????) ???????? ???????????? ???? ?????? ?????????? ?????????? ???????????? ?????? ????????" ?????? ?????????? ????????????`, '')
  }, [])

  // const getMangersAcount = () => {
  //   if(values.customers){
  //    managersCount = values.customers.filter(customer => customer.staffTypes === "????????").length
  //   console.log('Delete  values.customers.', values.customers) 
  //   // setManagersCount(managersCount)
  //             setField('managersCount', managersCount)

  //   }
  // }


  useEffect(() => {
    handleClickOpenInfo(`???? ?????? ???????????? ???????????? ???????? ?????????????? ?????????? ???? ???????????? (???????????? ?? ????????????) ???????? ???????????? ???? ?????? ?????????? ?????????? ???????????? ?????? ????????" ?????? ?????????? ????????????`, '')
  }, [])


  const handleClickOpenInfo = (dialogContent, dialogTitle) => {
    setDialogContent(dialogContent);
    setDialogTitle(dialogTitle)
    setOpenInfo(true);
  };
  const handleCloseInfo = (value) => {
    setOpenInfo(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <Grid
      container
      mt={4}
      spacing={3}
    >
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      >
        <Typography
          color="textSecondary"
          variant="h2"

        >?????????????? ?????????? ??????????????</Typography>
        <Typography
          color="textSecondary"
          variant="body1"
          sx={{
            mt: 3
          }}

        >
          <Field
            label={'manager'}
            name={'managersCount'}
            component={managersCountComp}
          />
          ???????? ?????? 1
          <Link
            onClick={() => handleClickOpenInfo(`???????? ???????????? ?????? ???????? #1 ??????  `, '')}
            sx={{
              mt: 3,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            ???????????? ???? ??????????????????
          </Link>
        </Typography>

        <Typography
          color="textSecondary"
          variant="body1"

        >
        
          {/* '#04AA6D' teachersCountComp*/}
          <Field
            label={'teachers'}
            name={'teachersCount'}
            component={teachersCountComp}
            maxValue={values.beneficiariesNum}
          />
          ???????? ?????????? ???????? ???????? 1 ?????? 8
          <Link
            onClick={() => handleClickOpenInfo(`-???????? ???????????? ?????????????? ?????? # ???????? ???????? ?????????? ???????? ???????? ?????? : 

         (?????? ?????????? 1 ?????? 8 ???????????? ???? ?????? ???????????????????? ?????????????? )`, '')}
            sx={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            variant="h6"
          >
            ???????????? ???? ??????????????????
          </Link>
        </Typography>
        <Button
          sx={{ mt: 5 }}
          variant="outlined"
          color="primary"
          fullWidth
          endIcon={<AddIcon style={{ marginRight: 10 }} />}
          onClick={() => {
            setFromEdit(false)
            setField("nationality", "")
            setField("nationalityBtn", "")
            setField("idNumber", "");
            setField("iqamaNo", "");
            setField("day", "");
            setField("month", "");
            setField("year", "");
            setField("fullName", "")
            setField("gender", "")
            setField("sponsorName", "")
            setField("birthDate", "")
            setField("staffTypes", "")
            setField("cv", "")
            setField("EducationalQualification", "")
            setField("MedicalPractice", "")
            setFieldName(null);
            handleClickOpen();
          }}
        >
          ?????????? ????????
        </Button>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        className="custom-label-field"
      >
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell > ?????????? ???????????? </TableCell>
                <TableCell > ?????? ????????????/???????????????? </TableCell>
                <TableCell > ?????????? ?????????????? </TableCell>
                <TableCell > ?????? ???????????? </TableCell>
                <TableCell > ?????????? </TableCell>
                <TableCell > ??????????????</TableCell>
                {SponsorName &&
                  <TableCell > ?????? ????????????</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>

              <FieldArray name="customers">
                {({ fields }) => fields.map((name, index) => (
                  <Row editMode={editMode} managersCount={managersCount} setManagersCount={setManagersCount} SponsorName={SponsorName} setSponsorName={setSponsorName} values={values} fromEdit={fromEdit} setFromEdit={setFromEdit} fieldName={fieldName} setFieldName={setFieldName} open={open} setOpen={setOpen} setField={setField} fields={fields} name={name} index={index} />
                ))}
              </FieldArray>

            </TableBody>
          </Table>
        </TableContainer>
        <AlertDialog dialogContent={dialogContent} dialogTitle={dialogTitle} open={openInfo} onClose={handleCloseInfo} acceptBtnName="????" />

      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        className="custom-label-field"
      />
      <FormDialog
        title=" ?????????? ????????"
        openPopup={open}
        setOpenPopup={setOpen}
        onClose={() => {
          setField("nationality", "")
          setField("nationalityBtn", "")
          setField("idNumber", "");
          setField("iqamaNo", "");
          setField("day", "");
          setField("month", "");
          setField("year", "");
          setField("fullName", "")
          setField("gender", "")
          setField("sponsorName", "")
          setField("birthDate", "")
          setField("staffTypes", "")
          setField("cv", "")
          setField("EducationalQualification", "")
          setField("MedicalPractice", "")
        }}
      >
        <AddPersonForm fromEdit={fromEdit} MedicalPracticeCondition={MedicalPracticeCondition} setField={setField} index={index} pop={pop} push={push} values={values} setOpenPopup={setOpen} fieldName={fieldName} Condition={Condition} />
      </FormDialog>
    </Grid>
  );
};
const CustomTableCell = ({ input: { value, name }, label }) => (
  <>
    <TableCell component="th" scope="row">
      {value}
    </TableCell>
  </>
)
export default PersonDetials;
PersonDetials.propTypes = {
  Condition: PropTypes.func.isRequired,
  setField: PropTypes.func.isRequired,
  pop: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
  input: PropTypes.func.isRequired,
};
