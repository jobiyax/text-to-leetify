import { useState } from "react";

export type Team = {
	id: number;
	name: string;
	logoUrl?: string | null;
	createdAt: string;
};

type State = {
	data: Team | null;
	error: string | null;
	loading: boolean;
};

export function useAddTeam() {
	const [state, setState] = useState<State>({
		data: null,
		error: null,
		loading: false,
	});

	const addTeam = async (name: string, logoUrl?: string) => {
		// Reset + loading state avant appel API
		setState({ data: null, error: null, loading: true });

		try {
			if (!name.trim()) {
				setState({
					data: null,
					error: "Le nom est requis",
					loading: false,
				});
				return;
			}

			// Appel API vers ton backend Bun
			const res = await fetch("/api/teams", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					logoUrl: logoUrl?.trim() || undefined,
				}),
			});

			const json = await res.json();

			// Gestion erreur backend
			if (!res.ok) {
				setState({
					data: null,
					error: json?.error || "Erreur serveur",
					loading: false,
				});
				return;
			}

			// On stocke la team créée
			setState({
				data: json.team,
				error: null,
				loading: false,
			});
		} catch {
			// Erreur réseau ou serveur inaccessible
			setState({
				data: null,
				error: "Erreur réseau",
				loading: false,
			});
		}
	};

	return {
		...state,
		addTeam,
	};
}
