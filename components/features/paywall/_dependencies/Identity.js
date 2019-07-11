import addScriptAsync from '../../../utilities/script-async'

const AddIdentity = (props) => {
    const { siteProperties } = props;
    const {
      signwall: { ORIGIN_IDENTITY_SDK, ORIGIN_API },
    } = siteProperties

    return addScriptAsync({
      name: 'sdkIndetityARC',
      url: ORIGIN_IDENTITY_SDK,
    })
      .then(() => {
        window.Identity.apiOrigin = ORIGIN_API
        return window.Identity;
      });
}

export {AddIdentity};