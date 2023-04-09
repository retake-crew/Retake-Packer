import Splitter from './Splitter';

import xmlParser from 'xml2js';

class Sparrow extends Splitter {
    static check(data, cb) {
        try {
            if(data.startsWith("ï»¿")) data = data.slice(3);

            xmlParser.parseString(data, (err, atlas) => {
                window.atlas = atlas;

                if(err) {
                    cb(false);
                    return;
                }
                window.atlas = atlas;

                cb(atlas.TextureAtlas && Array.isArray(atlas.TextureAtlas.SubTexture));
            });
        }
        catch(e) {
            console.error(e);
            cb(false);
        }
    }

    static split(data, options, cb) {
        let res = [];

        try {
            if(data.startsWith("ï»¿")) data = data.slice(3);

            xmlParser.parseString(data, (err, atlas) => {
                if(err) {
                    cb(res);
                    return;
                }

                window.atlas = atlas;

                let list = atlas.TextureAtlas.SubTexture;

                var firstName = null;

                for(let item of list) {
                    item = item['$'];

                    var name = Splitter.fixFileName(item.name);

                    if(firstName === null) firstName = name;

                    item.x = parseInt(item.x, 10);
                    item.y = parseInt(item.y, 10);
                    item.width = parseInt(item.width, 10);
                    item.height = parseInt(item.height, 10);
                    if(item.frameX !== null) {
                        item.frameX = -parseInt(item.frameX, 10);
                        item.frameY = -parseInt(item.frameY, 10);
                        item.frameWidth = parseInt(item.frameWidth, 10);
                        item.frameHeight = parseInt(item.frameHeight, 10);
                    } else {
                        item.frameX = 0;
                        item.frameY = 0;
                        item.frameWidth = item.width;
                        item.frameHeight = item.height;
                    }

                    let trimmed = item.width < item.frameWidth || item.height < item.frameHeight;

                    res.push({
                        name: name,
                        frame: {
                            x: item.x,
                            y: item.y,
                            w: item.width,
                            h: item.height
                        },
                        spriteSourceSize: {
                            x: item.frameX,
                            y: item.frameY,
                            w: item.width,
                            h: item.height
                        },
                        sourceSize: {
                            w: item.frameWidth,
                            h: item.frameHeight
                        },
                        rotated: item.rotated === 'true',
                        trimmed: trimmed
                    });
                }

                window.__sparrow_firstName = firstName;

                cb(res);
            });
        }
        catch(e) {
            console.error(e);
        }

        cb(res);
    }

    static get type() {
        return 'Sparrow';
    }
}

export default Sparrow;