# 💻 Pass Forge

# 🔐 Pass Forge

> Générateur de mots de passe sécurisé en Bash ⚙️
> Crée des clés fortes, aléatoires et personnalisables 🚀

---

## ✨ Features

- 🔢 Longueur personnalisable (8 à 64)
- 🔠 Majuscules optionnelles
- 🔢 Chiffres optionnels
- 🔣 Symboles optionnels
- ⚡ Génération rapide et sécurisée (`/dev/urandom`)

---

## 📁 Structure

```
.
├── check.sh        # 🔍 Analyse & formatage du code
├── README.md       # 📄 Documentation
└── src
    └── passforge.sh # 🔐 Générateur principal
```

---

## ⚙️ Installation

```bash
git clone https://github.com/jobiyax/pass-forge.git
cd pass-forge
chmod +x src/passforge.sh check.sh
```

---

## 🚀 Utilisation

```bash
./src/passforge.sh
```

Puis suis les instructions :

- longueur 🔢
- options (MAJ / chiffres / symboles)

---

## 🔍 Qualité du code

```bash
./check.sh
```

- 🧠 Analyse avec `shellcheck`
- 🎨 Formatage avec `shfmt`

---

## 🤝 Contribution

- Fork 🍴
- Nouvelle branche 🌿
- Pull Request 🚀

---

## 📌 Licence

📝 MIT — libre d’utilisation
