const fs = require('fs');

class GroupUtil {

    static uploadBase64Image(path, base64ImageContent) {
        
        try {
            fs.writeFileSync(path, base64ImageContent,  {encoding: 'base64'});
            return true;
        }catch(e) {
            console.log("Exception occured while uploading base64 image content", new Error(e).stack);
            return false;
        }

    }
}


module.exports = GroupUtil;