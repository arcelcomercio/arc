export default arcSite => {
  const logo = {
    depor:
      'https://cdna.depor.com/resources/dist/depor/images/alternate-logo-w.png?d=1',
    diariocorreo:
      'https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/logo.png?d=1',
    elbocon:
      'https://cdna.elbocon.pe/resources/dist/elbocon/images/logo-amp.png?d=1',
    elcomercio:
      'https://cdna.elcomercio.pe/resources/dist/elcomercio/images/white-logo.png?d=1',
    elcomerciomag:
      'https://cdna.elcomercio.pe/resources/dist/elcomerciomag/images/white-logo.png?d=1',
    gestion:
      'https://cdna.gestion.pe/resources/dist/gestion/images/white-logo.png?d=1',
    ojo: 'https://cdna.ojo.pe/resources/dist/ojo/images/white-logo.png?d=1',
    peru21:
      'https://cdna.peru21.pe/resources/dist/peru21/images/white-logo.png?d=1',
    peru21g21:
      'https://cdna.peru21.pe/resources/dist/peru21g21/images/white-logo.png?d=1',
    trome:
      'https://cdna.trome.pe/resources/dist/trome/images/alternate-logo-w.png?d=1',
  }
  return {
    logo: logo[arcSite],
  }
}
