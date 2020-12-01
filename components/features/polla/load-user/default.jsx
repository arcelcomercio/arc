import { React, useState } from 'react'

import customFields from './_dependencies/custom-fields'

// {"uuid":"b35912e8-dbff-49a3-9a1c-bc08d7206424","accessToken":"eyJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoiYjM1OTEyZTgtZGJmZi00OWEzLTlhMWMtYmMwOGQ3MjA2NDI0IiwidW4iOiJwb2xsYXRlc0BnbWFpbC5jb20iLCJkYXRlIjoiMTYwNDcxMTEzNTAxNSIsImlhdCI6MTYwNDcxMTEzNSwiZXhwIjoxNjA0NzE0NzM1LCJqdGkiOiIwNjc4ZjY2Ny1hMjg1LTRiNzUtODYxNC1jMTVkZTBkZjdmMzEifQ.FudlCYUG1cXYFL83Ou2TtOCvlQ0V57h6q6vzD9hZm1r2_igqGHX1FFpL7Z9pjT7ibh__RETEPFXPDwg2gIgZCw","refreshToken":"eyJhbGciOiJIUzUxMiJ9.eyJ1dWlkIjoiYjM1OTEyZTgtZGJmZi00OWEzLTlhMWMtYmMwOGQ3MjA2NDI0IiwidW4iOiJwb2xsYXRlc0BnbWFpbC5jb20iLCJkYXRlIjoiMTYwNDcxMTEzNTAxNSIsImlhdCI6MTYwNDcxMTEzNSwiZXhwIjoxNjM2MjY4NzM1LCJqdGkiOiI1Yzg2NzU5OS0xMThjLTQxYWUtYTBkNy0xZWUzY2UyNTZjMzEiLCJwanRpIjoiMDY3OGY2NjctYTI4NS00Yjc1LTg2MTQtYzE1ZGUwZGY3ZjMxIn0.1d8lOASDla7CKiSi9E1HoQ5ITk7L2b2VgHzg2HXkHLMQiBro_1i1nGwrn0dsuCBVIfYjQbdI1GmHN4x5-Y-SCw"}
// {"createdOn":1604711135000,"modifiedOn":1604711135000,"deletedOn":null,"firstName":null,"lastName":null,"secondLastName":null,"displayName":"pollates@gmail.com","gender":null,"email":"pollates@gmail.com","unverifiedEmail":"pollates@gmail.com","picture":null,"birthYear":null,"birthMonth":null,"birthDay":null,"emailVerified":false,"contacts":null,"addresses":null,"attributes":[{"name":"originDomain","value":"trome.pe","type":"String"},{"name":"originReferer","value":"https://trome.pe/signwall/?outputType=signwall&signwallOrganic=1","type":"String"},{"name":"originMethod","value":"1","type":"String"},{"name":"originDevice","value":"desktop","type":"String"},{"name":"originAction","value":"0","type":"String"},{"name":"termsCondPrivaPoli","value":"1","type":"String"}],"identities":[{"userName":"pollates@gmail.com","passwordReset":false,"type":"Password","lastLoginDate":null,"locked":false}],"legacyId":null,"status":"Active","deletionRule":null,"uuid":"b35912e8-dbff-49a3-9a1c-bc08d7206424"}
const LoadUser = (props) => {
    const {
        customFields: { 
            userInfo = '', 
            userProfile = ''
        } = {}
    } = props

    const [dataUser, setDataUser] = useState({})

    if(typeof(Storage) !== "undefined"){
        window.localStorage.setItem('ArcId.USER_INFO', userInfo)
        window.localStorage.setItem('ArcId.USER_PROFILE', userProfile)

        // ({uuid, nombre, apellido, email, displayName}) = window.localStorage.getItem('ArcId.USER_PROFILE')
        setDataUser(window.localStorage.getItem('ArcId.USER_PROFILE'));
    }
    return (
        <ul>
            <li><strong>UUID:</strong>{dataUser.uuid}</li>
            <li><strong>Nombre:</strong>{dataUser.nombre}</li>
            <li><strong>Apellido:</strong>{dataUser.apellido}</li>
            <li><strong>Email:</strong>{dataUser.email}</li>
            <li><strong>displayName:</strong>{dataUser.displayName}</li>
        </ul>
    )
}
LoadUser.propTypes = {
    customFields,
}

LoadUser.label = 'La Polla - Load User'
LoadUser.static = false

export default LoadUser