// 某个很无聊的东西

import inquirer from 'inquirer'
import fs from 'fs'
import {resolve} from "path";
import {execSync} from "child_process";

(async () => {
  try {
    let res = await inquirer.prompt([
      {
        name: "title",
        message:"markdown title（required）",
        validate(message){
          return !!message
        }
      }
    ]);
    let md = `
# 题目
      
      
# 解法
      
\`\`\`javascript
  console.log(123)
\`\`\`
      
# 分析
    `
    fs.writeFileSync(`./${res.title}.md`,md)
    execSync(`open "${resolve(__dirname,res.title)}.md"`)
  } catch (e) {
    console.log(e);
  }
})();
