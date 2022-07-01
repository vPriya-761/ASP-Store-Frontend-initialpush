import { Box } from "@mui/system";

const FlexBox = ({ key, children, ...props }) => (
  <Box display="flex" {...props} key={key}>
    {children}
  </Box>
);

FlexBox.defaultProps = {
  display: "flex",
};
export default FlexBox;
