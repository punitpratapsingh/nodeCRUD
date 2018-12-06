
/* inside this we deal with crud operation in employee*/

const express=require('express');

var router=express.Router();
const mongoose=require('mongoose');
const Employee = mongoose.model('Employee');

/* create a new router with get function with parameter default url and
request handeler*/
router.get('/',(req, res)=>{
/* from this callback function we retain response*/
res.render("employee/addOrEdit",{
    viewTitle:"Insert Employee"
});
});

/*router for post data*/
router.post('/',(req,res)=>{
    if(req.body._id =='')
       insertRecord(req,res);
       else
       updateRecord(req,res);
});

/* to insert data in mongodb  */
function insertRecord(req,res){
 /*object of employee*/
  var employee = new Employee();
  employee.fullName=req.body.fullName;
  employee.email=req.body.email;
  employee.mobile=req.body.mobile;
  employee.city=req.body.city;

  /* to save result use save() with Employee object */
  employee.save((err,doc)=>{
      if(!err)
       res.redirect('employee/list');
       else{
           if(err.name == ValidationError)
              handleValidationError(err,req.body);
              res.render("employee/addOrEdit",{
                viewTitle:"Insert Employee",
                employee = req.body
            });
           console.log('error during record insertion :' +err);
       }
  });
}
 

router.get('/list',(req,res)=>{
    res.json('from list');
    Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });
        }
        else{
            console.log('error in retrieving list:' +err);
        }
    });
});

function updateRecord(req,res) {
  Employee.findOneAndUpdate({_id: req.body._id}, req.body ,{new:true},(err,doc)=>{
      if(!err){res.redirect('employee/list');}
      else{
          if(err.name=='ValidationError'){
              handleValidationError(err,req,body);
              res.render("employee/addOrEdit",{
                  viewTitle:'Update Employee',
                  employee: req.body

              });
          }
          else
             console.log('error during record update' + err);
      }
  });





}
/* expor this router object from this controller*/

function handleValidationError(err , body){
    for(field in err.errors)
    {
        switch(err.errors[field.path]){
          case 'fullName':
          body['fullNameError']= err.errors[field].message;
          break;

          case 'email':
          body['emailError']= err.errors[field].message;
          break;

          case 'fullName':
          body['mobileError']= err.errors[field].message;
          break;

          case 'fullName':
          body['cityError']= err.errors[field].message;
          break;

          
        }
    }
}



router.get('/:id',(req,res)=>{
    Employee.findById(req.param.id,(err,doc)=>{
   if(!err){

    res.render("employee/addOrEdit",{

        viewTitle:"Update Employee",
        employee: doc
    });
   }
});
});

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
           if(!err){
               res.redirect('/employee/list');
           }
             else{console.log('error in employee delete:' +err);}

    });

});
module.exports=router;