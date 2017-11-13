import Vue from 'vue'
import VueSummernote from 'vue-summernote'
import 'summernote/lang/summernote-pt-BR'

require('bootstrap')
require('summernote/dist/summernote.css')

Vue.use(VueSummernote, {
    dialogsFade: true,
    lang: 'pt-BR',
    toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
    ],
    disableResizeEditor: true,
    disableDragAndDrop: true
})