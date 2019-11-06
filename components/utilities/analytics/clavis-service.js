// https://elcomercio.arcpublishing.com/alc/arc-products/clavis

/* eslint-disable */
function hasLocalStorage() {
    try {
        const uid = new Date().toString();
        window.localStorage.setItem(uid, uid);
        const hasWriteableStorage = window.localStorage.getItem(uid) === uid;
        window.localStorage.removeItem(uid);
        return hasWriteableStorage;
    } catch (e) {
        return false;
    }
}

function generateUUID() {
    let d = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function replace(c) {
            // eslint-disable-next-line no-bitwise
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            // eslint-disable-next-line no-bitwise, eqeq
            return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}

function getUUID() {
    let uuid = localStorage.getItem("uuid");
    if (!uuid) {
        uuid = generateUUID();
        localStorage.setItem("uuid", uuid);
    }
    return uuid;
}

/**
 * @param {object} options clavisConfig.
 * @param {string} clientName The Arc organization identifier.
 * @param {string} site The site service id for the given site. Required for multisite organizations.
 * 
 * @returns 
 * ```
 * UserProfile {
 *   userid:	string
 *   aux_map:	[string($^[A-Z0-9]{3-5}_(H|M|L))
 *      The auxiliaries that are assigned to the user (identified by the 3-letter uid) and whether they fall in the high (H), medium (M), or low (L) buckets.
 *   ]
 * }
 * ```
 */
function clavisService(options, clientName, site) {
    if (options && clientName) {
        if (typeof window === "undefined") {
            throw new Error(
                "You are attempting to invoke clavis tracking in a non browser environment"
            );
        }
        if (!hasLocalStorage()) {
            // eslint-disable-next-line no-console
            console.error(
                "Local Storage does not exist or is not writeable.  Clavis depends on localStorage"
            );
            return;
        }
        const clavis = options;
        if (
            clavis &&
            clavis.contentId &&
            clavis.contentId.length > 0 &&
            clavis.targetingUrl &&
            clavis.targetingUrl.length > 0
        ) {
            const request = new XMLHttpRequest();
            const environment = (window &&
                window.location &&
                window.location.host &&
                (window.location.host.includes('sandbox')
                    || window.location.host.includes('dev')
                    || window.location.host.includes('localhost'))) ?
                `sandbox.[${clientName}]` : clientName;
            request.open("POST", clavis.targetingUrl, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Arc-Org-Name", environment);

            request.onload = function requestOnLoad() {
                if (request.status >= 200 && request.status < 400) {
                    localStorage.setItem("clavis.targeting", request.responseText);
                } else {
                    // Log / Ignore
                }
            };

            request.send(
                JSON.stringify({
                    userid: getUUID(),
                    articleid: `contentapi://${clavis.contentId}`,
                    auxiliaries: clavis.auxiliaries || [],
                    referrer: document.referrer,
                    site
                })
            );
        }
    }
}

export default clavisService;