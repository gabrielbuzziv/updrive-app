import Vue from 'vue'
import {
    Select,
    Option,
    OptionGroup,
    Checkbox,
    Tooltip,
    Dialog,
    Notification,
    Message,
    MessageBox,
} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification