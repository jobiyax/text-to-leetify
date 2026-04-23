#!/bin/bash

set -euo pipefail

echo "======================================="
echo "🔍 BASHGUARD - Scan en cours..."
echo "======================================="

TARGET_DIR="."

# Vérifier si le dossier existe
if [[ ! -d "$TARGET_DIR" ]]; then
	echo "❌ Dossier introuvable : $TARGET_DIR"
	exit 1
fi

# Vérifier les dépendances
if ! command -v shellcheck >/dev/null 2>&1; then
	echo "❌ shellcheck n'est pas installé"
	exit 1
fi

if ! command -v shfmt >/dev/null 2>&1; then
	echo "❌ shfmt n'est pas installé"
	exit 1
fi

echo ""
echo "🔎 Recherche des fichiers .sh..."

# Stocker les fichiers trouvés
mapfile -d '' files < <(find "$TARGET_DIR" -type f -name "*.sh" -print0)

# Vérifier si aucun fichier trouvé
if [[ ${#files[@]} -eq 0 ]]; then
	echo "⚠️ Aucun fichier .sh trouvé dans $TARGET_DIR"
	exit 0
fi

echo "✅ ${#files[@]} fichier(s) trouvé(s)"
echo ""

# ===============================
# 🧠 Analyse shellcheck
# ===============================

echo "🧠 Analyse avec shellcheck..."
echo ""

for file in "${files[@]}"; do
	echo "👉 $file"
	shellcheck "$file"
done

# ===============================
# 🎨 Formatage shfmt
# ===============================

echo ""
echo "🎨 Formatage avec shfmt..."
echo ""

for file in "${files[@]}"; do
	echo "👉 $file"
	shfmt -w "$file"
done

echo ""
echo "======================================="
echo "✅ Scan terminé"
echo "======================================="
