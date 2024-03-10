
export const createMovieValid = async(req, res, next) =>{
    if(!req.body.time) throw new Error('tham số time đang bị thiếu');
    if(!req.body.introduce) throw new Error('tham số introduce đang bị thiếu');
    if(!req.body.year) throw new Error('tham số year đang bị thiếu');
    next()
}

export const uploadFileValidate = async (req, res, next) => {
    const file = req.file;
    const mimetype = file.mimetype.split('/')[0];
    const checkImage = mimetype.includes('image');
    if(!file) throw new Error('Hình ảnh đang bị thiếu');
    if(!checkImage) throw new Error(`Chỉ chấp nhận định dảnh ảnh`);
    next()

}