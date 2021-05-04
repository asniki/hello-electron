const path = require('path')
const os = require('os')
const { ipcRenderer } = require('electron')

// import { path } from 'path'
// import { os } from 'os'
// import { ipcRenderer } from 'electron'


window.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('image-form')
    const slider = document.getElementById('slider')
    const imgInput = document.getElementById('img')

    const outputPath = document.getElementById('output-path')
    if (outputPath)
        outputPath.innerText = path.join(os.homedir(), 'imageShrink')


    // on submit
    form.addEventListener('submit', e => {
        e.preventDefault()

        const imgPath = imgInput.files[0].path
        const quality = slider.value

        console.log(imgPath, quality);

        ipcRenderer.send('image:resize', {
            imgPath,
            quality
        })
    })

    // on done
    ipcRenderer.on('image:done', (e, args) => {
        M.toast({
            html: `Image resized to${slider.value}% quality`,
        })
    })
})