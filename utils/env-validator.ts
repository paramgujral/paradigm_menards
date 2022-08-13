
// list out all required env values for your customer's tests here. Capitalization matters.
const requiredValues = [  
  'BASE_URL',
  'HEADLESS',
  'VIEWPORT_WIDTH',
  'VIEWPORT_HEIGHT',
  // 'SECRET_MANAGER',
  // 'admin_username',
  // 'admin_password',
  // 'dealer_username',
  // 'dealer_password',
]

export const envValidate = ()=>{
  requiredValues.map(value => {
    if(typeof process.env[value] === 'undefined'){
      console.log(`missing env value: ${value}`);
      throw new Error(`Missing env value: ${value}`);
    }
  })
}