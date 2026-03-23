#!/bin/bash

set -euo pipefail

echo "======================================="
echo "🔍 BASHGUARD - Scan en cours..."
echo "======================================="

# Vérifier si le dossier existe
if [[ ! -d "src" ]]; then
    echo "❌ Dossier 'src' introuvable"
    exit 1
fi

echo ""
echo "🧠 Analyse avec shellcheck..."

found=false

# Boucle sécurisée (gère espaces, caractères spéciaux)
while IFS= read -r -d '' file; do
    found=true
    echo "👉 $file"
    shellcheck "$file"
done < <(find src -type f -name "*.sh" -print0)

# Vérification si aucun fichier trouvé
if [[ "$found" = false ]]; then
    echo "⚠️ Aucun fichier .sh trouvé dans src"
    exit 0
fi

echo ""
echo "🎨 Formatage avec shfmt..."

while IFS= read -r -d '' file; do
    echo "👉 $file"
    shfmt -w "$file"
done < <(find src -type f -name "*.sh" -print0)

echo ""
echo "======================================="
echo "✅ Scan terminé"
echo "======================================="
