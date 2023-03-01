import {
	Box,
	IconButton,
	Skeleton,
	Tooltip,
	useTheme,
	Zoom,
} from "@mui/material";
import { tokens } from "../theme";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const ProgressCircle = ({
	completed = false,
	id,
	notes,
	setNotes,
	size = "40",
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const handleIconCompleted = () => {

		const newNotes = [];
		notes.map(note => {
			if(note.id == id){
				if(note.completed == true){
					newNotes.push({...note, completed: false})
				}else{
					newNotes.push({...note, completed: true})
				}
			}else{
				newNotes.push(note)
			}

		})
		setNotes(newNotes)
	};

	return (
		<Tooltip
			title={completed ? "Nota Completada" : "Nota Activa"}
			TransitionComponent={Zoom}
			arrow
			placement="top"
		>
			<IconButton sx={{ padding: "0" }} onClick={handleIconCompleted}>
				{completed ? (
					<CheckCircleOutlineOutlinedIcon
						sx={{
							color: colors.greenAccent[500],
							width: `${size}px`,
							height: `${size}px`,
							cursor: "pointer",
						}}
					/>
				) : (
					<CheckCircleOutlineOutlinedIcon
						sx={{
							color: colors.grey[400],
							width: `${size}px`,
							height: `${size}px`,
							cursor: "pointer",
						}}
					/>
				)}
			</IconButton>
		</Tooltip>
	);
};

export { ProgressCircle };
