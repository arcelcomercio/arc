import * as React from 'react'
import { ArcSite } from 'types/fusion'

import ShareIcon from '../../../../global-components/icons/share'
import ShareButtons from '../../../../global-components/lite/share/index'
import { originByEnv } from '../../../../utilities/arc/env'
import { isMobile } from '../../../../utilities/client/navigator'

const classes = {
  container: 'metro-share',
  sticky: 'metro-share--sticky',
  mainButton: 'metro-share__button flex items-center',
  customShare: 'metro-share__social flex position-absolute right-0',
}

interface PromoMetroShareButtonProps {
  arcSite: ArcSite
  pathToShare: string
  titleToShare: string
  textToShare: string
  urlToShare?: string
  sticky?: boolean
}

/**
 * Se crea un componente aparte porque tiene un estado independiente al
 * renderizado del listado de cupones y puede vivir por si mismo.
 */
const PromoMetroShareButton: React.FC<PromoMetroShareButtonProps> = ({
  arcSite,
  pathToShare,
  titleToShare,
  textToShare,
  urlToShare,
  sticky = false,
}) => {
  const [socialTitle, setSocialTitle] = React.useState(titleToShare)
  const [activeDefaultShare, setActiveDefaultShare] = React.useState(false)
  const [showStickyShare, setShowStickyShare] = React.useState(sticky)

  React.useEffect(() => {
    if (!socialTitle) setSocialTitle(window.document.title || '')
  }, [])

  React.useEffect(() => {
    const { clientHeight } = document?.body
    const { innerHeight } = window

    // Mantiene visible el botón con sticky hasta que
    // el usuario hace scroll casi hasta el final de la
    // página, donde el botón se oculta
    const handleStickyByScroll = () => {
      if (window.scrollY < clientHeight - innerHeight - 200) {
        if (!showStickyShare) setShowStickyShare(true)
      } else if (window.scrollY >= clientHeight - innerHeight - 200) {
        if (showStickyShare) setShowStickyShare(false)
      }
    }

    // No se usa { passive: true } por soporte de IE11
    if (sticky) window.addEventListener('scroll', handleStickyByScroll)

    return () => {
      if (sticky) window.removeEventListener('scroll', handleStickyByScroll)
    }
  }, [showStickyShare])

  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if ('share' in navigator && isMobile()) {
      const origin = originByEnv(arcSite)
      navigator.share({
        title: socialTitle,
        text: textToShare,
        url: urlToShare || `${origin}${pathToShare}`,
      })
    } else {
      setActiveDefaultShare(!activeDefaultShare)
    }
  }

  return (
    <div
      className={`${classes.container} ${sticky ? classes.sticky : ''} ${
        sticky && showStickyShare ? 'in' : ''
      } ${sticky && !showStickyShare ? 'out' : ''}`}>
      <button
        className={classes.mainButton}
        type="button"
        onClick={handleShare}>
        Compartir <ShareIcon fill="#EE7325" width={16} height={16} />
      </button>
      <div
        className={`${classes.customShare} ${
          activeDefaultShare ? 'in' : 'out'
        }`}>
        <ShareButtons
          activeCopyLink
          activeLinkedin={false}
          path={pathToShare}
          title={socialTitle}
        />
      </div>
    </div>
  )
}

export default PromoMetroShareButton
