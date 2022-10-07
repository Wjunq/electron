let fs = require('fs')
console.log(fs)

// 点击创建文件的回调
let createFile = document.getElementById('createFile');
let i = 1;
createFile.onclick = function(){
    i++;
    fs.writeFile(`input${i}.txt`,'将hello world写入到input文件中',(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log('写入完毕')
        }
    })
}