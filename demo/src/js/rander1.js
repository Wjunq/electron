let holder = document.getElementById('holder');
let fs = require('fs');
let context = document.getElementById('context')

holder.addEventListener('drop', (e) => {
    e.preventDefault();// 取消默认
    e.stopPropagation(); // 阻止冒泡
    console.log(e)
    for (const file of e.dataTransfer.files) {
        console.log('文件路径为：', file.path);
        fs.readFile(file.path, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let newDiv = document.createElement('div');
                newDiv.className = 'readFile'
                newDiv.innerHTML = `
                <h2>${file.name}</h2>
                <pre>${data}<pre/>
                `;
                context.appendChild(newDiv);
            }
        })
    }
})
holder.addEventListener('dragover', (e) => {
    e.preventDefault();// 取消默认
    e.stopPropagation(); // 阻止冒泡
})