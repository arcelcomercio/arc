type GetResponsiveClassesProps = {
  showInDesktop?: boolean
  showInTablet?: boolean
  showInMobile?: boolean
}

const getResponsiveClasses = ({
  showInDesktop = true,
  showInTablet = true,
  showInMobile = true,
}: GetResponsiveClassesProps): string => {
  const responsiveClasses = []
  if (!showInDesktop) responsiveClasses.push('non-desktop')
  if (!showInTablet) responsiveClasses.push('non-tablet')
  if (!showInMobile) responsiveClasses.push('non-mobile')
  return responsiveClasses.join(' ')
}

export default getResponsiveClasses
