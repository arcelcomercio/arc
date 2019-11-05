// https://elcomercio.arcpublishing.com/alc/arc-products/clavis/user-docs

import { useEffect } from "react";
import PropTypes from "prop-types";
import { useFusionContext } from 'fusion:context'
import clavisService from "./clavis-service";

const Clavis = ({ clavisConfig }) => {

    const { arcSite } = useFusionContext()

    useEffect(() => {
        if (clavisConfig) {
            // Note: pass client name as 2nd param in ClavisService to run
            clavisService(clavisConfig, arcSite);
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