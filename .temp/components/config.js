import { hasGlobalComponent } from "E:/Myown/Blog/node_modules/@vuepress/helper/lib/client/index.js";
import Badge from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import VPCard from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/VPCard.js";
import PDF from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/PDF.js";
import VidStack from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/VidStack.js";
import SiteInfo from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/SiteInfo.js";
import BiliBili from "E:/Myown/Blog/node_modules/vuepress-plugin-components/lib/client/components/BiliBili.js";

import "E:/Myown/Blog/node_modules/@vuepress/helper/lib/client/styles/sr-only.css";

export default {
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("VPCard")) app.component("VPCard", VPCard);
    if(!hasGlobalComponent("PDF")) app.component("PDF", PDF);
    if(!hasGlobalComponent("VidStack")) app.component("VidStack", VidStack);
    if(!hasGlobalComponent("SiteInfo")) app.component("SiteInfo", SiteInfo);
    if(!hasGlobalComponent("BiliBili")) app.component("BiliBili", BiliBili);
    
  },
  setup: () => {

  },
  rootComponents: [

  ],
};
