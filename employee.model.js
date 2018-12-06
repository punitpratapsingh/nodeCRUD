const mongoose =require('mongoose');
 var employeeSchema =new mongoose.Schema({
            fullName: {
                type: String
            
            },
             email: {
                 type: String
             } ,  
            mobile: {
                type: String
            } ,   
             city:{
                 type:String
             }   
 });
//custum validation for email
employeeSchema.path('email').validate((val)=>{
  emailRegex= /^()<>\\.,.,\s@.:^:; ;
  return emailRegex.test(val);
},'email unvalid');

 mongoose.model('Employee',employeeSchema);