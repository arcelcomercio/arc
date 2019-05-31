import React from 'react'
import { shallow, mount } from 'enzyme'
import { isTSAnyKeyword } from '@babel/types';
import {reduceWord} from '@components/helpers'

describe('Test reduceWord', () => {
    it("funcion appendScript",()=>{
        const word ="prueba longitud menor a 145";
        const len = 10;
        const finalText ="...adios"
    })

    reduceWord(word,len,  finalText);
})







//Rolly