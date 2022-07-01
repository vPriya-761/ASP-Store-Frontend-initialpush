import TableRow from "components/TableRow";
import { H5 } from "components/Typography";
import East from "@mui/icons-material/East";
import { Chip, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";
import Link from "next/link";
import React from "react"; // component props interface
import { useAppContext } from "contexts/app/AppContext";

const OrderRow = ({ item }) => {
  const { state } = useAppContext();
  const findStatus = (statusId) => {
    const res = state?.orderStatus?.statues?.find(({ id }) => id === statusId);
    return res?.name.toLowerCase();
  };
  const getColor = (status) => {
    switch (status) {
      case 2:
        return "secondary";

      case 1:
        return "success";

      case -1:
        return "error";

      default:
        return "";
    }
  };

  return (
    <Link href={`/orders/${item.source_id}`}>
      <a>
        <TableRow
          sx={{
            my: "1rem",
            padding: "6px 18px",
          }}
        >
          <H5 m={0.75} textAlign="left">
            {item.source_id}
          </H5>
          <Box m={0.75}>
            <Chip
              size="small"
              label={findStatus(item.status)}
              sx={{
                p: "0.25rem 0.5rem",
                fontSize: 12,
                color: !!getColor(item.status)
                  ? `${getColor(item.status)}.900`
                  : "inherit",
                backgroundColor: !!getColor(item.status)
                  ? `${getColor(item.status)}.100`
                  : "none",
              }}
            />
          </Box>
          <Typography className="pre" m={0.75} textAlign="left">
            {format(new Date(item?.order_confirmed_at), "MMM dd, yyyy")}
          </Typography>
          <Typography m={0.75} textAlign="left">
            Rs {(item.total_price + item.total_shipping_price).toFixed(2)}
          </Typography>

          <Typography
            textAlign="center"
            color="grey.600"
            sx={{
              flex: "0 0 0 !important",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            <IconButton>
              <East fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>
      </a>
    </Link>
  );
};

export default OrderRow;
