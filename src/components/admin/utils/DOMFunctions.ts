export function cleanAllContentFromRowTable(
  children: HTMLCollection | undefined,
) {
  if (!children) return

  Array.from(children as ArrayLike<Element>).forEach((item) => {
    item.innerHTML = ''
    // @ts-ignore
    item.style.padding = '0px'
  })
}

export function removeRowFromTable(children: HTMLCollection | undefined) {
  if (!children) return

  Array.from(children as ArrayLike<Element>).forEach((item) => {
    // @ts-ignore
    item.style.display = 'none'
  })
}
