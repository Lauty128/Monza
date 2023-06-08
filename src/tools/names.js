export const cloudinary_image = (folder, image) =>{
    const image_name_with_format = image.split(`/${folder}/`)
    const name = image_name_with_format[1].slice(0, image_name_with_format[1].length-4)

    return (!!folder) ? `${folder}/${name}` : name
}