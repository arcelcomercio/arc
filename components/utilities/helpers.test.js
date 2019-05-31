
import {reduceWord, defaultImage} from '@utilities/helpers'

describe('Test reduceWord', () => {
    it("funcion appendScript, menor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 100;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba longitud mayor a la longitud");
    })

    it("funcion appendScript, mayor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 10;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba lon...adios");
    })

    
})







//Rolly
describe('DefaultImage function - Helpers', () =>{
    
})
