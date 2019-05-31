// import React from 'react'
// import { shallow, mount } from 'enzyme'
import {reduceWord} from '@components/helpers'

describe('Test reduceWord', () => {
    it("funcion appendScript",()=>{
        const word ="prueba longitud mayor a la longitud";
        const len = 100;
        const finalText ="...adios"

        ;
        expect(reduceWord(word, len,  finalText)).toBe("prueba longitud mayor a la longitud");
    })

    
})







//Rolly