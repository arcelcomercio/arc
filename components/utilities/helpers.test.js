
import {reduceWord, defaultImage} from '@utilities/helpers'
import { appendScript, formatDate, formatDayMonthYear, getFullDateIso8601, getActualDate, isEmpty} from '@utilities/helpers'

// import { mount } from 'enzyme'

describe('Funcion reduceWord helper', () => {
    it("menor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 100;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba longitud mayor a la longitud");
    })

    it("reduceWord, mayor a la longitud deseada",()=>{
        const word ="prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, ";

        expect(reduceWord(word)).toBe("prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitud, prueba longitud mayor a la longitu...");
    })
})

describe("Funcion appendScript", ()=>{
    it("Validacion de definicion",()=>{
        expect(appendScript).toBeDefined()
    })
    it("concatenacion pasando parametros a la funcion",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 10;
        const finalText ="...adios";
        expect(reduceWord(word, len,  finalText)).toBe("prueba lon...adios");
    })
})
describe("Funcion formatDayMonthYear",()=>{
    it("validación de la definicion",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDayMonthYear(datedemo)).toBeDefined()
    })
    it("debe validar el texto del formato de la fecha",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDayMonthYear(datedemo)).toBe("Miércoles 28 de mayo del 2019, 14:54")
    })
})
describe("Funcion getFullDateIso8601",()=>{
    it("validacion de deficinion",()=>{
        expect(getFullDateIso8601).toBeDefined()
    })
    it("Valida si ingresando los parametros retorna falso",()=>{
       
        const fullDate =  '';
        
        expect(getFullDateIso8601(fullDate)).not.toBeTruthy()
    })
    it("El parametro fullDate debe tener valor y debe retornar un objeto json con valores de la fecha",()=>{
       
        const fullDate =  '2019-04-29 22:34:13';
        const dataCompare= {"day": "29", "fullYear": "2019", "hours": "22", "minutes": "34", "month": "04", "seconds": "13"};

        expect(getFullDateIso8601(fullDate)).toEqual(dataCompare)
    })
    it("El parametro fullDate debe tener valor y debe retornar un objeto json con valores de la fecha, tenieendo en cuenta lo valores de los delimitadores",()=>{
       
        const fullDate =  '2019@04@29*22/34/13';
        const delimiterFullDate = '*';
        const separatorDate = '@';
        const separatorTime = '/';

        const dataCompare= {"day": "29", "fullYear": "2019", "hours": "22", "minutes": "34", "month": "04", "seconds": "13"};

        expect(getFullDateIso8601(fullDate, delimiterFullDate, separatorDate, separatorTime)).toEqual(dataCompare)
    })
})

describe("Funcion getActualDate",()=>{
    it(" validacion de la definicion",()=>{
        expect(getActualDate()).toBeDefined()
    })
    it("validacion resultado fecha actual {yyyy-mm-dd}",()=>{
        const dataesperada ="2019-05-31"
        expect(getActualDate()).toBe(dataesperada)
    })
})

describe("Funcion formatDate", ()=>{
    it("valdacion de la definicion",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDate(datedemo)).toBeDefined()
    })
    it("valida que la generacion del texto es el correcto",()=>{
       
        const datedemo =  "2019-05-28T19:54:26Z";
        expect(formatDate(datedemo)).toBe("2019-05-28")
    })
})
describe("Funcion isEmpty",()=>{
    it("validacion de la definicion",()=>{
        expect(isEmpty()).toBeDefined();
    })
})

// Rolly
describe('DefaultImage function - Helpers', () =>{
    
})
