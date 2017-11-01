export const init = (elements, draggableClasses) => {

  elements.forEach(el => {
    let lastClientX, lastClientY, isBeingDragged

    el.addEventListener('mousedown', el.md = e => {
      let shouldDrag

      if (draggableClasses) {
        shouldDrag = false
        const mousedownEl = document.elementFromPoint(e.pageX, e.pageY)
        let elKlasses = mousedownEl.className

        draggableClasses.split(' ').forEach(str => {
          elKlasses.split(' ').forEach(elStr => {
            if (elStr === str) shouldDrag = true
          })
        })
      }

      if (!draggableClasses || shouldDrag) {
        isBeingDragged = true
        lastClientX = e.clientX
        lastClientY = e.clientY
      }
    })

    window.addEventListener('mouseup', el.mu = () => {
      isBeingDragged = false
    })

    window.addEventListener('mousemove', el.mm = e => {
      if (isBeingDragged) {
        el.scrollLeft -= - lastClientX + e.clientX
        el.scrollTop -= - lastClientY + e.clientY
        lastClientX = e.clientX
        lastClientY = e.clientY
      }
    })
  })
}

export const destroy = elements => {
  elements.forEach(el => {
    el.removeEventListener('mousedown', el.md)
    window.removeEventListener('mouseup', el.mu)
    window.removeEventListener('mousemove', el.mm)
  })
}
