// eslint-disable-next-line no-unused-vars
import Quill from 'quill'

function main({ field, initVal, onClose, onSave }) {
  const editor = new Quill('#editor', {
    modules: { toolbar: '#toolbar' },
    theme: 'snow',
  })

  document.getElementById('save').addEventListener('click', () => {
    onSave(editor.editor.scroll.domNode.innerHTML)
  })

  document.getElementById('close').addEventListener('click', () => {
    onClose()
  })
}

window.initializePlugin = main
