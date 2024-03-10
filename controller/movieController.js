import { movieModel } from "../model/movideModel.js"
import { cloudinary } from "../utils/uploader.js";

const movieController = {
    getAllmovie : async (req, res) => {
        const allMovie = await movieModel.find()
        res.status(200).send({allMovie});
    },
    createMovie : async (req, res) => {
        const {userId} = req.params;
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
        res.status(201).send(`the film has been uploaded`)
    }
}

export {movieController}