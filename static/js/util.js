class Util {

    convertePrimeiraLetraMaiuscula(text) {
        return text.substring(0,1).toUpperCase() + text.substring(1);    
    }

    minimizaStringEspecial(string) {
        return string.replace("special","s")
    }

    limpaStringVazia(str) {
        return str.trim() != "";
    }

    compare(a, b) {
        
        if (a.id < b.id) {
          return -1;
        }

        if (a.id > b.id) {
          return 1;
        }

        return 0;
    }
}
