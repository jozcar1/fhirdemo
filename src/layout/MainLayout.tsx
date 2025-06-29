import { Box, Toolbar } from "@mui/material";
import Header from "../component/Header/Header";
const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Header />
        <Box component="main" sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
            {children}
        </Box>
    </>
)
export default MainLayout;