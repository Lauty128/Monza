//------ Dependencies
import cloudinary from 'cloudinary';

//------ Utils
import { cloudinary_image } from '../tools/names.js'

//------ Variables
import { cloudinary_name, cloudinary_key, cloudinary_secret } from './env.js'

cloudinary.config({ 
    cloud_name: cloudinary_name, 
    api_key: cloudinary_key, 
    api_secret: cloudinary_secret
});

const upload = (file, folder="Monza") => {
    return new Promise((resolve, reject) => {
        try{
            cloudinary.v2.uploader.upload(file, { folder })
                .then(response=> resolve(response) )
        }
        catch(err){ reject({
            err,
            msg:"Ocurrio un error durante la subida de una imagen"
        }) }
    }) 
}

const destroy = (image) => {
    return new Promise((resolve, reject) => {
        try{
            const image_name = cloudinary_image("Monza", image)
             cloudinary.v2.uploader
                 .destroy(image_name, { resource_type:"image" })
                 .then(response => resolve(response))
        }
        catch(err){ reject({
            err,
            msg:"Ocurrio un error durante la subida de una imagen"
        }) }
    }) 
}

export default {
    upload,
    destroy
}