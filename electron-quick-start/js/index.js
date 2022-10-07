let fs =  require('fs')
fs.writeFile('input.txt','将hello wordl保存到input.txt文件中',(err)=>{
    if(err){
        console.log(err)
    }else{
        alert('写入完毕')
    }
})