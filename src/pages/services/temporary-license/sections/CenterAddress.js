/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';
import GmapsAddress from 'src/components/gmap/GmapsAddress';
import WithGoogleApi from 'src/components/gmap/WithGoogleApi';
import { TextField as TextFieldFinal } from 'final-form-material-ui';

const sampleData = {
  vendorStreetAddress: {
    caption: '7546 Ad Daywan, Al Hamra, Riyadh 13216 2825, Saudi Arabia',
    heart: { lat: 24.774265, lng: 46.738586 },
  },
  vendorServiceAreas: [
    {
      caption: 'Kendall, Fl',
      heart: { lat: 25.664112, lng: -80.356857 },
      polygon: [
        { lat: 25.634253, lng: -80.388439 },
        { lat: 25.632716, lng: -80.309863 },
        { lat: 25.705581, lng: -80.304534 },
        { lat: 25.703632, lng: -80.387227 },
      ],
    },
    {
      caption: 'Coral Gables, Fl',
      heart: { lat: 25.746895, lng: -80.267322 },
      polygon: [
        { lat: 25.633666, lng: -80.303403 },
        { lat: 25.628092, lng: -80.28007 },
        { lat: 25.706354, lng: -80.242616 },
        { lat: 25.772882, lng: -80.254253 },
        { lat: 25.764537, lng: -80.288614 },
      ],
    },
  ],
};

const CenterAddress = ({ Condition }) => {
  const inputEl = useRef(null);
  const [streetAddr, setStreetAddr] = useState(sampleData.vendorStreetAddress);
  const getStreetAddrPartsFromGeoResult = (geoResult) => {
    console.log('odai');
    const addressArray = geoResult.address_components;
    const currentAddress = {
      area:
        (addressArray.find((x) => x.types.some((t) => ['sublocality_level_1', 'locality'].includes(t))) || {}).long_name
        || '',
      country: (addressArray.find((x) => x.types[0] === 'country') || {}).long_name || '',
      city: (addressArray.find((x) => x.types[0] === 'administrative_area_level_2') || {}).long_name || '',
      state: (addressArray.find((x) => x.types[0] === 'administrative_area_level_1') || {}).long_name || '',
      address: geoResult.formatted_address,
    };
    setStreetAddr(currentAddress);
    inputEl.current.value = 22;
    console.log(inputEl.current);
    return currentAddress;
  };
  const setFieldValue = (streetAddress) => {
    console.log('odai');
    console.log(JSON.stringify(streetAddress));
    console.log('odai');
  };
  return (
    <>
      <Grid
        container
        spacing={3}
        mt={3}
      >
        <Grid
          item
          md={12}
          xs={12}
        >
          <WithGoogleApi apiKey="AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw">
            <GmapsAddress value={streetAddr} onChange={setFieldValue} getStreetAddrPartsFromGeoResultMine={getStreetAddrPartsFromGeoResult} />
          </WithGoogleApi>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="رقم المبنى"
            name="buildNo"
            component={(props) => <TextFieldFinal {...props} ref={inputEl} />}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الشارع"
            name="street"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الحي"
            name="sub"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="المدينة"
            name="city"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <Field
            fullWidth
            required
            label="الرمز البريدي"
            name="postalCodde"
            component={TextFieldFinal}
            type="text"
            variant="outlined"
            dir="rtl"
            className="custom-field"
          />
        </Grid>
      </Grid>
    </>
  );
};
export default CenterAddress;

CenterAddress.propTypes = {
  Condition: PropTypes.func.isRequired,
};
