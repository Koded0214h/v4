import {
  SiPython, SiTypescript, SiJavascript, SiRust,
  SiDjango, SiNodedotjs, SiFlask, SiFastapi,
  SiPostgresql, SiGit, SiOpenai, SiSolana,
  SiGithubactions, SiSui, SiSqlite,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { BsCodeSlash, BsFileText, BsDiagram3 } from "react-icons/bs";

export const ROW_1 = [
  { name: "Python",       Icon: SiPython       },
  { name: "TypeScript",   Icon: SiTypescript   },
  { name: "JavaScript",   Icon: SiJavascript   },
  { name: "Java",         Icon: FaJava         },
  { name: "Rust",         Icon: SiRust         },
  { name: "Django",       Icon: SiDjango       },
  { name: "Node.js",      Icon: SiNodedotjs    },
  { name: "Flask",        Icon: SiFlask        },
  { name: "FastAPI",      Icon: SiFastapi      },
  { name: "REST APIs",    Icon: BsCodeSlash    },
  { name: "PostgreSQL",   Icon: SiPostgresql   },
  { name: "SQL Server",   Icon: FaDatabase     },
];

export const ROW_2 = [
  { name: "Azure",           Icon: VscAzure        },
  { name: "Git",             Icon: SiGit           },
  { name: "CI/CD",           Icon: SiGithubactions },
  { name: "Azure OpenAI",    Icon: SiOpenai        },
  { name: "Semantic Kernel", Icon: SiOpenai        },
  { name: "Solana",          Icon: SiSolana        },
  { name: "Sui",             Icon: SiSui           },
  { name: "Data Pipelines",  Icon: FaDatabase      },
  { name: "System Design",   Icon: BsDiagram3      },
  { name: "Tech Writing",    Icon: BsFileText      },
  { name: "API Architecture",Icon: BsCodeSlash     },
  { name: "SQLite",          Icon: SiSqlite        },
];
