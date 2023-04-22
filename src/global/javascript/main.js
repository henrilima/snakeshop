const turmasParaSubstituir = {
    "1a": "1º ano 'A'",
    "1b": "1º ano 'B'",
    "1c": "1º ano 'C'",
    "1d": "1º ano 'D'",
    "2a": "2º ano 'A'",
    "2b": "2º ano 'B'",
    "2c": "2º ano 'C'",
    "2d": "2º ano 'D'",
    "3a": "3º ano 'A'",
    "3b": "3º ano 'B'",
    "3c": "3º ano 'C'",
    "3d": "3º ano 'D'",
    prof: "Professor",
    nestudante: "Não estudante/funcionário",
};

const idsParaSubstituir = {
    0: "polaroidp",
    1: "polaroidg",
    2: "postdoinsta",
    3: "storydoinsta",
    4: "codigospotify",
    5: "paintxp",
    6: "spotifyplayer",
    7: "marcapaginas",
    8: "caneca",
};

const palavrasParaSubstituir = {
    polaroidp: "Polaroid - P",
    polaroidg: "Polaroid - G",
    postdoinsta: "Design: Post do Instagram",
    storydoinsta: "Design: Story do Instagram",
    codigospotify: "Design: Spotify Code",
    paintxp: "Design: Paint XP",
    spotifyplayer: "Design: Spotify Player",
    marcapaginas: "Marca-páginas c/ borla",
    caneca: "Caneca",
};

class Shorten {
    constructor(firebase) {
        if (!firebase) {
            throw new Error('Hoped to find a definition for "firebase" (11)');
        }
        this.database = firebase.database();
        this.data = null;
    }

    add(ref, value, newValue) {
        if (
            !ref ||
            (!value &&
                !newValue &&
                typeof ref !== "string" &&
                typeof string !== "string")
        ) {
            throw new Error(
                "Hoped to find a reference, a property and a new value (13)"
            );
        }
        this.database
            .ref(ref)
            .once("value")
            .then(async (snapshot) => {
                if (snapshot.exists()) {
                    let oldValue = snapshot.val()[value]
                        ? snapshot.val()[value]
                        : 0;
                    let data = {
                        [value]: oldValue + newValue,
                    };
                    this.database.ref(ref).update(data);
                } else {
                    let data = {
                        [value]: newValue,
                    };
                    this.database.ref(ref).update(data);
                }
            });
    }

    async get(ref, prop) {
        if (
            !ref ||
            (!prop && typeof ref !== "string" && typeof prop !== "string")
        ) {
            throw new Error("Hoped to find a reference (14)");
        }
        var data = null;
        await this.database
            .ref(ref)
            .once("value")
            .then((snapshot) => {
                if (snapshot.val() && snapshot.val()[prop]) {
                    data = snapshot.val()[prop];
                } else {
                    data = null;
                }
            });
        return Promise.resolve(data).then((value) => value);
    }

    set(ref, value) {
        if (!ref || (!value && typeof value !== "object")) {
            throw new Error(
                "Hoped to find a reference and an object value (12)"
            );
        }
        this.database.ref(ref).update(value);
    }
}

const firebaseConfig = {
    apiKey: "AIzaSyBI9c3XGuq7tQO3aZ-5Iv5XjWu38BxmwYs",
    authDomain: "snakeshopautorizacao.firebaseapp.com",
    projectId: "snakeshopautorizacao",
    storageBucket: "snakeshopautorizacao.appspot.com",
    messagingSenderId: "513181627396",
    appId: "1:513181627396:web:f618d9f320608c0b3d7151",
};

firebase.initializeApp(firebaseConfig);
const db = new Shorten(firebase);

// FUNÇÕES ÚTEIS
function formatarReal(valor) {
    const valorArredondado = parseFloat(valor).toFixed(2);
    const valorString = valorArredondado.toString();
    const partes = valorString.split(".");
    const parteInteira = partes[0];
    const parteDecimal = partes[1];
    const parteInteiraFormatada = parteInteira.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
    );
    return `R$ ${parteInteiraFormatada},${parteDecimal}`;
}

async function addToCart(id, ref) {
    let item;
    if (Number(id) === 0) {
        item = "polaroidp";
    } else if (Number(id) === 1) {
        item = "polaroidg";
    } else if (Number(id) === 2) {
        item = "postdoinsta";
    } else if (Number(id) === 3) {
        item = "storydoinsta";
    } else if (Number(id) === 4) {
        item = "codigospotify";
    } else if (Number(id) === 5) {
        item = "paintxp";
    } else if (Number(id) === 6) {
        item = "spotifyplayer";
    } else if (Number(id) === 7) {
        item = "marcapaginas";
    } else if (Number(id) === 8) {
        item = "caneca";
    } else {
        item = "nada";
    }
    db.add(`carrinho/${ref}`, item, 1);
};

function formatarTelefone(input) {
    if (!input || !input.value) {
        return;
    };
    let numero = input.value.replace(/\D/g, "");
    if (numero.length === 10) {
        numero = numero.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (numero.length === 11) {
        numero = numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    };
    input.value = numero;
};
