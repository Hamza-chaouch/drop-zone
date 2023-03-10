import pdf from './pdf.svg'
import doc from './doc.svg'
import xls from './xls.svg'
import txt from './txt.svg'
import unknown from './unknown.svg'
import { strToDom } from '../tools/dom'

type IconList = {
  [k: string]: string
}

const icons: IconList = {
  doc: doc,
  docx: doc,
  pdf: pdf,
  xls: xls,
  xlsx: xls,
  csv: xls,
  txt: txt,
  unknown:unknown
}

/*
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ doc: string; docx: string; pdf: string; }'.
  No index signature with a parameter of type 'string' was found on type '{ doc: string; docx: string; pdf: string; }'.

 */

export function renderExtension(file: File): Element {
  const imgExtensions = [
    "apng",
    "avif",
    "gif","jpg","jpeg", "jfif", "pjpeg", "pjp",
    "png",
    "svg",
    "webp",
    "ico",
    "cur",
    "tif",
    "tiff"
  ] ;
  const ext = file.name
    .split('.')
    .slice(-1)[0]
    .toLowerCase()
  if (icons[ext] !== undefined) {

    return strToDom(icons[ext]).firstChild as Element
  }
  if (!imgExtensions.includes(ext)) {
    return strToDom(unknown).firstChild as Element

  }
  const img = strToDom(`<img src=""/>`).firstChild as HTMLImageElement
  const reader = new FileReader()
  reader.addEventListener(
    'load',
    () => {
      img.setAttribute('src', reader.result.toString())

    },
    false,
  )
  reader.readAsDataURL(file)
  return img
}
