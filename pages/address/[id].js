import { Container } from "@mui/material";
import AddressEditor from "components/address/AddressEditor";
import React from "react";
import { getCountries } from "utils/api/profile-apis/profileAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import DashboardLayout from "components/layout/CustomerDashboardLayout";

const AddressUpdater = (props) => {
  const { countryList } = props;
  const router = useRouter();
  const locationDetails = JSON?.parse(router?.query?.locationDetails);
  return (
    <DashboardLayout
    >
      <AddressEditor
        countryList={countryList}
        locationDetails={locationDetails}
      />
    </DashboardLayout>
  );
};
export async function getServerSideProps({ req, res }) {
  const auth_token = getCookie("token", { req, res }) || null;
  const countryList = await getCountries(auth_token);
  return {
    props: {
      countryList,
    },
  };
}
export default AddressUpdater;
