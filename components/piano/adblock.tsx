import * as React from 'react'

type PianoAdblockProps = {
  disabled?: boolean
}

/**
 * @param props
 * @param props.disabled
 */

const PianoAdblock: React.FC<PianoAdblockProps> = ({ disabled = false }) => {
  if (disabled) return null

  const pianoScript = `
  document.cookie = "__adblocker=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  var setNptTechAdblockerCookie = function(adblocker) {
      var d = new Date();
      d.setTime(d.getTime() + 60 * 5 * 1000);
      document.cookie = "__adblocker=" + (adblocker ? "true" : "false") + "; expires=" + d.toUTCString() + "; path=/";
  };
  var script = document.createElement("script");
  script.setAttribute("async", true);
  script.setAttribute("src", "//www.npttech.com/advertising.js");
  script.setAttribute("onerror", "setNptTechAdblockerCookie(true);");
  document.getElementsByTagName("head")[0].appendChild(script);`

  return <script dangerouslySetInnerHTML={{ __html: pianoScript }} />
}

export default PianoAdblock
