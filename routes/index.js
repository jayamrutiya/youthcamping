var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');



var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'youthcamping',
  port: "3308",

  // host: 'us-cdbr-east-02.cleardb.com',
  // user: 'b3b7e948eb2743',
  // password: 'e5c200c8',
  // database: 'heroku_417645125582a1e',
  // port: "3306",
});
connection.connect(function(err){
  if(!err){
    console.log("DB Connected");
  }else{
    console.log(err);
    console.log("DB not Connected");
  }
});

var img_path = "http://127.0.0.1:3000/brochure/";
var pkg_img = "http://127.0.0.1:3000/packageimage/";
var iti_path = "http://127.0.0.1:3000/itinerary/";
var photo_path = "http://127.0.0.1:3000/photos/";
var blog_path = "http://127.0.0.1:3000/blog/";
var blog_content_path = "http://127.0.0.1:3000/blogcontent/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  var login_query = "SELECT * FROM admin WHERE username = ? AND password = ?";
  connection.query(login_query,[username,password],function(err,result){
    if(err) throw err;
    if(result.length > 0){
      res.send({"status":"success", "msg":"done", "info":result});
    }else{
      res.send({"status":"fail", "msg":"Login Id and Password is not found", "info":""});
    }
  });
});

router.post('/create_package', function(req, res, next){
  var datetime = Date.now();
  // console.log(req.body);
  if(req.body.action == "insert"){
    var brochurefile = req.body.brochure;
    var pkgimg = req.body.package_image;
  // console.log("brochurefile",brochurefile);
  if(brochurefile != undefined){
    console.log("if");
    brochurefile = "brochure_"+datetime+".pdf";
  }else{
    console.log("else");
    brochurefile = "";
  }
  if(pkgimg != ''){
    pkgimg = "pkgimage_"+datetime+".png";
  }else{
    pkgimg = "";
  }
  const packagedata = {
    title: req.body.title,
    days: req.body.days,
    night: req.body.night,
    overview: req.body.overview,
    group_size: req.body.group_size,
    min_age: req.body.min_age,
    pickup_point: req.body.pickup_point,
    difficulty: req.body.difficulty,
    // duration: req.body.duration,
    max_altitude: req.body.max_altitude,
    trek_distance: req.body.trek_distance,
    base_camp: req.body.base_camp,
    package_image: pkgimg,
    brochure: brochurefile,
    package_type: req.body.package_type,
    camp_or_tour: req.body.camp_or_tour,
  }
  console.log(packagedata);
  var query1 = "INSERT INTO package SET ?";
  
  fs.writeFile("public/brochure/brochure_"+datetime+".pdf", req.body.brochure, 'base64', function(brochureerr){
    if(brochureerr){
      // console.log(brochureerr);
      res.send({"status":"Error In brochure"});
    }else{
      fs.writeFile("public/packageimage/pkgimage_"+datetime+".png", req.body.package_image, 'base64', function(pkgimgerr){
        if(pkgimgerr){
          res.send({"status":"Error In Package Image"});
        }else{
          connection.query(query1,[packagedata],function(err1,result1){
            if(err1) throw err1;
            res.send({"status":"success", "msg":"Package Created Successfully"});
          }); 
        }
      });
    }
  });
  }
  if(req.body.action == "update"){
    console.log("update");
    var brochurefile = req.body.brochure;
    console.log("brochurefile", brochurefile);
    var pkgimg = req.body.package_image;
  console.log("pkgimg",pkgimg);
  if(brochurefile != undefined){
    console.log("if");
    brochurefile = "brochure_"+datetime+".pdf";
    var packagedata = {
      title: req.body.title,
      days: req.body.days,
      night: req.body.night,
      overview: req.body.overview,
      group_size: req.body.group_size,
      min_age: req.body.min_age,
      pickup_point: req.body.pickup_point,
      difficulty: req.body.difficulty,
      // duration: req.body.duration,
      max_altitude: req.body.max_altitude,
      trek_distance: req.body.trek_distance,
      base_camp: req.body.base_camp,
      // package_image: pkgimg,
      brochure: brochurefile,
      package_type: req.body.package_type,
      camp_or_tour: req.body.camp_or_tour,
    } 
  }else{
    console.log("else");
    brochurefile = "";
    var packagedata = {
      title: req.body.title,
      days: req.body.days,
      night: req.body.night,
      overview: req.body.overview,
      group_size: req.body.group_size,
      min_age: req.body.min_age,
      pickup_point: req.body.pickup_point,
      difficulty: req.body.difficulty,
      // duration: req.body.duration,
      max_altitude: req.body.max_altitude,
      trek_distance: req.body.trek_distance,
      base_camp: req.body.base_camp,
      // package_image: pkgimg,
      package_type: req.body.package_type,
      camp_or_tour: req.body.camp_or_tour,
    } 
  }
  // if(pkgimg != ''){
  //   pkgimg = "pkgimage_"+datetime+".png";
  // }else{
  //   pkgimg = "";
  // }
    
      // const packagedata = {
      //   title: req.body.title,
      //   days: req.body.days,
      //   night: req.body.night,
      //   overview: req.body.overview,
      //   group_size: req.body.group_size,
      //   min_age: req.body.min_age,
      //   pickup_point: req.body.pickup_point,
      //   difficulty: req.body.difficulty,
      //   // duration: req.body.duration,
      //   max_altitude: req.body.max_altitude,
      //   trek_distance: req.body.trek_distance,
      //   base_camp: req.body.base_camp,
      //   package_image: pkgimg,
      //   brochure: brochurefile,
      //   package_type: req.body.package_type,
      // } 
      var query1 = "UPDATE package SET ? WHERE package_id = ?";
  
      fs.writeFile("public/brochure/brochure_"+datetime+".pdf", req.body.brochure, 'base64', function(brochureerr){
        if(brochureerr){
          // console.log(brochureerr);
          res.send({"status":"Error In brochure"});
        }else{
          // fs.writeFile("public/packageimage/pkgimage_"+datetime+".png", req.body.package_image, 'base64', function(pkgimgerr){
          //   if(pkgimgerr){
          //     res.send({"status":"Error In Error"});
          //   }else{
              connection.query(query1,[packagedata,req.body.packageid],function(err1,result1){
                if(err1) throw err1;
                if(pkgimg != ''){
                  console.log("Pkg Img");
                  fs.writeFile("public/packageimage/pkgimage_"+datetime+".png", req.body.package_image, 'base64', function(imgerr){
                    if(imgerr){
                      res.send({"status":"Error In Image Update"});
                    }else{
                      connection.query("UPDATE package SET package_image = ? WHERE package_id = ?",["pkgimage_"+datetime+".png",req.body.packageid],function(pkgimgerr,pkgimgresult){
                        if(pkgimgerr) throw pkgimgerr;
                        res.send({"status":"success", "msg":"Package Updated Successfully"});
                            
                      });
                    }
                  });
                }else{
                  res.send({"status":"success", "msg":"Package Updated Successfully"});
                }
              });
          //   }
          // });
          
        }
      });
    
  }
});

