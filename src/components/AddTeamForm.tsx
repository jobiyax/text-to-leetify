import { useState } from "react";
import { useAddTeam } from "../hooks/useAddTeam";

export function AddTeamForm() {
	const { addTeam, loading, error, data } = useAddTeam();

	const [name, setName] = useState("");
	const [logoUrl, setLogoUrl] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await addTeam(name, logoUrl);

		// Reset des inputs après validation
		setName("");
		setLogoUrl("");
	};

	return (
		<div>
			<h2>Créer une équipe</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="team-name">Nom</label>
					<input
						id="team-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Nom de l'équipe"
					/>
				</div>
				<div>
					<label htmlFor="team-logo">Logo URL</label>
					<input
						id="team-logo"
						value={logoUrl}
						onChange={(e) => setLogoUrl(e.target.value)}
						placeholder="https://..."
					/>
				</div>
				<button type="submit" disabled={loading}>
					{loading ? "Création..." : "Créer"}
				</button>
				{error && <p>{error}</p>}
				{data && <p>Équipe créée {data.name}</p>}
			</form>
		</div>
	);
}
