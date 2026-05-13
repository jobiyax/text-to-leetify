import { AddTeamForm } from "./components/AddTeamForm";
import { TeamsList } from "./components/TeamsList";

export default function App() {
	return (
		<div>
			<h1>BaleLive ⚽</h1>
			<p>
				Plateforme simple de gestion du football local en République
				Démocratique du Congo
			</p>
			<AddTeamForm />
			<TeamsList />
		</div>
	);
}
