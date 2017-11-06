import Vue from 'vue'
import {
    Select,
    Option,
    OptionGroup,
    Checkbox,
    Tooltip,
    Dialog,
    Switch,
    DatePicker,
    Notification,
    Message,
    MessageBox,
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)
Vue.component(Checkbox.name, Checkbox)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Dialog.name, Dialog)
Vue.component(Switch.name, Switch)
Vue.component(DatePicker.name, DatePicker)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification