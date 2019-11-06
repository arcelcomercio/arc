// https://elcomercio.arcpublishing.com/alc/arc-products/clavis

import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFusionContext } from 'fusion:context'
import clavisService from "./clavis-service";

const ARC_ORG_NAME = 'elcomercio'

const Clavis = ({ clavisConfig }) => {

    const { arcSite } = useFusionContext()

    useEffect(() => {
        if (clavisConfig) {
            clavisService(clavisConfig, ARC_ORG_NAME, arcSite);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null;
}

Clavis.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    clavisConfig: PropTypes.object.isRequired
};

export default Clavis;