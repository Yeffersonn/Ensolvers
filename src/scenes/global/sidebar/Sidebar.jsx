import { useState } from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
} from "../../../../node_modules/react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
// import "../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import NotesIcon from '@mui/icons-material/Notes';
import CategoryIcon from '@mui/icons-material/Category';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StarRateIcon from '@mui/icons-material/StarRate';
import PendingIcon from '@mui/icons-material/Pending';
import DoneAllIcon from '@mui/icons-material/DoneAll';
/* NEW IMPORTS */
import { useSidebarContext } from "./sidebarContext";
import { useProSidebar } from "../../../../node_modules/react-pro-sidebar";

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
            routerLink={<Link to={to} />}
        >
            <Typography>{title}</Typography>
            {/* <Link to={to} /> */}
        </MenuItem>
    );
};

const MyProSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [isCollapsed, setIsCollapsed] = useState(false);
    const { sidebarRTL, setSidebarRTL, sidebarImage } = useSidebarContext();
    const [selected, setSelected] = useState("Inicio");
    const { collapseSidebar, toggleSidebar, collapsed, broken } =
        useProSidebar();

    return (
        <Box
            sx={{
                position: "sticky",
                display: "flex",
                height: "100vh",
                gap:'.5rem',
                top: 0,
                bottom: 0,
                zIndex: 100,
                "& .sidebar": {
                    border: "none",
                },
                "& .menu-icon": {
                    backgroundColor: "transparent !important",
                },
                "& .menu-item": {
                    // padding: "5px 35px 5px 20px !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-anchor": {
                    color: "inherit !important",
                    backgroundColor: "transparent !important",
                },
                "& .menu-item:hover": {
                    color: `${colors.blueAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
                "& .menu-item.active": {
                    color: `${colors.greenAccent[500]} !important`,
                    backgroundColor: "transparent !important",
                },
            }}
        >
            <Sidebar
                breakPoint="xxl"
                rtl={sidebarRTL}
                backgroundColor={colors.primary[400]}
                image={sidebarImage}
            >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        icon={
                            collapsed && (
                                <MenuOutlinedIcon
                                    onClick={() => collapseSidebar()}
                                />
                            )
                        }
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!collapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography
                                    variant="h3"
                                    color={colors.grey[100]}
                                >
                                    USER
                                </Typography>
                                <IconButton
                                    onClick={
                                        broken
                                            ? () => toggleSidebar()
                                            : () => collapseSidebar()
                                    }
                                >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>
                    {/* USER */}
                    {!collapsed && (
                        <Box mb="25px">
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={`/assets/user.png`}
                                    style={{
                                        cursor: "pointer",
                                        borderRadius: "50%",
                                    }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h3"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    Usuario
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={collapsed ? undefined : "10%"}>
                        <Item
                            title="Inicio"
                            to="/"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            Data
                        </Typography>
                        <Item
                            title="Notas Archivadas"
                            to="/archivados"
                            icon={<ArchiveOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Notas Activas"
                            to="/activos"
                            icon={<NotesIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
												<Typography
                            variant="h6"
                            color={colors.grey[300]}
                            sx={{ m: "15px 0 5px 20px" }}
                        >
                            categorías
                        </Typography>
                        <Item
                            title="Importantes"
                            to="/importantes"
                            icon={<StarRateIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Pendientes"
                            to="/pendientes"
                            icon={<PendingIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Terminados"
                            to="/terminados"
                            icon={<DoneAllIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export { MyProSidebar };
