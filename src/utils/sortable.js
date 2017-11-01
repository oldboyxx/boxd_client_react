export const getNewPosition = (klass, item) => {
  const $prevItem = item.prev('.'+klass)
  const $nextItem = item.next('.'+klass)
  let position

  if (!$prevItem.length && !$nextItem.length) {
    position = 0
  } else if (!$prevItem.length) {
    position = +$nextItem.attr('data-position') - 1
  } else if (!$nextItem.length) {
    position = +$prevItem.attr('data-position') + 1
  } else {
    const prev = +$prevItem.attr('data-position')
    const next = +$nextItem.attr('data-position')
    position = prev + ((next - prev) / 2)
  }

  return position
}

export const domScroller = {

  scroll(id, el, direction, speed = 1) {
    if (!this['isScrolling'+id]) return

    requestAnimationFrame(this.scroll.bind(this, id, el, direction, speed))

    const now = new Date().getTime()
    const dt = now - (this['_time'+id] || now)
    this['_time'+id] = now
    speed = speed * dt

    const method = /up|down/.test(direction) ? 'Top' : 'Left'
    const current = el['scroll'+method]

    el['scroll'+method] = /left|up/.test(direction) ? (current-speed) : (current+speed)
  },

  start(id, ...args) {
    this['isScrolling'+id] = true
    this.scroll(id, ...args)
  },

  stop(id) {
    this['isScrolling'+id] = false
    this['_time'+id] = null
  },

  toggle(id, el, shouldScroll, direction) {
    if (shouldScroll && !this.isScrolling(id)) {
      this.start(id, el, direction)

    } else if (!shouldScroll && this.isScrolling(id)) {
      this.stop(id)
    }
  },

  isScrolling(id) {
    return this['isScrolling'+id]
  },

  scrollListsIfNeeded(el, e) {
    const mouseX = e.clientX
    let shouldScroll = true
    let direction

    if (mouseX < 130) {
      direction = 'left'
    } else if (window.innerWidth - mouseX < 130) {
      direction = 'right'
    } else {
      shouldScroll = false
    }

    this.toggle('lc', el, shouldScroll, direction)
  },

  scrollTasksIfNeeded(el, e) {
    const { top, right, bottom, left } = el.getBoundingClientRect()
    const mouseY = e.clientY
    const mouseX = e.clientX
    let shouldScroll = true
    let direction

    const isInHorizontalBounds = mouseX > left && mouseX < right

    if (mouseY - top < 100 && isInHorizontalBounds) {
      direction = 'up'
    } else if (bottom - mouseY < 100 && isInHorizontalBounds) {
      direction = 'down'
    } else {
      shouldScroll = false
    }

    this.toggle('tk', el, shouldScroll, direction)
  }
}
