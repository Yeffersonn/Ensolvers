import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	FormLabel,
	IconButton,
	Radio,
	RadioGroup,
	TextField,
	Tooltip,
	Typography,
	useTheme,
	Zoom,
} from "@mui/material";
import { tokens } from "../theme";
import { ProgressCircle } from "./ProgressCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

function BootstrapDialogTitle(props) {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
}

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

const StatBox = ({
	title,
	description,
	icon,
	completed,
	id,
	notes,
	setNotes,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const note = notes.find((note) => note.id == id);
	const [open, setOpen] = useState(false);
	const [titleEdit, setTitle] = useState(title);
	const [descriptionEdit, setDescription] = useState(description);
	const [category, setCategory] = useState("");

	const handleArchive = () => {
		const newNotes = [];
		notes.map((note) => {
			if (note.id == id) {
				if (note.archive == true) {
					newNotes.push({ ...note, archive: false });
				} else {
					newNotes.push({ ...note, archive: true });
				}
			} else {
				newNotes.push(note);
			}
		});
		setNotes(newNotes);
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setTitle(title);
		setDescription(description);
		setOpen(false);
	};
	const saveEditNote = () => {
		const newNotes = [];
		notes.map((note) => {
			if (note.id == id) {
				newNotes.push({
					...note,
					title: titleEdit,
					description: descriptionEdit,
				});
			} else {
				newNotes.push(note);
			}
		});
		handleClose();
		setNotes(newNotes);
	};

	/* open note */

	const [openNote, setOpenNote] = useState(false);

	const handleClickOpenNote = () => {
		setOpenNote(true);
	};
	const handleCloseNote = () => {
		setOpenNote(false);
	};

	/* open delete */

	const [openDelete, setOpenDelete] = useState(false);

	const handleClickOpenDelete = () => {
		setOpenDelete(true);
	};
	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const saveDeleteNote = () => {
		const newNotes = [...notes];
		const noteFindIndex = notes.findIndex((note) => note.id == id);
		newNotes.splice(noteFindIndex, 1);
		setNotes(newNotes);
		setOpenDelete(false);
	};

	/* Open category */

	const [openCategory, setOpenCategory] = useState(false);

	const handleClickOpenCategory = () => {
		setOpenCategory(true);
	};
	const handleCloseCategory = () => {
		setOpenCategory(false);
	};

	const saveCategoryNote = () => {
		const newNotes = [];
		notes.map((note) => {
			if (note.id == id) {
				newNotes.push({ ...note, category: category });
			} else {
				newNotes.push(note);
			}
		});

		setOpenCategory(false);
		setNotes(newNotes);
	};

	return (
		<Box width="100%" m="0" p="20px">
			<Box display="flex" justifyContent="space-between">
				<Box>
					{icon}
					<Typography
						variant="h4"
						fontWeight="bold"
						sx={{
							color: colors.grey[100],
						}}
					>
						{title}
					</Typography>
				</Box>
				<Box>
					<ProgressCircle
						notes={notes}
						setNotes={setNotes}
						completed={completed}
						id={id}
					/>
				</Box>
			</Box>
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				mt="4px"
				gap="8px"
			>
				<Typography
					variant="h6"
					sx={{
						color: colors.greenAccent[500],
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						width: "80%",
					}}
				>
					{description}
				</Typography>
				<Box display="flex" justifyContent="space-between">
					<Box>
						<Tooltip title="Ver Nota" arrow TransitionComponent={Zoom}>
							<IconButton onClick={handleClickOpenNote}>
								<VisibilityOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Editar" arrow TransitionComponent={Zoom}>
							<IconButton onClick={handleClickOpen}>
								<EditOutlinedIcon />
							</IconButton>
						</Tooltip>
						<Tooltip
							title={note.archive ? "Archivado" : "Archivar"}
							arrow
							TransitionComponent={Zoom}
						>
							<IconButton onClick={handleArchive}>
								<ArchiveOutlinedIcon color={note.archive ? "secondary" : ""} />
							</IconButton>
						</Tooltip>
						<Tooltip title={note.category ? note.category : "Categorizar"} arrow TransitionComponent={Zoom}>
							<IconButton onClick={handleClickOpenCategory}>
								<CategoryOutlinedIcon color={note.category ? "secondary" : ""}/>
							</IconButton>
						</Tooltip>
					</Box>
					<Tooltip title="Eliminar Nota" arrow TransitionComponent={Zoom}>
						<IconButton onClick={handleClickOpenDelete}>
							<DeleteOutlineOutlinedIcon />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Editar Nota</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Al editar tu nota, automáticamente se actualizará en tu interfaz, si
						cancelas no se guardará ningún cambio.
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
						value={titleEdit}
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
						value={descriptionEdit}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</DialogContent>
				<DialogActions sx={{ mr: "16px" }}>
					<Button onClick={handleClose} variant="outlined" color="error">
						Cancelar
					</Button>
					<Button onClick={saveEditNote} variant="outlined" color="secondary">
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog open={openCategory} onClose={handleCloseCategory}>
				<DialogTitle>Categorizar Nota</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Podrás categorizar tu nota como importante, pendiente o terminado. Asimismo en caso que quieras descategorizar tu nota, también tendrás la opción.
					</DialogContentText>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						name="radio-buttons-group"
					>
						<FormControlLabel
							value="importante"
							control={<Radio />}
							label="Importante"
							onClick={(e) => setCategory(e.target.value)}
						/>
						<FormControlLabel
							value="pendiente"
							control={<Radio />}
							label="Pendiente"
							onClick={(e) => setCategory(e.target.value)}
						/>
						<FormControlLabel
							value="terminado"
							control={<Radio />}
							label="Terminado"
							onClick={(e) => setCategory(e.target.value)}
						/>
						<FormControlLabel
							value=""
							control={<Radio />}
							label="Descategorizar"
							onClick={(e) => setCategory(e.target.value)}
						/>
					</RadioGroup>
				</DialogContent>
				<DialogActions sx={{ mr: "16px" }}>
					<Button
						onClick={handleCloseCategory}
						variant="outlined"
						color="error"
					>
						Cancelar
					</Button>
					<Button
						onClick={saveCategoryNote}
						variant="outlined"
						color="secondary"
					>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
			<BootstrapDialog
				onClose={handleCloseNote}
				aria-labelledby="customized-dialog-title"
				open={openNote}
				fullWidth={true}
        maxWidth='sm'
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleCloseNote}
				>
					{titleEdit}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>{descriptionEdit}</Typography>
				</DialogContent>
			</BootstrapDialog>
			<BootstrapDialog
				onClose={handleCloseDelete}
				aria-labelledby="customized-dialog-title"
				open={openDelete}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleCloseDelete}
				>
					Eliminar Nota
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Al eliminar esta nota se hará de forma permanente y no se podrá
						recuperarlo, confirma tu elección de eliminar la nota al presionar
						la casilla de 'Eliminar'.
					</Typography>
				</DialogContent>
				<DialogActions sx={{ mr: "16px" }}>
					<Button
						onClick={handleCloseDelete}
						variant="outlined"
						color="secondary"
					>
						Cancelar
					</Button>
					<Button onClick={saveDeleteNote} variant="outlined" color="error">
						Elminar
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</Box>
	);
};

export { StatBox };
