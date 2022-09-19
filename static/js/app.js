const util = new Util();
const pokemon = new Pokemon();
const service = new Service(); 

const getPokemon = id => {

    service.getPokemon(id)
        .then(data => {

            pokemon.serializador(id, data);

            getSpecie();
            bindView();
            principal();  
        })
        .catch(err => {
            console.log(err);
            pokemon.id = id;
            pokemon.img = "static/img/404.png";
            pokemon.altura = "Não encontrado!";
            bindView(pokemon); 
        });
}

getPokemon(1);

const getSpecie = () => {

    service.getSpecie(pokemon.id)
        .then(data => {

            var urls = data.evolution_chain.url.split('/');
            urls = urls.filter(util.limpaStringVazia);
            
            pokemon.idChain = urls[urls.length-1] ? urls[urls.length-1] : 0;

            getEvolutionChain();
        })
        .catch(err => {
            console.log(err);
        });
}



const getEvolutionChain = () => {
    
    service.getEvolutionChain(pokemon.idChain)
        .then(data => {
            getEvolucoes(data.chain, []);
        })
        .catch(err => {
            console.log(err);
        });
}

const getEvolucoes = (obj, array) => {

    if(obj != undefined) {
        let name = (obj.species.name.toLowerCase() == pokemon.nome.toLowerCase()) ? `(${util.convertePrimeiraLetraMaiuscula(obj.species.name)})` : obj.species.name;
        if(typeof name == "string"){
            array.push(name);
        }
        getEvolucoes(obj.evolves_to[0], array);
    } else {
        pokemon.evolucoes = array
    }         
}

const bindView = () => {
    document.querySelector(`[data-id]`).innerHTML = `#${pokemon.id}`;
    document.querySelector(`[data-nome]`).innerHTML = pokemon.nome;
    document.querySelector(`[data-tipo]`).innerHTML = pokemon.tipo;
    document.querySelector(`[data-img]`).style.backgroundImage = `url(${pokemon.img})`;
}

const mudarCorBtn = (index) => {

    for (let i = 1; i <= 10; i++) {

        if(index == i) {
            document.querySelector(`.blue-squares-container div:nth-child(${i})`).style.backgroundColor = "#FFFFFF";
            document.querySelector(`.blue-squares-container div:nth-child(${i})`).style.boxShadow = "inset -2px -2px #FFFFFF";
        } else {
            document.querySelector(`.blue-squares-container div:nth-child(${i})`).style.backgroundColor = "#3298cb";
            document.querySelector(`.blue-squares-container div:nth-child(${i})`).style.boxShadow = "inset -2px -2px #3298cb";
        }
    }
}

const principal = () => {

    mudarCorBtn(1);
    var conteudo = "<div>Básico:</div>";
    
    if(pokemon.altura && pokemon.peso) {
        conteudo += `<div>Altura: ${ pokemon.altura }</div>`;
        conteudo += `<div>Peso: ${ pokemon.peso }</div>`;
    } else {
        conteudo += "<div>- ...";
    }

    document.querySelector(`[data-conteudo]`).innerHTML = conteudo;
}

const statusBasico = () => {

    mudarCorBtn(2);
    var conteudo = "<div>Status:</div>";

    pokemon.statusBasicos.forEach(item => {
        conteudo += `<div>- ${ item.nome }: ${item.status}</div>`;
    });

    if(pokemon.statusBasicos.length == 0){
        conteudo += "<div>- ..."
    }

    document.querySelector(`[data-conteudo]`).innerHTML = conteudo;
}

const jogos = () => {

    mudarCorBtn(3);
    var conteudo = "<div>Jogos:</div>";

    pokemon.jogos.forEach(item => {
        conteudo += `<div>- ${ item.nome }</div>`;
    });

    if(pokemon.jogos.length == 0){
        conteudo += "<div>- ..."
    }

    document.querySelector(`[data-conteudo]`).innerHTML = conteudo;
}

const movimentos = () => {

    mudarCorBtn(4);
    var conteudo = "<div>Movimentos:</div>";

    pokemon.movimentos.forEach(item => {
        conteudo += `<div>- ${ item.nome }</div>`;
    });

    if(pokemon.movimentos.length == 0){
        conteudo += "<div>- ..."
    }

    document.querySelector(`[data-conteudo]`).innerHTML = conteudo;
}

const evolucao = () => {

    mudarCorBtn(5);
    var conteudo = "<div>Evoluções:</div>";

    pokemon.evolucoes.forEach(item => {
        conteudo += `<div>- ${ item.nome }</div>`;
    });
    
    if(pokemon.evolucoes.length == 0) {
        conteudo += "<div>- ..."
    }

    document.querySelector(`[data-conteudo]`).innerHTML = conteudo;
    
}

const anterior = () => {

    var novoIdPokemon = pokemon.id - 1;

    if(novoIdPokemon > 0){
        getPokemon(novoIdPokemon);
    }
}

const proximo = () => {
    
    var novoIdPokemon = pokemon.id + 1;
    getPokemon(novoIdPokemon);
}