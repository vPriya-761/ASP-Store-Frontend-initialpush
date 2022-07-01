import DashboardLayout from "components/layout/CustomerDashboardLayout";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import Place from "@mui/icons-material/Place";
import { Button } from "@mui/material";
import React, { useState } from "react";
import AddressCards from "components/address/AddressCards";
import AddressEditor from "components/address/AddressEditor";
import {
  getCustomerLocations,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { useRouter } from "next/router";
import { useCallback } from "react";

const AddressList = (props) => {
  const { locationsList, countryList, page, limit, auth_token } = props;
  const [editLocation, setEditLocation] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [createLocation, setCreateLocation] = useState(false);
  const { asPath, reload } = useRouter();
  const refreshData = useCallback(() => reload(asPath), [asPath]);

  return (
    <DashboardLayout authToken={auth_token}>
      {editLocation === false && createLocation === false && (
        <DashboardPageHeader
          title="My Addresses"
          icon={Place}
          button={
            <Button
              color="primary"
              sx={{
                bgcolor: "primary.light",
                px: "2rem",
              }}
              onClick={() => {
                setCreateLocation(true);
              }}
            >
              Add New Address
            </Button>
          }
          navigation={<CustomerDashboardNavigation />}
        />
      )}
      {editLocation === false && createLocation === false && (
        <AddressCards
          locationsList={locationsList}
          setEditLocation={setEditLocation}
          setSelectedAddress={setSelectedAddress}
          refreshData={refreshData}
        />
      )}
      {(editLocation === true || createLocation === true) && (
        <AddressEditor
          countryList={countryList}
          setEditLocation={setEditLocation}
          selectedAddress={selectedAddress}
          editLocation={editLocation}
          setCreateLocation={setCreateLocation}
          refreshData={refreshData}
        />
      )}
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const locationsList = await getCustomerLocations(auth_token);
  const countryList = await getCountries(auth_token);
  return {
    props: {
      locationsList,
      countryList,
      auth_token,
    },
  };
}
export default AddressList;
