import {
    Avatar,
    Badge,
    Box,
    IconButton,
    InputAdornment,
    Link,
    styled,
    TextField,
    useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useProSidebar } from "../../../node_modules/react-pro-sidebar";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}));

const TopBar = () => {
    const theme = useTheme();
    const mode = theme.palette.mode;
    const colors = tokens(mode);
    const colorMode = useContext(ColorModeContext);
    const { toggleSidebar, broken } = useProSidebar();

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                justifyContent="flex-start"
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                {broken && (
                    <IconButton
                        sx={{
                            margin: "0 6 0 2",
                            backgroundColor:
                                mode === "dark" ? colors.primary[500] : "white",
                            borderRadius: "0",
                        }}
                        onClick={() => toggleSidebar()}
                    >
                        <MenuOutlinedIcon />
                    </IconButton>
                )}
                {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>  */}
            </Box>

            {/* ICONS */}
            <Box display="flex" alignItems="center" gap="1px">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                >
                    <Avatar
                        alt="Remy Sharp"
                        src="/assets/user.png"
                    />
                </StyledBadge>
            </Box>
        </Box>
    );
};

export { TopBar };
