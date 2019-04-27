const createAccountForm = `	<div class="Card">
<div class="prof_head ">
    <h3>Please kindly choose Account Type</h3>
</div>
    <div class="form__width">
        <form class="create-account" action="#" method="POST">

            <div class="clearfix">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group ">
                        <label>Account Type:</label>
                        <div class="relative">
                            <select class="form-control" required>
                            <option disabled selected></option>
                              <option value="s">Savings</option>
                              <option value="c">Current</option>
                            </select>
                        </div>
                    </div>
                </div>
                </div>
        <div class="clearfix">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                    <input type="submit" class="btn btn-account" name="Submit" value="Submit">
                </div>
            </div>
        </div>				
            </form>
    </div>

</div>`;
(function() {
    function autoForm() {
       const profileForm = `<div class="Card">
       <div class="prof_head ">
           <h3>Please kindly fill your information before you can create a bank account</h3>
       </div>
           <div class="form__width">
               <form class="create-account" id="form" action="#" method="POST">
                   <div class="clearfix">
                       <div class="col-md-6 col-sm-6 col-xs-12">
                           <div class="form-group ">
                               <label>Phone Number</label>
                               <div class="relative">
                                   <input type="phone" name="phone" class="form-control" placeholder="Ex: 8066428001"required>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="clearfix">
                       <div class="col-md-6 col-sm-6 col-xs-12 double__field">
                           <div class="form-group ">
                               <label>Marital Status:</label>
                               <div class="relative">
                                   <select class="form-control" required>
                                   <option disabled selected></option>
                                     <option value="m">Male</option>
                                     <option value="f">Female</option>
                                   </select>
                               </div>
                           </div>
                               <div class="form-group">
                               <label>Choose Date of Birth</label>
                               <div class="relative">
                                   <input class="form-control" id="datepicker" type="text" placeholder="Ex: 29/01/1995"required>
                               </div>
                           </div>
                       </div>
                       </div>
                   <div class="clearfix">
                       <div class="col-md-6 col-sm-6 col-xs-12 double__field">
                           <div class="form-group ">
                               <label>Select State</label>
                               <div class="relative">
                                   <select id="stateSel" class="form-control" required>
                                     <option disabled selected></option>
                                   </select>
                               </div>
                           </div>
                           <div class="form-group BB__lga">
                               <label>Select LGA</label>
                               <div class="relative">
                                   <select id="lgaSel" class="form-control" required>
                                     <option disabled selected></option>
                                   </select>
                               </div>
                           </div>
                       </div>
                   </div>

                   <div class="clearfix">
                   <div class="col-md-12 col-sm-12 col-xs-12">
                       <div class="form-group">
                           <textarea placeholder="Street Address" class="form-control" rows="4" cols="85"></textarea>
                       </div>
                   </div>
                   </div>
               <div class="clearfix">
                   <div class="col-md-12 col-sm-12 col-xs-12">
                       <div class="form-group">
                           <input type="submit" class="btn btn-account" name="Submit" value="Submit">
                       </div>
                   </div>
               </div>				
                   </form>
           </div>

</div>`;


    document.querySelector('.col_ten').innerHTML = profileForm;
    }

    function getSubmit() {
        document.getElementById("form").addEventListener('submit', function(){
            console.log('hi')
            document.querySelector('.col_ten').innerHTML = createAccountForm;
        })
    }

    /* Handling domready event IE9+ */
    function ready(fn) {
        if (document.readyState != 'loading'){
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }
    
      /* Triggering form function after dom ready */
      ready(autoForm);
      ready(getSubmit)
}());