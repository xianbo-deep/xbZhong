
import { DocSearch, injectDocSearchConfig } from "E:/Myown/Blog/node_modules/@vuepress/plugin-docsearch/lib/client/index.js"
import 'E:/Myown/Blog/node_modules/@docsearch/css/dist/style.css'
import 'E:/Myown/Blog/node_modules/@vuepress/plugin-docsearch/lib/client/styles/docsearch.css'
import 'E:/Myown/Blog/node_modules/@vuepress/plugin-docsearch/lib/client/styles/vars.css'

export default {
  enhance({ app }) {
    injectDocSearchConfig(app)
    app.component('SearchBox', DocSearch)
  },
}
