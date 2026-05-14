import { useEffect, useState } from "react";

export type Team = {
	id: number;
	name: string;
	logoUrl?: string | null;
	createdAt: string;
};

type State = {
	teams: Team[];
	loading: boolean;
	error: string | null;
};

export function useTeams() {
	const [state, setState] = useState<State>({
		teams: [],
		loading: true,
		error: null,
	});

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				// Appel API GET
				const res = await fetch("/api/teams");

				const json = await res.json();

				if (!res.ok) {
					setState({
						teams: [],
						loading: false,
						error: json?.error || "Erreur serveur",
					});

					return;
				}

				// Stockage des équipes
				setState({
					teams: json.teams,
					loading: false,
					error: null,
				});
			} catch {
				setState({
					teams: [],
					loading: false,
					error: "Erreur réseau",
				});
			}
		};

		fetchTeams();
	}, []);

	return state;
}
