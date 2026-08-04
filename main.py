import unicodedata

LEET = str.maketrans("ABEGILOSTZabegilostz", "48361105724836110572")


def leetify(text):
    text = "".join(
        c for c in unicodedata.normalize("NFD", text) if not unicodedata.combining(c)
    )
    return text.translate(LEET)


def main():
    text = input("Texte à convertir : ")
    print(leetify(text))


if __name__ == "__main__":
    main()
