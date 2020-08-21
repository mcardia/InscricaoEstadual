
const InscricaoEstadual = {
    __uf: "",
    __qdg() {
        if (this[this.__uf].ie.length < (this[this.__uf].qdg_se_menor_que || 0) && (this[this.__uf].qdg_se_menor_que || 0) > 0) {
            return this[this.__uf].qdg_se_menor_que;
        }
        if (this[this.__uf].ie.length > (this[this.__uf].qdg_se_maior_que || 0) && (this[this.__uf].qdg_se_maior_que || 0) > 0) {
            return this[this.__uf].qdg_se_maior_que;
        }
        return this[this.__uf].qdg || 9;
    },
    uf: function (uf) {
        this.__uf = uf.toUpperCase().trim();
        this[this.__uf].qdg = this[this.__uf].qdg || 9; // valor padrao (usado por mais estados)
        this[this.__uf].qdg_se_menor_que = this[this.__uf].qdg_se_menor_que || 0; // valor padrao (usado por mais estados)
        this[this.__uf].qdg_se_maior_que = this[this.__uf].qdg_se_maior_que || 0; // valor padrao (usado por mais estados)
        return this;
    },
    ie: function (ie) {
        ie = ie.toUpperCase().replace(/[^P0-9]/g, "");
        let produtor_rural_sp = (this.__uf == "SP" && ie.substr(0, 1) == "P") ? "P" : "";
        this[this.__uf].ien = parseInt(ie.replace(/[^0-9]/g, ""));
        this[this.__uf].ie = this[this.__uf].ien.toString().trim();

        for (let d = this.__qdg(); this[this.__uf].ie.length < d; this[this.__uf].ie = "0" + this[this.__uf].ie);

        this[this.__uf].ie = produtor_rural_sp + this[this.__uf].ie;

        if (typeof this[this.__uf].qdv === "undefined") {
            this[this.__uf].qdv = function () { return 1 };
        }

        if (typeof this[this.__uf].verificador === "undefined") {
            this[this.__uf].verificador = function () { return parseInt(this.ie.substr(-this.qdv())) };
        }

        if (typeof this[this.__uf].digitos === "undefined") {
            this[this.__uf].digitos = function () { return this.ie.substr(0, (this.ie.length - this.qdv())) };
        }
        return this;
    },
    set(ie, uf) {
        this.uf(uf).ie(ie);
    },
    getIE() {
        return this[this.__uf].ie;
    },
    valido: function () {
        return this[this.__uf].valido();
    },
    calcularDV: function () {
        return this[this.__uf].calcularDV()
    },
    ac: function () { return this.uf("AC") },
    al: function () { return this.uf("AL") },
    am: function () { return this.uf("AM") },
    ap: function () { return this.uf("AP") },
    ba: function () { return this.uf("BA") },
    ce: function () { return this.uf("CE") },
    df: function () { return this.uf("DF") },
    es: function () { return this.uf("ES") },
    go: function () { return this.uf("GO") },
    ma: function () { return this.uf("MA") },
    mg: function () { return this.uf("MG") },
    ms: function () { return this.uf("MS") },
    mt: function () { return this.uf("MT") },
    pa: function () { return this.uf("PA") },
    pb: function () { return this.uf("PB") },
    pe: function () { return this.uf("PE") },
    pi: function () { return this.uf("PI") },
    pr: function () { return this.uf("PR") },
    rj: function () { return this.uf("RJ") },
    rn: function () { return this.uf("RN") },
    ro: function () { return this.uf("RO") },
    rr: function () { return this.uf("RR") },
    rs: function () { return this.uf("RS") },
    sc: function () { return this.uf("SC") },
    se: function () { return this.uf("SE") },
    sp: function () { return this.uf("SP") },
    to: function () { return this.uf("TO") },
    "AC": {
        qdg: 13,
        qdv: function () { return 2 },
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "AL": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "AM": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "AP": {
        calcularDV: function () {
            switch (true) {
                case (this.ien >= 10 && this.ien <= 30000009): return -1;
                case (this.ien >= 30000010 && this.ien <= 30170009): return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 5);
                case (this.ien >= 30170010 && this.ien <= 30190229): return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 1, 9);
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "BA": {
        qdv: function () { return 2 },
        calcularDV: function () {
            let d1 = parseInt(this.digitos().substr(0, 1));
            let d2 = parseInt(this.digitos().substr(1, 1));
            let pesos = [2, 3, 4, 5, 6, 7, 8, 9];
            var L = (d1 == 0 ? 6 : 7);
            if ([6, 7, 9].indexOf(d2) != -1) {
                d2 = __modulo(this.digitos().substr(7 - L, L), 11);
                d1 = __modulo(this.digitos().substr(7 - L, L) + d2.toString(), 11);
            } else {
                d2 = __modulo(this.digitos().substr(7 - L, L), 10, 0, 0, 0, pesos.slice(0, L));
                d1 = __modulo(this.digitos().substr(7 - L, L) + d2.toString(), 10, 0, 0, 0, pesos.slice(0, L + 1));
            }
            return (d1 * 10) + d2;
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "CE": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "DF": {
        qdg: 13,
        qdv: function () { return 2 },
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "ES": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "GO": {
        calcularDV: function () {
            switch (true) {
                case (["10", "11", "15"].indexOf(this.digitos().substr(0, 2)) == -1): return -1;
                case (this.ien >= 101031050 && this.ien <= 101199979): return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 1, 0, 0);
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "MA": {
        calcularDV: function () {
            switch (true) {
                case (["12"].indexOf(this.digitos().substr(0, 2)) == -1): return -1;
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "MG": {
        qdg: 13,
        qdv: function () { return 2 },
        calcularDV: function () {
            let digitos = this.digitos().substr(0, 3) + '0' + this.digitos().substr(3);
            let d1 = 0;
            let d2 = 0;
            digitos.split("").reverse().forEach(
                function (d, i, a) {
                    d2 = parseInt(d) * ((a.length - i) % 2 == 0 ? 2 : 1);
                    d1 += d2.toString().split("").reduce(
                        function (s, d) {
                            return s + parseInt(d)
                        }
                        , 0
                    );
                }
            );
            d1 = (Math.ceil(d1 / 10) * 10) - d1;
            digitos = digitos.substr(0, 3) + digitos.substr(4) + d1.toString();
            d2 = __modulo(digitos, 11, 0, 0, 0, [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
            return ((d1 * 10) + d2);
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "MS": {
        calcularDV: function () {
            switch (true) {
                case (["28"].indexOf(this.digitos().substr(0, 2)) == -1): return -1;
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "MT": {
        qdg: 11,
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "PA": {
        calcularDV: function () {
            switch (true) {
                case (["15"].indexOf(this.digitos().substr(0, 2)) == -1): return -1;
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "PB": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "PE": {
        qdg_se_maior_que: 14,
        qdv: function () { return (this.ie.length > 9) ? 1 : 2 },
        calcularDV: function () {
            switch (this.qdv()) {
                case 1: return __modulo(this.digitos(), 11, 0, 1, 0, [2, 3, 4, 5, 6, 7, 8, 9, 1]);
                default: return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "PI": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "PR": {
        qdg: 10,
        qdv: function () { return 2 },
        calcularDV: function () {
            let d1 = __modulo(this.digitos(), 11, 0, 0, 0, [2, 3, 4, 5, 6, 7]);
            let d2 = __modulo(this.digitos() + d1.toString(), 11, 0, 0, 0, [2, 3, 4, 5, 6, 7]);
            return (d1 * 10) + d2;
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "RJ": {
        qdg: 8,
        calcularDV: function () {
            switch (true) {
                case (this.ie.length != this.qdg): return -1;
                default: return __modulo(this.digitos(), 11, 0, 0, 0, [2, 3, 4, 5, 6, 7]);
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "RN": {
        qdg: 10,
        qdg_se_menor_que: 9,
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "RO": {
        qdg: 14,
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 1, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "RR": {
        calcularDV: function () {
            let d1 = this.digitos().split("").reduce(
                function (s, d, i) {
                    return s + (parseInt(d) * (i + 1));
                }
            );
            return d1 % 9;
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "RS": {
        qdg: 10,
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "SC": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "SE": {
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "SP": {
        qdg: 12,
        qdv: function () { return (this.ie.substr(0, 1) == "P") ? 1 : 2 },
        digitos: function () {
            if (this.ie.substr(0, 1) == "P") return this.ie.substr(0, (this.ie.length - this.qdv()));
            return this.ie.substr(0, 8) + this.ie.substr(9, 2)
        },
        verificador: function () {
            if (this.ie.substr(0, 1) == "P") return parseInt(this.ie.substr(-this.qdv()));
            return parseInt(this.ie.substr(8, 1) + this.ie.substr(-1))
        },
        calcularDV: function () {
            let d1 = -1;
            switch (true) {
                case (this.digitos().length != (12 - this.qdv())): return -1;
                default:
                    d1 = __modulo(this.digitos().substr(0, 8), 11, 0, 0, 0, [10, 8, 7, 6, 5, 4, 3, 1], 2);
                    if (this.ie.substr(0, 1) == "P") return d1; // Produtor Rural
                    let aux = this.digitos().substr(0, 8) + d1.toString() + this.digitos().substr(-2)
                    let d2 = __modulo(aux, 11, 0, 0, 0, [2, 3, 4, 5, 6, 7, 8, 9, 10], 2);
                    return (d1 * 10) + d2;
            }
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    },
    "TO": {
        qdg_se_maior_que: 11,
        digitos: function () { return ((this.ie.length > 9) ? this.ie.substr(0, 2) + this.ie.substr(4, 6) : this.ie.substr(0, (this.ie.length - this.qdv()))); },
        calcularDV: function () {
            return __calcularDV_verificador_padrao(this.digitos(), this.qdv(), 11, 0, 0, 0)
        },
        valido: function () {
            return this.calcularDV() == this.verificador();
        }
    }
}
function __modulo(digitos, mod, modulo_se_10 = 0, modulo_se_11 = 0, somar = 0, pesos = [], metodo = 1) {
    digitos = digitos.replace(/[^0-9]/g, "");
    if (isNaN(digitos)) return (0);
    if (digitos.length == 0) return (0);
    if (mod != 10 && mod != 11) return (0);

    if (pesos.length == 0) {
        pesos = (mod == 10 ? [2, 1] : [2, 3, 4, 5, 6, 7, 8, 9]);
    }

    let resultado = somar + digitos.split("").reverse().reduce(
        function (s, d, i) {
            s = parseInt(s) + (parseInt(d) * pesos[i % pesos.length]);
            return s;
        }, 0
    )

    switch (metodo) {
        case 1:
            resultado = (mod - (resultado % mod));
            switch (resultado) {
                case 10: resultado = modulo_se_10; break;
                case 11: resultado = modulo_se_11; break;
                default: break;
            }
            break;
        case 2:
            resultado = (resultado % mod).toString().substr(-1);
            break;
        default:
            resultado = (mod - (resultado % mod));
            break;
    }
    return parseInt(resultado)
};

function __calcularDV_verificador_padrao(digitos, qdv, mod = 11, modulo_se_10 = 0, modulo_se_11 = 0, somar = 0) {
    for (i = 1; i <= qdv; i++) {
        digitos = digitos + __modulo(digitos, mod, modulo_se_10, modulo_se_11, somar).toString();
    }
    return (parseInt(digitos.substr(-qdv)));
};

