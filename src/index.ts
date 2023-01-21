import './styles.css'
import { mergeFileLists, removeFile, arrayToFileList } from './tools/files'
import { strToDom } from './tools/dom'
import FileListComponent from './components/file-list'

type Props = {
    help: string
    label: string
}

type ChangeEvent = {
    currentTarget: HTMLInputElement
}

/**
 * @element drop-files
 * @attr {String} label - The label used as a bold text for the drop area
 * @attr {String} help - Help text used as a secondary text for the drop area
 * @cssprop --drop-border-color
 * @cssprop --drop-border-color-hover
 */
class DropZoneElement extends HTMLInputElement {
    private fileList: FileListComponent
    private container: HTMLDivElement
    private ignoreCallbacks = false
    private allowMultiple = false

    static get observedAttributes() {
        return ['label', 'help', 'multiple']
    }

    connectedCallback(): void {
        if (this.ignoreCallbacks) return
        this.ignoreCallbacks = true
        const div = this.render()
        this.fileList = new FileListComponent()
        this.insertAdjacentElement('afterend', div)
        this.style.display = 'none'
        div.appendChild(this)
        div.appendChild(this.fileList.render({ onDelete: this.deleteFile.bind(this) }))
        // Listeners
        div.addEventListener('dragover', () => div.classList.add('is-hovered'))
        div.addEventListener('dragleave', () => div.classList.remove('is-hovered'))
        div.addEventListener('drop', () => div.classList.remove('is-hovered'))
        this.container = div
        // Safari need this timer
        window.requestAnimationFrame(() => {
            this.ignoreCallbacks = false
        })
        if (this.files.length > 0) {
            this.onFilesUpdate()
        }
    }

    disconnectedCallback(): void {
        if (this.ignoreCallbacks) return
        this.container.remove()
    }

    attributeChangedCallback(name: 'label' | 'help' | 'multiple', oldValue: string, newValue: string): void {
        if (name === 'label' && this.container) {
            this.container.querySelector('.drop-files__explanations strong').innerHTML = newValue
        }
        if (name === 'help' && this.container) {
            this.container.querySelector('.drop-files__explanations em').innerHTML = newValue
        }
        if (name === 'multiple') {
            this.allowMultiple = newValue !== null
            if (!this.allowMultiple && this.files.length > 1) {
                this.files = arrayToFileList([this.files[0]])
                this.onFilesUpdate()
            }
        }
    }

    private getAttributes(): Props {
        return {
            label: this.getAttribute('label') || 'Drop here or click to upload.',
            help: this.getAttribute('help') || '',
        }
    }

    /**
     * Render the base structure for the component
     */
    private render(): HTMLDivElement {
        const { label, help } = this.getAttributes()
        const dom = strToDom(`<div class="drop-files">
      <div class="drop-files__explanations">
            <strong>${label}</strong>
            <em>${help}</em>
      </div>
      <input type="file" multiple class="drop-files__fake"/>
    </div>`).firstElementChild as HTMLDivElement
        dom.querySelector('.drop-files__fake').addEventListener('change', this.onNewFiles.bind(this))
        return dom
    }

    /**
     * Remove a file from the FileList
     */
    private deleteFile(file: File): void {
        this.files = removeFile(this.files, file)
        this.onFilesUpdate()
    }

    /**
     * Event triggered when new files are selected
     */
    private onNewFiles(e: ChangeEvent): void {
        if (this.allowMultiple) {
            this.files = mergeFileLists(this.files, e.currentTarget.files)
        } else {
            this.files = arrayToFileList([e.currentTarget.files[0]])
        }
        e.currentTarget.files = arrayToFileList([])
        this.onFilesUpdate()
    }

    /**
     * Event triggered when files changes
     */
    private onFilesUpdate(): void {
        this.dispatchEvent(new Event('change'))
        if (this.files.length > 0) {
            this.container.classList.add('has-files')
        } else {
            this.container.classList.remove('has-files')
        }
        this.fileList.update(this.files)
    }
}

try {
    customElements.define('drop-zone', DropZoneElement, { extends: 'input' })
} catch (e) {
    if (e instanceof DOMException) {
        console.error('DOMException : ' + e.message)
    } else {
        throw e
    }
}

export default DropZoneElement