router.post('/fetch_package', function(req, res, next){
  console.log(req.body.packageid);
  if(req.body.packageid == "all"){
    var query1 = "SELECT * FROM package ORDER BY package_id DESC";
    connection.query(query1,function(err1,result1){
      if(err1) throw err1;
      res.send({"status":"success", "info":result1});
    });
  }else{
    var query2 = "SELECT * FROM package WHERE package_id = ?";
    connection.query(query2,[req.body.packageid],function(err2,result2){
      if(err2) throw err2;
      console.log("brochure", result2);
      if(result2[0].brochure != ''){
        result2.push({
          "brochure_url": img_path + result2[0].brochure,
        });
      }else{
        result2.push({
          "brochure_url": '',
        });
      }
      if(result2[0].package_image != ''){
        result2.push({
          "pkgimg_url": pkg_img + result2[0].package_image,
        });
      }else{
        result2.push({
          "pkgimg_url": '',
        });
      }
      var query3 = "SELECT * FROM package_n_price WHERE package_id = ?";
      connection.query(query3,[req.body.packageid],function(err3,result3){
        if(err3) throw err3;
        var query4 = "SELECT * FROM dates WHERE package_id = ?";
        connection.query(query4,[req.body.packageid],function(err4,result4){
          if(err4) throw err4;
          var query5 = "SELECT * FROM itinerary WHERE package_id = ?";
          connection.query(query5,[req.body.packageid],function(err5,result5){
            if(err5) throw err5;
            if(result5.length > 0){
              for(let i=0; i<result5.length; i++){
                result5[i].iti_photo = iti_path + result5[i].iti_photo;
              }
            }
            var query6 = "SELECT * FROM inc_exc WHERE package_id = ?";
            connection.query(query6,[req.body.packageid],function(err6,result6){
              if(err6) throw err6;
              var query7 = "SELECT * FROM photos_videos WHERE package_id = ?";
              connection.query(query7,[req.body.packageid],function(err7,result7){
                if(err7) throw err7;
                if(result7.length > 0){
                  for(let i=0; i<result7.length; i++){
                    if(result7[i].pv_type == "photo"){
                      result7[i].pv_value = photo_path + result7[i].pv_value;
                    }
                  }
                }
                var query8 = "SELECT * FROM highlights WHERE package_id = ?";
                connection.query(query8,[req.body.packageid],function(err8,result8){
                  if(err8) throw err8;
                  var query9 = "SELECT * FROM things_to_carry WHERE package_id = ?";
                  connection.query(query9,[req.body.packageid],function(err9,result9){
                    if(err9) throw err9;
                    var query10 = "SELECT * FROM faq WHERE package_id = ?";
                    connection.query(query10,[req.body.packageid],function(err10,result10){
                      if(err10) throw err10;
                      var query11 = "SELECT * FROM rnc_policy WHERE package_id = ?";
                      connection.query(query11,[req.body.packageid],function(err11,result11){
                        if(err11) throw err11;
                        res.send({"status":"success", 
                          "info":result2, 
                          "info1":result3,
                          "info2":result4,
                          "info3":result5,
                          "info4":result6,
                          "info5":result7,
                          "info6":result8,
                          "info7":result9,
                          "info8":result10,
                          "info9":result11});
                      });
                    });
                  });
                });
              });
            });
          }); 
        });
      });
    });
  }
});

