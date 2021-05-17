const formidable = require('formidable');
const fs = require("fs-extra")
const path = require("path")



module.exports = {
    /**
     * 多文件上传处理
     * @param req{object} 请求
     * @param dir{string} 保存文件的目录
     * @returns paths[Array] 每一个文件对应的路径
     */
    uploadFiles: (req, dir)=> {
        return new Promise((resolve, reject) => {
            let paths = [];
            let uploadDir = path.join(__dirname, "../public", "uploads", dir);
            fs.ensureDirSync(uploadDir)
            const form = new formidable.IncomingForm();
            form.multiples = true;
            form.uploadDir = uploadDir;
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.log(err)
                    reject(err);
                    return;
                }

                // console.log(fields)
                for (let file in files) {
                    let f = files[file];
                    let ext = path.extname(f.name);
                    let newFileName = Math.round(Math.random() * 9999) + Date.now().toString().slice(2)+ext;
                    paths.push("/uploads/"+dir+"/"+newFileName);
                    fs.renameSync(f.path, path.join(uploadDir, newFileName));
                }

                resolve(paths);
                return paths
            });
        });
    },
}