const multer = require('multer');

class FileUplaoder {

    static uploadFile(path, avatar) {

        try {
            const filePath = path + '/' + avatar.name;
            avatar.mv(filePath);
            return true;
            
        } catch (err) {
            console.log('Exception occured while uploading file');
            return false;
        }

    }

}

module.exports = FileUplaoder;