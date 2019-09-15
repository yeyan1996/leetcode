// 某个很无聊的东西

import inquirer from 'inquirer'
import fs from 'fs'
import {resolve} from "path";
import {execSync} from "child_process";


function generateSolutionTemplate(number: number): string {
    let res = ""
    for (let i = 1; i <= number; i++) {
        res += `
# 解法${i === 1 ? "" : i}
      
\`\`\`javascript
  
\`\`\`
      
# 分析

    `
    }
    return res
}

(async () => {
    try {
        let res = await inquirer.prompt([
            {
                name: "title",
                message: "markdown title（required）",
                validate: message => !!message
            },
            {
                name: "solutionsNumber",
                message: "number of solution",
                default: 1,
                validate: message => Number(message) >= 1
            }
        ]);


        let md = `
# 题目
      
 ${generateSolutionTemplate(res.solutionsNumber)}    

`
        fs.writeFileSync(`./${res.title}.md`, md)
        execSync(`open "${resolve(__dirname, res.title)}.md"`)
    } catch (e) {
        console.log(e);
    }
})();
