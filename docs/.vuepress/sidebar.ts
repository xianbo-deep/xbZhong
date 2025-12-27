import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/dl/": [
    {
      text: "前置知识",
      icon: "",
      prefix: "primer/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "DL.md" ,
        "GenerativeModels.md",
        "ML.md"
      ],
    },
    {
      text: "Pytorch",
      icon: "",
      prefix: "pytorch/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "pytorch.md",
        "pytorch1.md"
      ],
    },
    {
      text: "LLM",
      icon: "",
      prefix: "llm/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "Bert.md" ,
        "LLM.md",
        "Transformer.md",
        "Word2Vec.md"
      ],
    },
    {
      text: "CV",
      icon: "",
      prefix: "cv/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "CV.md" ,
        "CNN.md",
        "RNN.md",
        "VAE.md",
        "DiffusionModel.md"
      ],
    },
    {
      text: "微调",
      icon: "",
      prefix: "finetune/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "Finetune.md" 
      ],
    },
    
    {
      text: "常见技巧",
      icon: "",
      prefix: "notes/",
      expanded: true,
      // 必填，分组链接列表
      children: [
        "Method.md" ,
        "Package.md",
        "Production.md"
      ],
    },
    // "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
  "/backend/":[
    {
      text: "Java基础",
      icon: "ri:java-fill",
      link: "Java.md",
      expanded: true,
      
      
    },
    {
      text: "JVM",
      icon: "eos-icons:virtual-guest",
      link: "JVM.md",
      expanded: true,
      
    },
    {
      text: "CN",
      icon: "streamline:network-solid",
      link: "CN.md",
      expanded: true,
      
    },
    {
      text: "常见锁",
      icon: "material-symbols:lock-outline",
      link: "Lock.md",
      expanded: true,
      
    },
    {
      text: "Redis",
      icon: "devicon-plain:redis",
      link: "Redis.md",
      expanded: true,
      
    },
    {
      text: "Docker",
      icon: "devicon:docker",
      link: "docker.md",
      expanded: true,
      
    },
    {
      text: "Kubernetes",
      icon: "devicon:kubernetes",
      link: "Kubernetes.md",
      expanded: true,
    },
    {
      text: "RabbitMQ",
      icon: "devicon:rabbitmq",
      link: "RabbitMQ.md",
      expanded: true,
      
    },
    {
      text: "Kafka",
      icon: "skill-icons:kafka",
      link: "Kafka.md",
      expanded: true,
      
    },
    {
      text: "GithubAction",
      icon: "mdi:github",
      link: "GitHubActions.md",
      expanded: true,
      
    },
    {
      text: "Nginx",
      icon: "material-icon-theme:nginx",
      link: "Nginx.md",
      expanded: true,
      
    },
    {
      text: "Springboot",
      icon: "simple-icons:springboot",
      link: "Spring.md",
      expanded: true,
      
    },
    {
      text: "SpringCloud",
      icon: "devicon:spring",
      link: "SpringCloud.md",
      expanded: true,
      
    },
    {
      text: "Dubbo",
      icon: "devicon:apache",
      link: "Dubbo.md",
      expanded: true,
      
    },
    {
      text: "SpringAI",
      icon: "tabler:ai",
      link: "SpringAI.md",
      expanded: true,
      
    },
    {
      text: "Langchain4j",
      icon: "simple-icons:langchain",
      link: "LangChain4j.md",
      expanded: true,
      
    },
  ],
  "/golang/":[
    {
      text: "Go",
      icon: "logos:go",
      link: "Go.md",
      expanded: true, 
    },
    {
      text: "Gin",
      icon: "logos:gin",
      link: "Gin.md",
      expanded: true, 
    },
    {
      text: "Gorm",
      icon: "devicon:go",
      link: "Gorm.md",
      expanded: true, 
    },
    {
      text: "Bash",
      icon: "mdi:bash",
      link: "Bash.md",
      expanded: true, 
    },
  ],
  "/ds/":[
     {
      text: "Acwing",
      icon: "mingcute:code-line",
      link: "Acwing.md",
      expanded: true,
      
    },
    {
      text: "STL",
      icon: "hugeicons:cpp",
      link: "STL.md",
      expanded: true,
      
    },
    {
      text: "CPP",
      icon: "hugeicons:cpp",
      link: "c++.md",
      expanded: true,
      
    },
    {
      text: "查找算法",
      icon: "mingcute:code-line",
      link: "查找算法.md",
      expanded: true,
      
    },
    {
      text: "排序算法",
      icon: "mingcute:code-line",
      link: "排序算法.md",
      expanded: true,
      
    },
    {
      text: "递归",
      icon: "mingcute:code-line",
      link: "递归.md",
      expanded: true,
      
    },
    {
      text: "递归实现枚举",
      icon: "mingcute:code-line",
      link: "递归实现枚举.md",
      expanded: true,
      
    },
    {
      text: "堆和优先队列",
      icon: "mingcute:code-line",
      link: "堆和优先队列.md",
      expanded: true,
      
    },
    {
      text: "链表",
      icon: "mingcute:code-line",
      link: "链表.md",
      expanded: true,
      
    },
    {
      text: "树和二叉树",
      icon: "mingcute:code-line",
      link: "树与二叉树.md",
      expanded: true,
      
    },
    {
      text: "栈和队列",
      icon: "mingcute:code-line",
      link: "栈和队列.md",
      expanded: true,
      
    },
  ],
  "/ZJ/":[
    {
      text: "人工智能培养方案",
      icon: "",
      link: "AI-degree.md",
      expanded: true,
      
    },
    {
      text: "机器人工程方案",
      icon: "",
      link: "Rob-degree.md",
      expanded: true,
      
    },
  ],
  "/coding/":[
    {
      text: "Python",
      icon: "devicon:python",
      link: "Python.md",
      expanded: true,
      
    },
    {
      text: "实习收获",
      icon: "fluent:reward-12-filled",
      link: "个人收获.md",
      expanded: true,
      
    },
    {
      text: "入营任务",
      icon: "material-symbols:task",
      link: "入营任务.md",
      expanded: true,
      
    },
    {
      text: "正则表达式",
      icon: "mdi:regex",
      link: "正则表达式.md",
      expanded: true,
      
    },
    {
      text: "Django",
      icon: "material-icon-theme:django",
      link: "Django.md",
      expanded: true,
      
    },
    {
      text: "Git",
      icon: "material-icon-theme:git",
      link: "git.md",
      expanded: true,
      
    },
    {
      text: "HTML、CSS",
      icon: "skill-icons:html",
      link: "HTML-CSS.md",
      expanded: true,
      
    },
    {
      text: "JavaScript",
      icon: "logos:javascript",
      link: "Javascript.md",
      expanded: true,
      
    },
    {
      text: "MySQL",
      icon: "logos:mysql",
      link: "MySQL.md",
      expanded: true,
      
    },
    {
      text: "Pandas",
      icon: "devicon:pandas",
      link: "Pandas.md",
      expanded: true,
      
    },
    {
      text: "Matplotlib",
      icon: "logos:matplotlib",
      link: "Matplotlib.md",
      expanded: true,
      
    },
    {
      text: "Seaborn",
      icon: "logos:seaborn",
      link: "Seaborn.md",
      expanded: true,
      
    },
  ],
  "/resource/":[
    {
      text: "大一",
      link: "1.md",
      expanded: true
    },
    {
      text: "大二",
      link: "2.md",
      expanded: true
    },{
      text: "大三",
      link: "3.md",
      expanded: true
    },{
      text: "大四",
      link: "4.md",
      expanded: true
    },{
      text: "专业选修",
      link: "minor.md",
      expanded: true
    },
    {
      text: "工具箱",
      link: "tools.md",
      expanded: true
    },
    {
      text: "课程笔记",
      prefix: "coursenote/",
      expanded: true,
      children: [
        {
          text: "前言",
          link: "README.md"
        },
        {
          text: "模式识别与统计学习",
          link: "ml.md"
        },
        {
          text: "人工智能原理及其应用",
          link: "ai_application.md"
        },
        {
          text: "嵌入式系统原理及实验",
          link: "embedding_system.md"
        },
        {
          text: "智能无人系统",
          link: "ius.md"
        },
      ]
    },
  ],
  "/jottings/":[
    {
      text: "信息",
      link: "team.md",
      expanded: true
    },
    {
      text: "音乐",
      link: "music.md",
      expanded: true
    },
    {
      text: "游戏",
      link: "game.md",
      expanded: true
    }
  ]
});