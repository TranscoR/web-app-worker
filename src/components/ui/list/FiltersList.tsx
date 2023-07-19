import Animation from "@/components/animation/Animation";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { type Children } from "@/types";

const Index = ({ children }: Children) => {
  return (
    <Animation>
      <Box mb={4} mt={4}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
        >
          {children}
        </Stack>
      </Box>
    </Animation>
  );
};

export default Index;
