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

const Inicio = ({ notes, setNotes }) => {
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

	const idCreated = () => {
		const noteId = notes.find(note => notes.length == note.id)

		return noteId.id + 1
	}

	const saveNote = () => {

		const newNotes = [...notes];

		if (title && description) {
			const newNote = {
				id: idCreated(),
				title: title,
				description: description,
				completed: false,
				archive: false,
				category: "",
			};
			newNotes.unshift(newNote);
			setNotes(newNotes);
			handleSnackBarSucess();
			setTitle("");
			setDescription("");
			setOpen(false);
		} else {
			handleSnackBar();
		}

		console.log(notes)
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
					title="Inicio"
					subtitle="Aquí podrás ver, editar, archivar y categorizar tus notas"
				/>

				<Box>
					<Button
						onClick={handleClickOpen}
						fullWidth={smScreen ? false : true}
						sx={{
							backgroundColor: colors.blueAccent[700],
							color: colors.grey[100],
							fontSize: "14px",
							fontWeight: "bold",
							padding: "10px 20px",
						}}
					>
						<AddIcon sx={{ mr: "10px" }} />
						Crear Nueva Nota
					</Button>
					<Dialog open={open} onClose={handleClose}>
						<DialogTitle>Crear Nueva Nota</DialogTitle>
						<DialogContent>
							<DialogContentText>
								Completa todos los campos para crear una nueva nota, deberás
								definir un título y una descripción para tu nota
							</DialogContentText>
							<TextField
								autoFocus
								margin="dense"
								id="título"
								label="Título - (max: 20 carácteres)"
								type="text"
								fullWidth
								variant="outlined"
								color="secondary"
								required
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								inputProps={{ maxLength: 20 }}
							/>
							<TextField
								margin="dense"
								id="decripción"
								label="Descripción"
								type="text"
								fullWidth
								variant="outlined"
								color="secondary"
								multiline
								rows={4}
								required
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</DialogContent>
						<DialogActions sx={{ mr: "16px" }}>
							<Button onClick={handleClose} variant="outlined" color="error">
								Cancelar
							</Button>
							<Button onClick={saveNote} variant="outlined" color="secondary">
								Guardar
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</Box>

			{/* Notes*/}
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
				{notes.filter(note => !note.archive).map(note => {
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
			<Snackbar
				open={snackBar}
				autoHideDuration={6000}
				onClose={handleSnackBarClose}
			>
				<Alert
					onClose={handleSnackBarClose}
					severity="error"
					sx={{ width: "100%" }}
				>
					Campos Incompletos !
				</Alert>
			</Snackbar>
			<Snackbar
				open={snackBarSucess}
				autoHideDuration={6000}
				onClose={handleSnackBarSucessClose}
			>
				<Alert
					onClose={handleSnackBarSucessClose}
					severity="success"
					sx={{ width: "100%" }}
				>
					Nueva Nota Creada !
				</Alert>
			</Snackbar>
		</Box>
	);
};

export { Inicio };
