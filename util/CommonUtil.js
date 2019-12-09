const fs = require('fs');

class CommonUtil {

    static removeFilesFromDir(dirPath) {
        try {
            let files = fs.readdirSync(dirPath);
            for(let file of files) fs.unlinkSync(`${dirPath}/${file}`);
        }
        catch(e) { throw e}
    }
}

module.exports = CommonUtil;