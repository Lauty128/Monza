const words = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'

export function createPassword(length){
  let password = ''
  for(let index=1 ; index <= length ;index++){
    password += words[Math.floor(Math.random() * (words.length -1) )]
  }
  return password
}