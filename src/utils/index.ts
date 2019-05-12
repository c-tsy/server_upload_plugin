import * as fs from 'fs';
import * as crypto from 'crypto';
/**
 * 文件md5
 * @param filename 
 */
export function md5_file(filename) {
    return new Promise((s,j) => {
        const output = crypto.createHash('md5')
        const input = fs.createReadStream(filename)

        input.on('error', function (err) {
            j(err)
        })

        output.once('readable', function () {
            s(output.read().toString('hex'))
        })

        input.pipe(output)
    })
}