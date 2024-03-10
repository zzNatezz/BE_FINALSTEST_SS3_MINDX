import { movieModel } from "../model/movideModel.js"
import { cloudinary } from "../utils/uploader.js";

const movieController = {
    getAllmovie : async (req, res) => {
        const allMovie = await movieModel.find()
        res.status(200).send({allMovie});
    },
    createMovie : async (req, res) => {
        const file = req.file;
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString("base64")}`;
        const fileName = file.originalname.split(".")[0];
        const uploaded = await cloudinary.uploader.upload(dataUrl, {
            public_id: fileName,
            resource_type: 'image'
        })
        await movieModel.create({
            name : req.body.name,
            time : req.body.time,
            year : req.body.year,
            image : {
                url : uploaded.secure_url,
                publicId : uploaded.public_id
            },
            introduce : req.body.introduce
        })
        res.status(201).send(`Phim đã được đăng tải thành công`)
    },
    removeMovie : async(req, res) =>{
        const {movieId} = req.params;
        const findMovie = await movieModel.findById(movieId)
        if(!findMovie) throw new Error (`phim không tồn tại`);
        await cloudinary.uploader.destroy(findMovie.image.publicId);
        await movieModel.findByIdAndDelete(movieId)
        res.status(201).send(`Phim đã được xóa`)
    },
    updateMovieWithoutIMG : async (req, res) =>{
        const {movieId} = req.params;
        const {name, time, year, introduce} = req.body;
        const getMovie = await movieModel.findByIdAndUpdate(movieId,{
            name : name,
            time : time,
            year : year,
            introduce : introduce
        });
        if(!getMovie) throw new Error(`phim không tồn tại`);

        res.status(201).send('Thông tin đã được cập nhật thành công.')
    },
    
    updateMovieIMG : async(req, res) =>{
        const file = req.file
        if(!file) throw new Error('Hình ảnh không tồn tại')
        const {movieId} = req.params;
        const findMovie = await movieModel.findById(movieId);console.log(findMovie);
        const dataUrl = `data:${file.mimetype};base64,${file.buffer?.toString("base64")}`;
        const fileName = file.originalname.split(".")[0];
        await cloudinary.uploader.destroy(findMovie.image.publicId)
        const up_img = await cloudinary.uploader.upload(dataUrl, {
            public_id: fileName,
            resource_type: "image",
          });
        findMovie.image.url = up_img.secure_url;
        findMovie.image.publicId = up_img.public_id;
        await findMovie.save();

        res.status(201).send(`Hinh anh da duoc upload`)
    }
}

export {movieController}