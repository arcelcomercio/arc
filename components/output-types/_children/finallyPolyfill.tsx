import * as React from 'react'

// ******** script ********
// if ('Promise' in window) {
//   if (!('finally' in Promise.prototype)) {
//     Promise.prototype.finally = function Hook(cb) {
//       const res = () => this
//       const fin = () => Promise.resolve(cb()).then(res)
//       return this.then(fin, fin)
//     }
//   }
// }

const FinallyPolyfill = (): JSX.Element => (
  <script
    dangerouslySetInnerHTML={{
      __html: `"Promise"in window&&("finally"in Promise.prototype||(Promise.prototype.finally=function(i){const o=()=>this,e=()=>Promise.resolve(i()).then(o);return this.then(e,e)}));`,
    }}
  />
)

export default FinallyPolyfill
