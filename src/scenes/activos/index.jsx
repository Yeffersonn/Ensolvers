import { Box, useTheme, useMediaQuery, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { Header } from "../../components/Header";
import SpeakerNotesSharpIcon from "@mui/icons-material/SpeakerNotesSharp";
import { StatBox } from "../../components/StatBox";
import React from "react";

const Activos = ({ notes, setNotes }) => {
	const theme = useTheme();
	const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
	const smScreenDown = useMediaQuery(theme.breakpoints.down("sm"));
	const mdScreenDown = useMediaQuery(theme.breakpoints.down("md"));
	const lgScreenDown = useMediaQuery(theme.breakpoints.down("lg"));
	const xlScreenDown = useMediaQuery(theme.breakpoints.down("xl"));
	const colors = tokens(theme.palette.mode);

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
					title="Notas Activas"
					subtitle="Aquí podrás encontrar todas tus notas pendientes sin realizar, también llamadas notas activas"
				/>
			</Box>
			{/* Notes*/}
			<Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
				{notes
					.filter((note) => !note.completed)
					.map((note) => {
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

export { Activos };
