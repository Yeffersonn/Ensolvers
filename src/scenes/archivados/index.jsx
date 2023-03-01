import {
	Box,
	Button,
	IconButton,
	Typography,
	useTheme,
	useMediaQuery,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Snackbar,
	Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { Header } from "../../components/Header";
import SpeakerNotesSharpIcon from "@mui/icons-material/SpeakerNotesSharp";
import { StatBox } from "../../components/StatBox";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import MuiAlert from "@mui/material/Alert";

const Archivados = ({ notes, setNotes }) => {
	const theme = useTheme();
	const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
	const smScreenDown = useMediaQuery(theme.breakpoints.down("sm"));
	const mdScreenDown = useMediaQuery(theme.breakpoints.down("md"));
	const lgScreenDown = useMediaQuery(theme.breakpoints.down("lg"));
	const xlScreenDown = useMediaQuery(theme.breakpoints.down("xl"));
	const colors = tokens(theme.palette.mode);

	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState("");
	const [description, setDescription] = React.useState("");

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const saveNote = () => {
		if (title && description) {
			const newNote = {
				title: title,
				description: description,
				completed: false,
				archive: false,
				category: "",
			};
			notes.unshift(newNote);
			handleSnackBarSucess();
			setTitle("");
			setDescription("");
			setOpen(false);
		} else {
			handleSnackBar();
		}
	};

	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});
	const AlertSucess = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});

	const [snackBar, setSnackBar] = React.useState(false);

	const handleSnackBar = () => {
		setSnackBar(true);
	};

	const handleSnackBarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackBar(false);
	};

	const [snackBarSucess, setSnackBarSucess] = React.useState(false);

	const handleSnackBarSucess = () => {
		setSnackBarSucess(true);
	};

	const handleSnackBarSucessClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackBarSucess(false);
	};

	return (
		<Box m="20px">
			{/* HEADER */}

			<Box
				display={smScreen ? "flex" : "block"}
				flexDirection={smScreen ? "row" : "column"}
				justifyContent={smScreen ? "space-between" : "start"}
				alignItems={smScreen ? "center" : "start"}
				m="10px 0"
			>
				<Header
					title="Notas Archivadas"
					subtitle="Aquí podrás encontrar todas tus notas archivadas"
				/>
			</Box>
			{/* Notes*/}
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
				{notes.filter(note => note.archive).map(note => {

					return (
						<Grid xs={12} sm={12} md={6} lg={6} xl={3} key={note.id}>
							<Paper elevation={3}>
								<Box
									width="100%"
									backgroundColor={colors.primary[400]}
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<StatBox
										id={note.id}
										title={note.title}
										description={note.description}
										completed={note.completed}
										notes={notes}
										setNotes={setNotes}
										icon={
											<SpeakerNotesSharpIcon
												sx={{
													color: colors.greenAccent[600],
													fontSize: "26px",
												}}
											/>
										}
									/>
								</Box>
							</Paper>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export { Archivados };

