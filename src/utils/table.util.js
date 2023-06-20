export function generateColumn(column){
    const urlMonza = 'https://www.facebook.com/MonzaAutomotor'
    
    return `\n"${column.id_vehicle}","${column.mark.name + " " + column.version }","${generateDescription(column) }","in stock","1","used","${column.price} ARS","${urlMonza}","${column.image}","${column.extra_images}","Vehicle","${column.sale_price || ''}","888"`
}

function generateDescription(data){
    const km = !!data.km ? `${data.km.toLocaleString('es-AR')} km` : "undefined"
    return `💥Modelo: ${data.model}\n💥Motor: ${data.engine}\n💥${data.fuel}\n💥${data.transmission}\n💥${km}\n💥Tracción: ${data.traction || 'Normal'}`
}

const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'

export function createPassword(length){
  let password = ''
  for(let index=1 ; index <= length ;index++){
    password += words[Math.floor(Math.random() * (words.length -1) )]
  }
  return password
}