router.post("/create_pp",function(req, res, next){
  console.log(req.body);
  if(req.body.action == "insert"){
    const ppdata = {
      package_id: req.body.package_id,
      pnp_name: req.body.pnp_name,
      pnp_price: req.body.pnp_price,
    }
    var query1 = "INSERT INTO package_n_price SET ?";
    connection.query(query1,[ppdata],function(err1,result1){
      if(err1) throw err1;
      res.send({"status":"success", "msg":"Package & Price Created Successfully."});
    });
  }
  if(req.body.action == "update"){
    const ppdata2 = {
      pnp_name: req.body.pnp_name,
      pnp_price: req.body.pnp_price,
    }
    var query2 = "UPDATE package_n_price SET ? WHERE pnpid = ?";
    connection.query(query2,[ppdata2,req.body.pnpid],function(err2,result2){
      if(err2) throw err2;
      res.send({"status":"success", "msg":"Package & Price Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var query3 = "DELETE FROM package_n_price WHERE pnpid = ?";
    connection.query(query3,[req.body.pnpid],function(err3,result3){
      if(err3) throw err3;
      res.send({"status":"success", "msg":"Package & Price Deleted Successfully."});
    });
  }
});

router.post("/manage_ad",function(req, res, next){
  console.log(req.body);
  if(req.body.action == "insert"){
    const addata = {
      package_id: req.body.package_id,
      available_dates: req.body.available_dates
    }
    var query1 = "INSERT INTO dates SET ?";
    connection.query(query1,[addata],function(err1,result1){
      if(err1) throw err1;
      res.send({"status":"success", "msg":"Date Created Successfully."});
    });
  }
  if(req.body.action == "update"){
    const addata = {
      available_dates: req.body.available_dates
    }
    var query2 = "UPDATE dates SET ? WHERE dates_id = ?";
    connection.query(query2,[addata,req.body.dates_id],function(err2,result2){
      if(err2) throw err2;
      res.send({"status":"success", "msg":"Date Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var query3 = "DELETE FROM dates WHERE dates_id = ?";
    connection.query(query3,[req.body.dates_id],function(err3,result3){
      if(err3) throw err3;
      res.send({"status":"success", "msg":"Date Deleted Successfully."});
    });
  }
});

router.post("/manage_iti", function(req, res, next){
  var datetime = Date.now();
  // console.log(req.body);
  if(req.body.action == "insert"){
    var itidata = {
      iti_day: req.body.iti_day,
      iti_title: req.body.iti_title,
      iti_description: req.body.iti_description,
      iti_photo: "itinerary_"+datetime+".png",
      package_id: req.body.package_id,
    }
    var itiaddquery = "INSERT INTO itinerary SET ?";
    fs.writeFile("public/itinerary/itinerary_"+datetime+".png", req.body.iti_photo, 'base64', function(itiphotoerr){
      if(itiphotoerr){
        res.send({"status":"fail", "msg":"Error in Itinerary Photo"});
      }else{
        connection.query(itiaddquery,[itidata],function(itiadderr,itiaddresult){
          if(itiadderr) throw itiadderr;
          res.send({"status":"success", "msg":"Itinerary Inserted Successfully."});
        });
      }
    });
  }
  if(req.body.action == "update"){
    // console.log(req.body.iti_photo);
    if(req.body.iti_photo != undefined){
      var itidata = {
        iti_day: req.body.iti_day,
        iti_title: req.body.iti_title,
        iti_description: req.body.iti_description,
        iti_photo: "itinerary_"+datetime+".png",
      }
      var itiupdatequery = "UPDATE itinerary SET ? WHERE itinerary_id = ?";
      fs.writeFile("public/itinerary/itinerary_"+datetime+".png", req.body.iti_photo, 'base64', function(itiphotoerr){
        if(itiphotoerr){
          res.send({"status":"fail", "msg":"Error in Itinerary Photo"});
        }else{
          connection.query(itiupdatequery,[itidata,req.body.itinerary_id],function(itiupdateerr,itiupdateresult){
            if(itiupdateerr) throw itiupdateerr;
            res.send({"status":"success", "msg":"Itinerary Updated Successfully."});
          });
        }
      });
    }else{
      var itidata = {
        iti_day: req.body.iti_day,
        iti_title: req.body.iti_title,
        iti_description: req.body.iti_description,
      }
      var itiupdatequery = "UPDATE itinerary SET ? WHERE itinerary_id = ?";
      connection.query(itiupdatequery,[itidata,req.body.itinerary_id],function(itiupdateerr,itiupdateresult){
        if(itiupdateerr) throw itiupdateerr;
        res.send({"status":"success", "msg":"Itinerary Updated Successfully."});
      });
    }
  }
  if(req.body.action == "delete"){
    var itideletequery = "DELETE FROM itinerary WHERE itinerary_id = ?";
    connection.query(itideletequery,[req.body.itinerary_id],function(itideleteerr,itideleteresult){
      if(itideleteerr) throw itideleteerr;
      res.send({"status":"success", "msg":"Itinerary Deleted Successfully."});
    });
  }
});

router.post("/manage_ie",function(req, res, next){
  console.log(req.body);
  if(req.body.action == "insert"){
    const iedata = {
      ie_value: req.body.ie_value,
      ie_type: req.body.ie_type,
      package_id: req.body.package_id
    }
    var ie_add_query = "INSERT INTO inc_exc SET ?";
    connection.query(ie_add_query,[iedata],function(ie_add_err,ie_add_result){
      if(ie_add_err) throw ie_add_err;
      res.send({"status":"success", "msg":"Service Inserted Successfully."});
    });
  }
  if(req.body.action == "update"){
    const iedata = {
      ie_value: req.body.ie_value,
      ie_type: req.body.ie_type,
    }
    var ie_update_query = "UPDATE inc_exc SET ? WHERE ie_id = ?";
    connection.query(ie_update_query,[iedata,req.body.ie_id],function(ie_update_err,ie_update_result){
      if(ie_update_err) throw ie_update_err;
      res.send({"status":"success", "msg":"Service Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var ie_delete_query = "DELETE FROM inc_exc WHERE ie_id = ?";
    connection.query(ie_delete_query,[req.body.ie_id],function(ie_delete_err,ie_delete_result){
      if(ie_delete_err) throw ie_delete_err;
      res.send({"status":"success", "msg":"Service Deleted Successfully."});
    });
  }
});

router.post("/manage_pv",function(req, res, next){
  var datetime = Date.now();
  if(req.body.action == "insert"){
    if(req.body.pv_type == "video"){
      const pvdata = {
        package_id: req.body.package_id,
        pv_value: req.body.pv_value,
        pv_type: req.body.pv_type,
      }
      var pv_add_query = "INSERT INTO photos_videos SET ?";
      connection.query(pv_add_query,[pvdata],function(pv_add_err,pv_add_result){
        if(pv_add_err) throw pv_add_err;
        res.send({"status":"success", "msg":"Video URL Inserted Successfully."});
      });
    }
    if(req.body.pv_type == "photo"){
      console.log("Photo");
      const pvdata = {
        package_id: req.body.package_id,
        pv_value: "photo_"+datetime+".png",
        pv_type: req.body.pv_type,
      }
      var pv_add_query = "INSERT INTO photos_videos SET ?";
      fs.writeFile("public/photos/photo_"+datetime+".png", req.body.pv_value, 'base64', function(pvphotoerr){
        if(pvphotoerr){
          res.send({"status":"fail", "msg":"Error in Photo"});
        }else{
          connection.query(pv_add_query,[pvdata],function(pv_add_err,pv_add_result){
            if(pv_add_err) throw pv_add_err;
            res.send({"status":"success", "msg":"Photo Inserted Successfully."});
          });
        }
      });
    }
  }
  if(req.body.action == "delete"){
    var pv_delete_query = "DELETE FROM photos_videos WHERE pv_id = ?";
    connection.query(pv_delete_query,[req.body.pv_id],function(pv_delete_err,pv_delete_result){
      if(pv_delete_err) throw pv_delete_err;
      res.send({"status":"success", "msg":"Photo or Video Deleted Successfully."});
    });
  }
});

router.post("/manage_hl",function(req,res,next){
  if(req.body.action == "insert"){
    const hldata = {
      package_id: req.body.package_id,
      hl_value: req.body.hl_value
    }
    var hl_add_query = "INSERT INTO highlights SET ?";
    connection.query(hl_add_query,[hldata],function(hl_add_err,hl_add_result){
      if(hl_add_err) throw hl_add_err;
      res.send({"status":"success", "msg":"Highlight Inserted Successfully."});
    });
  }
  if(req.body.action == "update"){
    const hldata = {
      hl_value: req.body.hl_value
    }
    var hl_update_query = "UPDATE highlights SET ? WHERE hlid = ?";
    connection.query(hl_update_query,[hldata,req.body.hlid],function(hl_update_err,hl_update_result){
      if(hl_update_err) throw hl_update_err;
      res.send({"status":"success", "msg":"Highlight Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var hl_delete_query = "DELETE FROM highlights WHERE hlid = ?";
    connection.query(hl_delete_query,[req.body.hlid],function(hl_delete_err,hl_delete_result_){
      if(hl_delete_err) throw hl_delete_err;
      res.send({"status":"success", "msg":"Highlight Deleted Successfully."});
    });
  }
});

router.post("/manage_ttc",function(req,res,next){
  if(req.body.action == "insert"){
    const ttcdata = {
      package_id: req.body.package_id,
      ttc_value: req.body.ttc_value,
    }
    var ttc_add_query = "INSERT INTO things_to_carry SET ?";
    connection.query(ttc_add_query,[ttcdata],function(ttc_add_err,ttc_add_result){
      if(ttc_add_err) throw ttc_add_err;
      res.send({"status":"success", "msg":"Things to Carry Inserted Successfully."});
    });
  }
  if(req.body.action == "update"){
    const ttcdata = {
      ttc_value: req.body.ttc_value,
    }
    var ttc_update_query = "UPDATE things_to_carry SET ? WHERE ttc_id = ?";
    connection.query(ttc_update_query,[ttcdata,req.body.ttc_id],function(ttc_update_err,ttc_update_result){
      if(ttc_update_err) throw ttc_update_err;
      res.send({"status":"success", "msg":"Things to Carry Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var ttc_delete_query = "DELETE FROM things_to_carry WHERE ttc_id = ?";
    connection.query(ttc_delete_query,[req.body.ttc_id],function(ttc_delete_err,ttc_delete_result){
      if(ttc_delete_err) throw ttc_delete_err;
      res.send({"status":"success", "msg":"Things to Carry Deleted Successfully."});
    });
  }
});

router.post("/manage_faq",function(req,res,next){
  if(req.body.action == "insert"){
    const faqdata = {
      package_id: req.body.package_id,
      question: req.body.question,
      answer: req.body.answer
    }
    var faq_add_query = "INSERT INTO faq SET ?";
    connection.query(faq_add_query,[faqdata],function(faq_add_err,faq_add_result){
      if(faq_add_err) throw faq_add_err;
      res.send({"status":"success", "msg":"FAQ Inserted Successfully."});
    });
  }
  if(req.body.action == "update"){
    const faqdata = {
      question: req.body.question,
      answer: req.body.answer
    }
    var faq_update_query = "UPDATE faq SET ? WHERE faq_id = ?";
    connection.query(faq_update_query,[faqdata,req.body.faq_id],function(faq_update_err,faq_update_result){
      if(faq_update_err) throw faq_update_err;
      res.send({"status":"success", "msg":"FAQ Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var faq_delete_query = "DELETE FROM faq WHERE faq_id = ?";
    connection.query(faq_delete_query,[req.body.faq_id],function(faq_delete_err,faq_delete_result){
      if(faq_delete_err) throw faq_delete_err;
      res.send({"status":"success", "msg":"FAQ Deleted Successfully."});
    });
  }
});

router.post("/manage_py",function(req,res,next){
  if(req.body.action == "insert"){
    connection.query("SELECT * FROM rnc_policy WHERE package_id = ?",[req.body.package_id],function(err,result){
      if(err) throw err;
      if(result.length > 0){
        res.send({"status":"success", "msg":"Only one Policy Allow."});
      }else{
        const pydata = {
          package_id: req.body.package_id,
          rnc_value: req.body.rnc_value
        }
        var py_add_query = "INSERT INTO rnc_policy SET ?";
        connection.query(py_add_query,[pydata],function(py_add_err,py_add_result){
          if(py_add_err) throw py_add_err;
          res.send({"status":"success", "msg":"Policy Inserted Successfully."});
        });
      }
    });
  }
  if(req.body.action == "update"){
    const pydata = {
      rnc_value: req.body.rnc_value
    }
    var py_update_query = "UPDATE rnc_policy SET ? WHERE rnc_id = ?";
    connection.query(py_update_query,[pydata, req.body.rnc_id],function(py_update_err,py_update_result){
      if(py_update_err) throw py_update_err;
      res.send({"status":"success", "msg":"Policy Updated Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var py_delete_query = "DELETE FROM rnc_policy WHERE rnc_id = ?";
    connection.query(py_delete_query,[req.body.rnc_id],function(py_delete_err,py_delete_result){
      if(py_delete_err) throw py_delete_err;
      res.send({"status":"success", "msg":"Policy Deleted Successfully."});
    });
  }
});

router.post("/fetch_subscribe",function(req,res,next){
  var fetch_subscribe = "SELECT * FROM subscribe ORDER BY subscribe_id DESC";
  connection.query(fetch_subscribe,function(sub_err,sub_result){
    if(sub_err) throw sub_err;
    res.send({"status":"success", "info":sub_result});
  });
});

router.post("/fetch_contactus",function(req,res,next){
  var fetch_contactus = "SELECT * FROM contact_us ORDER BY contact_id DESC";
  connection.query(fetch_contactus,function(contactus_err,contactus_result){
    if(contactus_err) throw contactus_err;
    for(let i=0; i<contactus_result.length; i++){
      contactus_result[i].blog_header_img = blog_path + contactus_result[i].blog_header_img;
    }
    res.send({"status":"success", "info":contactus_result});
  });
});

router.post("/fetch_blog",function(req,res,next){
  var bid = req.body.bid;
  var query = "SELECT * FROM blog WHERE blog_id = ?";
  connection.query(query,[bid],function(err,result){
    if(err) throw err;
    for(let i=0; i<result.length; i++){
      result[i].blog_header_img = blog_path + result[i].blog_header_img;
    }
    res.send({"status":"success", "info":result});
  });
});

router.post("/manage_blog",function(req,res,next){
  var datetime = Date.now();
  if(req.body.action == "fetch"){
    var fetch_blog = "SELECT * FROM blog ORDER BY blog_id DESC";
    connection.query(fetch_blog,function(fetch_blog_err,fetch_blog_result){
      if(fetch_blog_err) throw fetch_blog_err;
      for(let i=0; i<fetch_blog_result.length; i++){
        fetch_blog_result[i].blog_header_img = blog_path + fetch_blog_result[i].blog_header_img;
      }
      res.send({"status":"success", "info":fetch_blog_result});
    });
  }
  if(req.body.action == "insert"){
    const blogdata = {
      blog_title: req.body.blog_title,
      blog_date: req.body.blog_date,
      blog_city: req.body.blog_city,
      blog_header_img: "blogheader_"+datetime+".png",
      // blog_content: req.body.blog_content,
      blog_author: req.body.blog_author,
    }
    var blog_add_query = "INSERT INTO blog SET ?";
    fs.writeFile("public/blog/blogheader_"+datetime+".png", req.body.blog_header_img, 'base64', function(blogphotoerr){
      if(blogphotoerr){
        res.send({"status":"fail", "msg":"Error in Blog Header Photo."});
      }else{
        connection.query(blog_add_query,[blogdata],function(blog_add_err,blog_add_result){
          if(blog_add_err) throw blog_add_err;
          res.send({"status":"success", "msg":"Blog Inserted Successfully."});
        });
      }
    });
  }
  if(req.body.action == "update"){
    // var headerimg;
    if(req.body.blog_header_img == ''){
      const blogdata = {
        blog_title: req.body.blog_title,
        blog_date: req.body.blog_date,
        blog_city: req.body.blog_city,
        // blog_content: req.body.blog_content,
        blog_author: req.body.blog_author,
      }
      var blog_update_query = "UPDATE blog SET ? WHERE blog_id = ?";
      connection.query(blog_update_query,[blogdata, req.body.blog_id],function(blog_update_err,blog_update_result){
        if(blog_update_err) throw blog_update_err;
        res.send({"status":"success", "msg":"Blog Updated Successfully."});
      });
    }else{
      const blogdata = {
        blog_title: req.body.blog_title,
        blog_date: req.body.blog_date,
        blog_city: req.body.blog_city,
        blog_header_img: "blogheader_"+datetime+".png",
        // blog_content: req.body.blog_content,
        blog_author: req.body.blog_author,
      }
      var blog_update_query = "UPDATE blog SET ? WHERE blog_id = ?";
      fs.writeFile("public/blog/blogheader_"+datetime+".png", req.body.blog_header_img, 'base64', function(blogphotoerr){
        if(blogphotoerr){
          res.send({"status":"fail", "msg":"Error in Blog Header Photo."});
        }else{
          connection.query(blog_update_query,[blogdata, req.body.blog_id],function(blog_update_err,blog_update_result){
            if(blog_update_err) throw blog_update_err;
            res.send({"status":"success", "msg":"Blog Updated Successfully."});
          });
        }
      });
    }
  }
  if(req.body.action == "delete"){
    var blog_delete_query = "DELETE FROM blog WHERE blog_id = ?";
    connection.query(blog_delete_query,[req.body.blog_id],function(blog_delete_err,blog_delete_result){
      if(blog_delete_err) throw blog_delete_err;
      res.send({"status":"success", "msg":"Blog Deleted Successfully."});
    });
  }
});

router.post("/manage_blog_content", function(req,res,next){
  var datetime = Date.now();
  var bcid = req.body.bcid;
  // console.log(req.body);
  if(req.body.action == "fetch"){
    var fetch_blog_content = "SELECT * FROM blog_content WHERE blog_id = ?";
    connection.query(fetch_blog_content,[req.body.blog_id],function(err,result){
      if(err) throw err;
      for(let i=0; i<result.length; i++){
        result[i].bc_image = blog_content_path + result[i].bc_image;
      }
      // console.log(result);
      res.send({"status":"success", "info":result});
    });
  }
  
  if(req.body.action == "insert"){
    var image = req.body.bc_image;
    
    if(image != ''){
      image = "blogimage_"+datetime+".png";
    }else{
      image = "";
    }
    const bcdata = {
      blog_id: req.body.blog_id,
      bc_title: req.body.bc_title,
      bc_content: req.body.bc_content,
      bc_image: image,
    }
    var bc_add_query = "INSERT INTO blog_content SET ?";
    fs.writeFile("public/blogcontent/blogimage_"+datetime+".png", req.body.bc_image, 'base64', function(bcimgerr){
      if(bcimgerr){
        res.send({"status":"fail", "msg":"Error in Blog Content Photo."});
      }else{
        connection.query(bc_add_query,[bcdata],function(bc_add_err,bc_add_result){
          if(bc_add_err) throw bc_add_err;
          res.send({"status":"success", "msg":"Blog Content Insert Successfully."});
        });
      }
    });
  }
  if(req.body.action == "update"){
    if(req.body.bc_image != ''){
      const bcdata = {
        blog_id: req.body.blog_id,
        bc_title: req.body.bc_title,
        bc_content: req.body.bc_content,
        bc_image: "blogimage_"+datetime+".png",
      }
      var bc_edit_query = "UPDATE blog_content SET ? WHERE bc_id = ?";
    fs.writeFile("public/blogcontent/blogimage_"+datetime+".png", req.body.bc_image, 'base64', function(bcimgerr){
      if(bcimgerr){
        res.send({"status":"fail", "msg":"Error in Blog Content Photo."});
      }else{
        connection.query(bc_edit_query,[bcdata,bcid],function(bc_add_err,bc_add_result){
          if(bc_add_err) throw bc_add_err;
          res.send({"status":"success", "msg":"Blog Content Update Successfully."});
        });
      }
    });
    }else{
      const bcdata = {
        blog_id: req.body.blog_id,
        bc_title: req.body.bc_title,
        bc_content: req.body.bc_content,
      }
      var bc_edit_query = "UPDATE blog_content SET ? WHERE bc_id = ?";
    
        connection.query(bc_edit_query,[bcdata,bcid],function(bc_add_err,bc_add_result){
          if(bc_add_err) throw bc_add_err;
          res.send({"status":"success", "msg":"Blog Content Update Successfully."});
        });
      
    }
  }
  if(req.body.action == "delete"){
    var delete_bc = "DELETE FROM blog_content WHERE bc_id = ?";
    connection.query(delete_bc,[bcid],function(err,result){
      if(err) throw err;
      res.send({"status":"success", "msg":"Blog Content delete Successfully."});
    });
  }
});

router.post("/manage_order",function(req,res,next){
  if(req.body.type == "all"){
    var fetch_all_order = "SELECT * FROM booking b INNER JOIN package p ON b.package_id = p.package_id INNER JOIN package_n_price pnp ON b.pnpid = pnp.pnpid ORDER BY booking_id DESC";
    connection.query(fetch_all_order,function(fetch_order_err,fetch_order_result){
      if(fetch_order_err) throw fetch_order_err;
      res.send({"status":"success", "info":fetch_order_result});
    });
  }
  if(req.body.type == "one"){
    var fetch_order = "SELECT * FROM booking WHERE booking_id = ?";
    connection.query(fetch_order,[req.body.booking_id],function(order_err,order_result){
      if(order_err) throw order_err;
      res.send({"status":"success", "info":order_result});
    });
  }
});

router.post("/change_status",function(req,res,next){
  var query = "UPDATE booking SET status = ? WHERE booking_id = ?";
  connection.query(query,[req.body.status,req.body.bid],function(err,result){
    if(err) throw err;
    res.send({"status":"success", "msg":"Status Change Successfully."});
  });
});

router.post("/manage_users",function(req,res,next){
  var ou_id = req.body.ou_id;
  const udata = {
    booking_id: req.body.booking_id,
    ou_full_name: req.body.ou_full_name,
    ou_mobile_no: req.body.ou_mobile_no,
    ou_emailid: req.body.ou_emailid,
    ou_age: req.body.ou_age,
    ou_gender: req.body.ou_gender
  }
  if(req.body.action == "insert"){
    var add_user = "INSERT INTO other_users SET ?";
    connection.query(add_user,[udata],function(add_err,add_result){
      if(add_err) throw add_err;
      res.send({"status":"success", "msg":"User Add Successfully."});
    });
  }
  if(req.body.action == "fetch"){
    var fetch_users = "SELECT * FROM other_users WHERE booking_id = ?";
    connection.query(fetch_users,[req.body.booking_id],function(fetch_err,fetch_result){
      if(fetch_err) throw fetch_err;
      res.send({"status":"success", "info":fetch_result});
    });
  }
  if(req.body.action == "update"){
    var update_users = "UPDATE other_users SET ? WHERE ou_id = ?";
    connection.query(update_users,[udata,ou_id],function(update_err,update_result){
      if(update_err) throw update_err;
      console.log(update_result);
      res.send({"status":"success", "msg":"User Update Successfully."});
    });
  }
  if(req.body.action == "delete"){
    var delete_user = "DELETE FROM other_users WHERE ou_id = ?";
    connection.query(delete_user,[ou_id],function(delete_err,delete_result){
      if(delete_err) throw delete_err;
      res.send({"status":"success", "msg":"User Delete Successfully."});
    });
  }
});

//users_apis

router.post("/user_booking",function(req,res,next){
  var bdata = {
    package_id: req.body.package_id,
    booking_date: req.body.booking_date,
    departure_date: req.body.departure_date,
    pnpid: req.body.pnpid,
    pnp_price: req.body.pnp_price,
    user_first_name: req.body.user_first_name,
    user_last_name: req.body.user_last_name,
    user_emailid: req.body.user_emailid,
    total_user: req.body.total_user,
    user_contact_num: req.body.user_contact_num,
    user_address_line1: req.body.user_address_line1,
    user_address_line2: req.body.user_address_line2,
    user_city: req.body.user_city,
    user_state: req.body.user_state,
    user_country: req.body.user_country,
    user_pincode: req.body.user_pincode,
    special_requirement: req.body.special_requirement,
    status: req.body.status
  }
  var add_booking = "INSERT INTO booking SET ?";
  connection.query(add_booking,[bdata],function(add_err,add_result){
    if(add_err) throw add_err;
    res.send({"status":"success", "msg":"Your Package Booked Successfully."});
  });
});

router.post("/explor_tour",function(req,res,next){
  var fetch = "SELECT * FROM package pkg INNER JOIN package_n_price pnp ON pkg.package_id = pnp.package_id ORDER BY pnp.pnp_price ASC";
  connection.query(fetch,function(err,result){
    if(err) throw err;
    if(result.length > 0){
      for(let i=0; i<result.length; i++){
        result[i].package_image = pkg_img + result[i].package_image;
      }
    }
    res.send({"status":"success", "info":result});
  });
});

router.post("/flash_deal",function(req,res,next){
  var fetch = "SELECT * FROM package pkg INNER JOIN package_n_price pnp ON pkg.package_id = pnp.package_id ORDER BY pnp.pnpid DESC";
  connection.query(fetch,function(err,result){
    if(err) throw err;
    if(result.length > 0){
      for(let i=0; i<result.length; i++){
        result[i].package_image = pkg_img + result[i].package_image;
      }
    }
    res.send({"status":"success", "info":result});
  }); 
});

router.post("/add_contactus",function(req,res,next){
  var add_query = "INSERT INTO contact_us SET ?";
  var data = {
    contact_name: req.body.contact_name,
    contact_email: req.body.contact_email,
    contact_message: req.body.contact_message,
    contact_date: req.body.contact_date,
  }
  connection.query(add_query,[data],function(err,result){
    if(err) throw err;
    res.send({"status":"success", "msg":"Your Details Send Successfully."});
  });
});

router.post("/add_subscribe",function(req,res,next){
  var add_subscribe = "INSERT INTO subscribe SET ?";
  var data = {
    subscribe_name: req.body.subscribe_name,
    subscribe_emailid: req.body.subscribe_emailid,
  }
  connection.query(add_subscribe,[data],function(err,result){
    if(err) throw err;
    res.send({"status":"success", "msg":"Your Details Send Successfully."});
  });
});

module.exports = router;
