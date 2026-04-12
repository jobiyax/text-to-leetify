#!/bin/bash

set -euo pipefail

clear

echo "======================================="
echo "             🔐 PASSFORGE"
echo "======================================="
echo ""

# Chargement de la config
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="$SCRIPT_DIR/charset.conf"

if [[ ! -f "$CONFIG_FILE" ]]; then
	echo "❌ Fichier de configuration introuvable : $CONFIG_FILE"
	exit 1
fi

# shellcheck source=./charset.conf
# shellcheck disable=SC1091
source "$CONFIG_FILE"

# Vérification des variables importées
: "${LOWERCASE:?}"
: "${UPPERCASE:?}"
: "${NUMBERS:?}"
: "${SYMBOLS:?}"

# Longueur du mot de passe
read -r -p "👉 Nombre de caractères (8-64) : " length

if [[ ! "$length" =~ ^[0-9]+$ ]]; then
	echo "❌ Veuillez entrer un nombre valide"
	exit 1
fi

if ((length < 8 || length > 64)); then
	echo "❌ Longueur invalide (8-64 seulement)"
	exit 1
fi

# Options
read -r -p "👉 Inclure MAJUSCULES ? (y/n) : " upper
read -r -p "👉 Inclure CHIFFRES ? (y/n) : " numbers
read -r -p "👉 Inclure SYMBOLES ? (y/n) : " symbols

# Construction du charset
charset="$LOWERCASE"

[[ "$upper" == "y" ]] && charset+="$UPPERCASE"
[[ "$numbers" == "y" ]] && charset+="$NUMBERS"
[[ "$symbols" == "y" ]] && charset+="$SYMBOLS"

# Eviter charset vide
if [[ -z "$charset" ]]; then
	echo "❌ Aucun jeu de caractères sélectionné"
	exit 1
fi

# Génération
password="$(LC_ALL=C tr -dc "$charset" </dev/urandom | head -c "$length" || true)"

echo ""
echo "🔑 Mot de passe généré : $password"
echo ""
