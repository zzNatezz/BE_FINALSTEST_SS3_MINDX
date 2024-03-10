import {isObjectIdOrHexString} from 'mongoose'

export const createMovieValid = async(req, res, next) =>{
    if(!req.body.time) throw new Error('time is required');
    if(!req.body.introduce) throw new Error('introduce is required');
    if(!req.body.year) throw new Error('year is required');
    next()
}

export const uploadFileValidate = async (req, res, next) => {
    const file = req.file;
    const mimetype = file.mimetype.split('/')[0];
    const checkImage = mimetype.includes('image');
    if(!file) throw new Error('Invalid files');
    if(!checkImage) throw new Error(`only accept image type`);
    next()

}