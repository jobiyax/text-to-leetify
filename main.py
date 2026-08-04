LEET = str.maketrans("ABEGILOSTZabegilostz", "48361105724836110572")


def leetify(text):
    return text.translate(LEET)


def main():
    text = input("Texte à convertir : ")
    print(leetify(text))


if __name__ == "__main__":
    main()
