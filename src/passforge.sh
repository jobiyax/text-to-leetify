#!/bin/bash

clear
echo "======================================="
echo "        🔐 PASSFORGE v1.0"
echo "======================================="
echo ""

# Demande la longueur du mot de passe
read -r -p "👉 Nombre de caractères (8-64) : " length

# Vérifie que la longueur est valide
if [[ $length -lt 8 || $length -gt 64 ]]; then
	echo "❌ Longueur invalide"
	exit 1
fi

# Options de complexité
read -r -p "👉 Inclure MAJUSCULES ? (y/n) : " upper
read -r -p "👉 Inclure CHIFFRES ? (y/n) : " numbers
read -r -p "👉 Inclure SYMBOLES ? (y/n) : " symbols

# Charset de base (minuscules)
charset="abcdefghijklmnopqrstuvwxyz"

# Ajout des options choisies
[[ $upper == "y" ]] && charset+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
[[ $numbers == "y" ]] && charset+="0123456789"
[[ $symbols == "y" ]] && charset+="!@#$%^&*()-_=+[]{};:,.<>?"

# Génération du mot de passe
password=$(tr -dc "$charset" </dev/urandom | head -c "$length")

echo ""
echo "🔑 Mot de passe : $password"
