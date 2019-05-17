window.pluginOptions = {
  height: '80vh',
  width: '700px',
  maxHeight: '700px',
}

function main({ initVal, onClose, onSave }) {
  // eslint-disable-next-line no-undef
  const editor = new Quill('#editor', {
    modules: {
      toolbar: [
        [
          {
            header: [1, 2, 3, 4, 5, 6, false],
          },
        ],
        ['bold', 'italic', 'underline'],
        [
          {
            list: 'ordered',
          },
          {
            list: 'bullet',
          },
        ],
      ],
    },
    theme: 'snow',
  })

  editor.clipboard.dangerouslyPasteHTML(initVal)

  document.getElementById('btn_save').addEventListener('click', () => {
    onSave(editor.editor.scroll.domNode.innerHTML)
  })

  document.getElementById('btn_close').addEventListener('click', () => {
    onClose()
  })
}

window.initializePlugin = main
