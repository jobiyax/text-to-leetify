import { useTeams } from "../hooks/useTeams";

export function TeamsList() {
	const { teams, loading, error } = useTeams();

	if (loading) {
		return <p>Chargement...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (teams.length === 0) {
		return <p>Aucune équipe trouvée</p>;
	}

	return (
		<div>
			<h2>Liste des équipes</h2>
			<ul>
				{teams.map((team) => (
					<li key={team.id}>
						<p>{team.name}</p>
						{team.logoUrl && (
							<img src={team.logoUrl} alt={team.name} width={80} />
						)}
						<small>
							Créé le {new Date(team.createdAt).toLocaleDateString()}
						</small>
						<hr />
					</li>
				))}
			</ul>
		</div>
	);
}
