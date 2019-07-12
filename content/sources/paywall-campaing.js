const resolve = ({campaing}) => {
    return `https://api-sandbox.gestion.pe/retail/public/v1/offer/preview/${campaing}`
  }

  //https://api-sandbox.gestion.pe
  //paywall-gestion-sandbox
  
  export default {
    resolve,
    params: {
      campaing: 'text',
    },
    transform(data){
      const {name, attributes, pricingStrategies} = data.products[0]
      const plans = pricingStrategies.map(({pricingStrategyId, priceCode, description, rates}) => {
        const [price] = rates;
        const {amount, billingFrequency} = price ;
        return {
          priceCode,
          pricingStrategyId,
          description: JSON.parse(description),
          amount: parseInt(amount),
          billingFrequency
        }
       });
      const summary = attributes.reduce((prev, item) => {
        const {name, value} = item;
        const _value = value.replace(/<p>|<\/p>/g, "")
        if(name === 'feature'){
          prev[name].push(_value);  
        }else{
          prev[name] = _value;
        }
        return prev;
      }, {feature: []})

      return {name, summary, plans}
    }
  }
  