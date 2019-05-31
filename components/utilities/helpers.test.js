
import {reduceWord, defaultImage} from '@utilities/helpers'
import { appendScript, formatDate, formatDayMonthYear,getFullDateIso8601} from '@utilities/helpers'

// import { mount } from 'enzyme'

describe('funcion reduceWord helper', () => {
    it("debe ser  appendScript, menor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 100;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba longitud mayor a la longitud");
    })

    it("funcion appendScript, mayor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, ";

        expect(reduceWord(word)).toBe("prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitu...");
    })
    it("funcion appendScript, mayor a la longitud deseada sin parametros",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 10;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba lon...adios");
    })
    it("test montaje del element",()=>{
        // const code = 'console.log("hola mundo")';
        // const position = "head";

        // const script = mount(appendScript(code, position))
        expect(appendScript).toBeDefined()
    })
    it("funcion formatDate, debe valdiar la definicion",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDate(datedemo)).toBeDefined()
    })

    it("funcion formatDate, debe valdiar que la generacion del texto es el correcto",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDate(datedemo)).toBe("2019-05-28")
    })
    it("funcion formatDayMonthYear, debe valdiar la definicion",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDayMonthYear(datedemo)).toBeDefined()
    })
    it("funcion formatDayMonthYear, debe validar el texto del formato de la fecha",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDayMonthYear(datedemo)).toBe("Miércoles 28 de mayo del 2019, 14:54")
    })
})






// Rolly
describe('DefaultImage function - Helpers', () =>{
    
})
