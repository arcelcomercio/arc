import React from 'react'
import { useFusionContext } from 'fusion:context'

import {
  lgFloorPrices,
  // smFloorPrices,
} from './scripts/main'

export default () => {
  const { globalContent = {}, arcSite } = useFusionContext()
  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { path: primarySection } = {} } = {},
    website_url: websiteUrl,
  } = globalContent || {}

  const section = (primarySection || sectionId || _id || '').split('/')[1]

  return (
    <>
      {arcSite === 'depor' &&
        websiteUrl ===
          '/futbol-peruano/descentralizado/melgar-sin-copa-libertadores-joel-sanchez-estamos-muy-preocupados-y-tristes-porque-a-esta-altura-no-tenemos-ningun-campeonato-internacional-video-noticia/' && (
          <script
            dangerouslySetInnerHTML={{
              __html: lgFloorPrices,
            }}
          />
        )}
      {arcSite === 'peru21' && section === 'espectaculos' && (
        <script src="https://00e9e64bacb103ac4ba0766a67fde28c7919c9757520e60191-apidata.googleusercontent.com/download/storage/v1/b/acn-comercio-peru-floor-prices-dev/o/comercioperu%2Fweb-script%2Fayos-opt.js?qk=AD5uMEt3UdBpULLqfx2qo_ce5C2Vu7ER2FTkoP2XxTvuk7g7PGi-EOqCEOuUSefsvt3ZJS8VcgXL3MU4jp5Frd6EZRrir8YBErIbzncosp8b38_-DiTMoNYEvpLTkW4c8Fi1kmRpcQeU9nbc8VG3izXl0iBvSKErZBFtd5CvWXFPy6G5A-sIo-KwkBY83RAdPLtVHjMdpW6OcWeiZzfboje_SsxmIl0_AkPDfXOzR-5pqpdEP4ATFmbj_Qa4wa1VqxO3VpeJf8bNO5VFQ2hbvuELX7NItMVWAfKAu7T8KZQxNSNwBjVzKpCorB_oqahsIKc968kyEjdL0-VffuTp6cylREu956YqNZ2bQZLVhd3rkQjlumU0k48eCryelJb6Z6NpsYP7VhyN4Eq3VZzuJHobhdMzbn73VuSf01o4nrPOqHv0iIjFOg86gHbEwRc_qh2yIita6xKBGWKDkEySMAwEtJvzoDnywmL0eU5VHdxyrIh1qqP29fRfPRYqGQijarTFptI25LNR4vFt92PcVlWgFouBZ3yanLFPELZM2yxoc0Kc6aYwA77YL0oGU02_I5ijqEAhhpGW91iRY60mOd3DyFS_o5GeE8DR3BnZAqyBJX3_StyszpuQ2qnabI517o7xCyMg7r2VPdOW8LhJaRV1ZFqqMeCIabMA1SdkeYZ5t_EsApyTI1xB4M1mQB0qsjwe67woePcGWQSb18WoIS-fDrfoHZKIm4zcRaTI7L8T02a_67bngFIEMOBx3bL15A_Z0m5ufDGTnlv2W8rLPwM9mWc_6XK8zhyoB56YkCq7TdlMANxJWBJT2rzrwRq9DlikYXQeh1UhLu2kJDb7Mk3jf2GGo5HjofFbGXoJUeryfq9No5GlhIk" />
      )}
    </>
  )
}
