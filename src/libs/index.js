import './http'
import './mask'
import './mixins'
import './directives'
import './breadcrumbs'
import './elements'
import './infinite-loading'
import './socket'
import './wysiwyg'
import './analytics'

import moment from 'moment'
moment.locale('pt-BR')
window.moment = moment

String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 