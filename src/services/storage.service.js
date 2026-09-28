import ImageKit, { toFile } from "@imagekit/nodejs"
import config from "../config/config.js" 
import { response } from "express";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

export async function uploadFile({buffer,fileName}) {
    const res = await client.files.upload({
        file: await toFile(buffer),
        fileName,
    })

    return res
}