import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Inicio } from "./scenes/inicio/index";
import { TopBar } from "./scenes/global/TopBar";
import { Archivados } from "./scenes/archivados/index";
import { Activos } from "./scenes/activos";
import { Pendientes } from "./scenes/pendientes";
import { Importantes } from "./scenes/importantes";
import { MyProSidebarProvider } from "./scenes/global/sidebar/sidebarContext";
import { useEffect, useState } from "react";
import { Terminados } from "./scenes/terminados";

const initialNotes = [
	{
		id: 1,
		title: "Ejemplo 1",
		description: "Descripción ejemplo 1",
		completed: true,
		archive: false,
		category: "importante",
	},
	{
		id: 2,
		title: "Ejemplo 2",
		description: "Descripción ejemplo 2",
		completed: false,
		archive: false,
		category: "pendiente",
	},
	{
		id: 3,
		title: "Ejemplo 3",
		description:
			"Descripción ejemplo 3 Descripción ejemplo 3 Descripción ejemplo 3",
		completed: true,
		archive: false,
		category: "terminado",
	},
	{
		id: 4,
		title: "Ejemplo 4",
		description: "Descripción ejemplo 4",
		completed: true,
		archive: false,
		category: "",
	},
	{
		id: 5,
		title: "Ejemplo 5",
		description: "Descripción ejemplo 5",
		completed: true,
		archive: false,
		category: "",
	},
];

function App() {
	const data = JSON.parse(localStorage.getItem("data"));
	console.log(data);
	const [theme, colorMode] = useMode();
	const [notes, setNotes] = useState(data || initialNotes);

	useEffect(() => {
		localStorage.setItem("data", JSON.stringify(notes));
	}, [notes]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<MyProSidebarProvider>
					<main className="content">
						<TopBar />
						<Routes>
							<Route
								path="/"
								element={<Inicio notes={notes} setNotes={setNotes} />}
							/>
							<Route
								path="/archivados"
								element={<Archivados notes={notes} setNotes={setNotes} />}
							/>
							<Route
								path="/activos"
								element={<Activos notes={notes} setNotes={setNotes} />}
							/>
							<Route
								path="/importantes"
								element={<Importantes notes={notes} setNotes={setNotes} />}
							/>
							<Route
								path="/pendientes"
								element={<Pendientes notes={notes} setNotes={setNotes} />}
							/>
							<Route
								path="/terminados"
								element={<Terminados notes={notes} setNotes={setNotes} />}
							/>
						</Routes>
					</main>
				</MyProSidebarProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
