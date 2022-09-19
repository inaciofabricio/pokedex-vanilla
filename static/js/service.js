class Service {

    getPokemon(id) {

        let pokemons = [];

        let cache = localStorage.getItem("pokemons");
                    
        if (cache) {
            pokemons = JSON.parse(cache);
        }

        let pokemon = null;

        pokemons.forEach(item => {
            if (item.id == id) {
                pokemon = item;
            }
        });
        
        if(pokemon) {

            return new Promise((resolve, reject) => {
                resolve(pokemon);
            });
            
        } else { 

            return new Promise((resolve, reject) => {
            
                fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .then(res => res.json())
                    .then(data => { 
    
                        if(!pokemons.filter(item => item.id === data.id).length > 0) {
                            pokemons.push(data);
                            pokemons.sort(util.compare);
                            localStorage.setItem("pokemons", JSON.stringify(pokemons));
                        }                       
    
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });            
            });
        }
                
    }

    getSpecie(id) {

        let species = [];

        let cache = localStorage.getItem("species");
                    
        if (cache) {
            species = JSON.parse(cache);
        }

        let specie = null;

        species.forEach(item => {
            if (item.id == id) {
                specie = item;
            }
        });
        
        if(specie) {

            return new Promise((resolve, reject) => {
                resolve(specie);
            });

        } else { 

            return new Promise((resolve, reject) => {
            
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                    .then(res => res.json())
                    .then(data => { 
                        
                        if(!species.filter(item => item.id === data.id).length > 0) {
                            species.push(data);
                            species.sort(util.compare);
                            localStorage.setItem("species", JSON.stringify(species));
                        }   
    
                        resolve(data);
                        
                    })
                    .catch(err => {
                        reject(err);
                    });            
            });
        }
        
    }

    getEvolutionChain(id) {

        let chains = [];

        let cache = localStorage.getItem("chains");

        if (cache) {
            chains = JSON.parse(cache);
        }

        let chain = null;

        chains.forEach(item => {
            if (item.id == id) {
                chain = item;
            }
        });
        
        if(chain) {

            return new Promise((resolve, reject) => {
                resolve(chain);
            });

        } else { 

            return new Promise((resolve, reject) => {            

                fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
                    .then(res => res.json())
                    .then(data => { 
    
                        if(!chains.filter(item => item.id === data.id).length > 0) {
                            chains.push(data);
                            chains.sort(util.compare);
                            localStorage.setItem("chains", JSON.stringify(chains));
                        }   
    
                        resolve(data);
                    })
                    .catch(err => {
                        reject(err);
                    });            
            });
        }
        
    }     
      
}