import addScriptAsync from '../../../utilities/script-async'

const addSales = (props) => {
    const { siteProperties } = props;
    const {
      signwall: { ORIGIN_SALES_SDK, ORIGIN_API },
    } = siteProperties

    return addScriptAsync({
      name: 'sdkSalesARC',
      url: ORIGIN_SALES_SDK,
    })
      .then((added) => {
        if(added){
          window.Identity.apiOrigin = ORIGIN_API
        }
        return window.Identity;
      });
}

const userProfile = () => {
  if(!window.hasOwnProperty('Identity')){
    throw 'not found Identity'
  }
  
  if(window.Identity.userProfile){
    return Promise.resolve(window.Identity.userProfile)
  }else{
    return window.Identity.getUserProfile()
  }
}


export {AddIdentity, userProfile};