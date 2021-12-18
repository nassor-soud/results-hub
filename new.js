var connecttopagedata, connecttopagestatus , connecttopagemessage; 
var pagename = getURLParameters("page");
var pagedir = getURLParameters("dir");
var cseename; 
var acseename; 
var mybutton=document.getElementById("myBtn");  
 //const mylink="http://resultshub.tk/server/";
 const mylink="/server/";
 
  var token = "token"; 
  var devId = "devid"; 
   
var userfullname;
var	username;
var userlikes;
var userposts;
var userpoints;
var userfollowers;
var userbio;

function m(number, decPlaces) {
	
	number = Math.trunc(number); 
    decPlaces = Math.pow(10,decPlaces); 
    var abbrev = [ "k", "m", "b", "t" ];
 
    for (var i=abbrev.length-1; i>=0; i--) { 
        var size = Math.pow(10,(i+1)*3); 
        if(size <= number) { 
             number = Math.round(number*decPlaces/size)/decPlaces; 
             if((number == 1000) && (i < abbrev.length - 1)) {
                 number = 1;
                 i++;
             } 
             number += abbrev[i]; 
             break;
        }
    }

    return number;
}
function mx(n,d){
	x=(''+n).length,p=Math.pow,d=p(10,d);
	x-=x%3;
return Math.round(n*d/p(10,x))/d+" kMGTPE"[x/3];
}

function getmydetails(user) {
	 $.ajax({
		url: mylink + "fcm/index.php/api/markers",
		method: "post",
		data: "user=" + encrypt(user),
		headers: { 'x-device': encrypt(devId) },
		success: function (data, status, xhr) { 
			 username = "@" + data.message[0].uname;
			 userfullname = data.message[0].flname;
			 userfollowers = data.message[0].ufollower; 
			 userlikes = data.message[0].ulike;
			 userposts = data.message[0].upost; 
			 userbio = data.message[0].ubio;
			 userpoints = data.message[0].upoint;
			 
			$("#userprofilename").html(userfullname);
			$("#userprofileusername").html(username); 
			$("#userprofilefollowers").html(userfollowers);
			$("#userprofilelikes").html(userlikes); 
			$("#userprofileposts").html(userposts);
			$("#userprofilepoints").html(userpoints); 
			$("#userprofilebio").html(userbio);
			 $("#userprofile").modal("show");
    }
	}); 
	 	
	
} 
  
$.ajax({
    url: mylink + "fcm/index.php/api/",
    method: "post",
    data: "user_android_token=" + token,
    success: function (data, status, xhr) { 
	   } 
	
 });  
 
 
function notificationlist() {
	
	var notifications = `<ul class="col-12 list-group list-group-flush justify-content-between" > `;
	$.ajax({
    url: mylink + "fcm/index.php/api/notifications",
    method: "post", 
    success: function (data, status, xhr) { 
				 
		for ($l = 0; $l < data.message.length; $l++) {
			notifications += ` 
			<li class="list-group-item pt-1 pb-1 d-flex justify-content-between align-items-center">
				<div class="col-2 icon icon-50 rounded-circle mb-0 bg-default-light text-default">`;
					if (data.message[$l].logo == "like") {
						notifications += `<span class="fa fa-thumbs-up fa-lg"> </span>`;
					}
					else if (data.message[$l].logo == "comment") {
						notifications += `<span class="fa fa-comment fa-lg"> </span>`;
					}
					else if (data.message[$l].logo == "post") {
						notifications += `<span class="fa fa-edit fa-lg"> </span>`;
					}
					else if (data.message[$l].logo == "message") {
						notifications += `<span class="fa fa-envelope fa-lg"> </span>`;
					}
					else {
						notifications += `<span class="fa fa-info fa-lg"> </span>`;
					}
					
				notifications += `</div>
				<p class="pull-right text-right pt-1 pb-1">` + data.message[$l].info +` <span class="text-default"> @` + data.message[$l].ufrom +` </span></p>
			</li>
			`; 
		}
		notifications += `</ul>`;
		$("#usernotifications").html(notifications);
		$("#notifications").modal("show");
	}
	
 }); 
	
}
$('body').on('hidden.bs.modal','.modal', function (){
     $(this).removeData('bs.modal');
 })
$(function (){
     $('body').tooltip({ selector: '[data-toggle="tooltip"]' });
 });
 
 
$.ajax({
    url: 'resources/pages/csee.json',
    dataType: 'json', 
	async: false,
    success: function (datavs, status, xhr) { 
    cseename = datavs;
   }
});


$.ajax({
    url: 'resources/pages/acsee.json',
    dataType: 'json', 
	async: false,
    success: function (datavs, status, xhr) { 
    acseename = datavs;
   }
});


$(document).on({
	ajaxStart: function (){
		$('#pageload').attr('hidden' , false );  
	},
	ajaxStop: function (){  
		$('#pageload').attr('hidden' , true );  
	}
})


window.onscroll=function () {
    scrollFunction()
};


function encrypt(data){
	var result = data;
	for($l = 0; $l < 5; $l++){
		result = btoa(result);
	}
	return result;
}

function getURLParameters(paramName)
{
    var sURL = window.document.URL.toString();
    if (sURL.indexOf("?") > 0)
    {
        var arrParams = sURL.split("?");
        var arrURLParams = arrParams[1].split("&");
        var arrParamNames = new Array(arrURLParams.length);
        var arrParamValues = new Array(arrURLParams.length);

        var i = 0;
        for (i = 0; i<arrURLParams.length; i++)
        {
            var sParam =  arrURLParams[i].split("=");
            arrParamNames[i] = sParam[0];
            if (sParam[1] != "")
                arrParamValues[i] = unescape(sParam[1]);
            else
                arrParamValues[i] = "No Value";
        }

        for (i=0; i<arrURLParams.length; i++)
        {
            if (arrParamNames[i] == paramName)
            { 
                return arrParamValues[i];
            }
        }
        return "home";
    }
	else {
		if (paramName == "dir"){
			return "pages";
		}
		else {
			return "home";
		}
		
	}
}


function changepage(dir, name){
	window.location.href = 'index.html?dir=' + dir + '&page=' + name;
}

function callfunction(funcname, funcparams) {
	
}

function pages(name='', page = '') { 
    modalclear();
    topFunction();
    var classname = name;
	if (page != "") {
		pagedir = page;
	}
    var name='resources/' + pagedir + '/' + name + '.html';
    $.ajax({
        url: name,
		async: false,
        success: function (data, status, xhr) { 
            $("#datacontent").html(data);  
            if (classname != "home"){
				if (pagedir == "pages"){ 
               		 clearshow("aboutfooter"); 
				}
				else {
					clearshow("notesfooter"); 
				}
            }
            if (classname == "chat"){ 
                loadchat();
            }
        },
		error: function (data, status, xhr) { 
			errordata("connect");
		}
    });
}
 
 
function modalclear() {
    $(".modal").appendTo($('body'));
}


function scrollFunction() {
    if (document.body.scrollTop> 20 || document.documentElement.scrollTop> 20) {
        mybutton.style.display="block";
    } else {
        mybutton.style.display="none";
    }
}


function topFunction() {
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
}

function errordata(error) {
         
	if (error == "connect") {
		Swal.fire({
			position: 'bottom',
			type: 'error',
			icon: "error",
			title: "Connection Trouble!",
			text: "Please Make Sure you are Online",
			showConfirmButton: false, 
		});
	} else {
		Swal.fire({
			position: 'bottom',
			type: 'error',
			icon: "error",
			title: "Service Denied!",
			text: error,
			showConfirmButton: false, 
		});
	}   
}

function errorpage(error) {
     
	if (error == "connect") {
		errortitle = "Connection Trouble!";
		errorinfo = "Please Make Sure you are Online";
	} 
	else {
		errortitle = "Service Denied!";
		errorinfo = error + " <br> kindly recheck data provided or try after sometime.";
	}
	pages('error', 'pages'); 
    $("#errortitle").html(errortitle); 
    $("#errorinfo").html(errorinfo);
	 
}

function GoBack(event) {
    if ('referrerc' in document) {
        window.location = document.referrer; 
    } else {
        window.history.back();
    }
}

function info(year="", center="", gender="", level="", centrename="") { 
    topFunction(); 
    var mylinkyear="y=" + year;
    var mylinkcenter="c=" + center;
    var mylinkgender="gender=" + gender;
    var mylinkcentername="centrename=" + centrename;
    var mylinklevel="l=" + level;
	if (level == "sfna" || level == "psle") {
		infomylink = "infop";
	}
	else {
		infomylink = "info";
	}
    $.ajax({
        url: mylink + infomylink +".php?" + mylinkyear + "&" + mylinkcenter + "&" + mylinkgender + "&" + mylinklevel + "&" + mylinkcentername,
        dataType: 'json', 
        success: function (data, status, xhr) {
            if (data.status == true){
            var d=data;
			var centerrenaem;
			if (level == "sfna" || level == "psle" ) {
				if (data['info'] == null){
					centerrenaem = "";
				}
				else {
					centerrenaem = d['info']['name'];
				} 
			}
			else {
				centerrenaem = findcentername(level, center);
			}
             
             
            var divdata=` 
                  <div class="container mt-1 mb-2 text-center">
            <h3 class="text-white">`+center.toString().toUpperCase()+` - `+year+`</h3>
            <h6 class="text-white">`+centerrenaem+`</h6>`;
			if ((level == "sfna" || level == "psle" )  && d['info'] != null) {
				divdata +=`<h6 class="text-white">`+d['info']['region'] +` - `+ d['info']['district'] +`</h6>`;
			}
            divdata +=`
            <p class="text-white mb-1">Candidate List...</p>
        </div>
		
		<div class="card container mb-3"> 
        <div class="card-body text-center "> 
            <div class="row justify-content-equal no-gutters">
                <div class="col-3 col-md-3" onclick="changepage('pages', 'cinfo&year=`+year+`&school=`+ center +`&level=`+ level+`');"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-bar fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              Info
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3" onclick="changepage('pages', 'history&year=`+year+`&school=`+ center +`&level=`+ level+`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-line fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              History
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3 " onclick="searchcompare('`+ level+`','`+year+`','`+ center +`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-pie fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Compare  
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3 " onclick="resultyearmodal('`+ level+`','`+ center +`','`+year+`')"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-calendar fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Change Year
                        </small>
                    </p>
                </div>
             </div>
        </div>
    </div> 
<div class="card container ">
    <div class="card-body">
                <div class="row layout-spacing layout-top-spacing">
                    <div class="col-lg-12"> 
                                    <table id="data-table" class="table style-3 table-hover non-hover text-default text-strong">
                                          <tbody>`;
										 if (year == "2014") {
											 vpoints = "GPA";
											 vdiv = "Class";
										 }
										 else {
											 vpoints = "Points";
											 vdiv = "Division"; 
										 }
										  if (level == "sfna" || level == "psle") {
											 vpoints = "Average";
											 vdiv = "";
										 }
										if(d['data']['candidate'] != "" || d['data']['candidate'] != null){
											for(loop=0; loop <d['data']['candidate'].length; loop++){
												subjectheadd= d['data']['candidate'][loop]['subject'];
												
												subjectcard ="";
												
											for ( la=0;la <subjectheadd.length; la++){	
												subjectcard +=	 `<li hidden><span class=text-default>`+ subjectheadd[la]['subject']+`</span> <span class=ml-3 class=d-block> <strong> ` + subjectheadd[la]['pass'] + ` </strong></span> </li>`;
													
												 }  
                                                name = d['data']['candidate'][loop]['name'];
                                                if (name != "") {
                                                    name=name;
                                                }  else {
                                                    name=d['data']['candidate'][loop]['centerno'] + ` - ` + d['data']['candidate'][loop]['candidateno'] + ` - ` + d['data']['candidate'][loop]['year'];
                                                }
            divdata += ` <tr onclick="candidatemodal('`+ d['data']['candidate'][loop]['name']+ `','` + d['data']['candidate'][loop]['year']+ `','` + d['data']['candidate'][loop]['centerno']+ `','` + d['data']['candidate'][loop]['candidateno']+ `','` + d['data']['candidate'][loop]['type']+ `','` + d['data']['candidate'][loop]['division']+ `','` + d['data']['candidate'][loop]['aggr']+ `','` + d['data']['candidate'][loop]['sex']+ `',  '`+ subjectcard +  `','` +centerrenaem+ `');"> <td class="user-name pt-1 pb-1"><strong> ` + name + `</strong> <br> <small class="text-gray"> <i> `;
			 if (level != "sfna" && level != "psle") {
			divdata +=  vdiv + ` - ` + d['data']['candidate'][loop]['division'] + `,` ; 
			 }
			divdata +=  vpoints + ` - ` + d['data']['candidate'][loop]['aggr'] + ` </i></small> </td> <td class="text-center pt-1 pb-1"> <a class="profile-img"> <img src="resources/assets/img/` + d['data']['candidate'][loop]['sex'] + `.png " width="50px" alt=" product "> </a>  </td> </tr> `;
											}
										} 
                                       divdata += ` </tbody>
                                    </table>  
                    </div>
                    </div>
                    </div>
                </div>
				
    `;
			
			 
			   
			$("#datacontent").html(divdata);  
            $('#resultcenterchange').attr('onclick' , "searchcentername('"+ level +"' ,'"+year+"')");  
             clearshow("resultsfooter");   
             $('#resultcenterchange').attr('hidden' , false);
             
             } else {
			   
                        errorpage(data.message);
                    }
		},
                error: function (data, status, xhr) {
			   
                    errorpage("connect");
                }
});
}

function candidatemodal(name, year, centerno, candidateno, type, division, points, gender, subject, centername) {
	 if (year == 2014) {
		 vpoints = "GPA";
		 vdiv = "Class";
	 }
	 else {
		 vpoints = "Points";
		 vdiv = "Division"; 
	 }
	  if (level == "sfna" || level == "psle") {
		 vpoints = "Average";
		 vdiv = "";
	 }
    var infocard=` <li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> Centre Name: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                 `+centername+`
            </strong> </span>
    </li>  <li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> Centre No: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                 `+centerno+`
            </strong> </span>
    </li>`;
	 if (level != "sfna" && level != "psle") {
		infocard += `<li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> Candidate Type: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
               `+type+`
            </strong> </span>
    </li> `;
	 }
	 infocard +=`<li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> Year of Exam: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                `+year+`
            </strong> </span>
    </li><li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> Candidate No: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                `+candidateno+`
            </strong> </span>
    </li>`;
	 if (level != "sfna" && level != "psle") {
		infocard += ` <li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> ` + vdiv + `: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                `+division+`
            </strong> </span>
    </li> 
	`;
	 }
	 infocard +=`<li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> ` + vpoints + `: </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                `+points+`
            </strong> </span>
    </li> `;
    var cardimage=` <img alt="avatar"
    src="resources/assets/img/`+gender+`.png"
    width="100px"
    class="rounded-circle"> `;
    if (name == "") {
        name=centerno + " - " + candidateno + " - " + year  ;
    } 
    var subjectcard=``; 
    for (la=0; la <subject.length; la++) {
        subjectcard += ` <li class="list-group-item d-flex justify-content-between align-items-center"> <span class="text-default"> ` + subject[la]["subject"] + ` </span>
        <span class="ml-3 d-block">
            <strong class="text-default">
                `+ subject[la]["pass"]+`
            </strong> </span>
    </li> `;
    }
    if (name != "" || name != null) {
        name=name;
    } else {
        name=centerno + " - " + candidateno + " - " + year;
    }
    subject=subject.split("<li hidden>").join('<li class="list-group-item d-flex justify-content-between align-items-center">');
    $("#candidatemodalcard").modal("show");
    $("#candidatename").html(name);
    $("#iconAccordionOne").html(infocard);
    $("#iconAccordionOne").addClass('show');
    $("#iconAccordionTwo").removeClass('show'); 
    $("#iconAccordionTwo").html(subject);
    $("#candidateimage").html(cardimage); 
} 

function searchcentre() {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next →',
        showCancelButton: true,
        progressSteps: ['1', '2', '3'],
        padding: '2em',
    }).queue([
	{
        title: 'Level',
        text: 'Eg: CSEE, ACSEE, FTNA'
    },
        {
        title: 'Year',
        text: 'Eg: 2020'
    }, {
        title: 'Centre Name',
        text: 'Eg: Dakawa'
    }
    ]).then(function (result) {
        if (result.value) {
            center(result.value[1], "", "", result.value[0], result.value[2]);
        }
    })
}


function searchstudent(level, year) {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        progressSteps: ['1', '2'],
        padding: '2em',
    }).queue([ 
        {
        title: 'Center Number',
        text: 'Eg: P0123 or S0123'
    },
        {
        title: 'Candidate Number',
        text: 'Eg: 0123'
    }
    ]).then(function (result) {
        if (result.value) {
            $.ajax({
                url: mylink + "candidate.php?" + "l=" + level + "&y=" + year + "&c=" + result.value[0] + "&u=" + result.value[1],
                dataType: 'json', 
                success: function (data, status, xhr) {
                    if (data.status == true) {
                        var d=data;
                        subjectheadd=d['data']['candidate'][0]['subject'];
                        subjectcard="";
                        for (la=0; la <subjectheadd.length; la++) {
                            subjectcard += ` <li hidden> <span class=text - warning> ` + subjectheadd[la]['subject'] + ` </span><span class=ml-3 class=d-block><strong>`+ subjectheadd[la]['pass']+`</strong> </span></li> `;
                        }
                        
			   		
			 	var centerrenaem = findcentername(level, result.value[0]);
                        candidatemodal(d['data']['candidate'][0]['name'], d['data']['candidate'][0]['year'], d['data']['candidate'][0]['centerno'], d['data']['candidate'][0]['candidateno'], d['data']['candidate'][0]['type'], d['data']['candidate'][0]['division'], d['data']['candidate'][0]['aggr'], d['data']['candidate'][0]['sex'], subjectcard, centerrenaem); 
                    } else {
			   
                        errordata(data.message);
                    }
                },
                error: function (data, status, xhr) {
			   
                    errordata("connect");
                }
            })
        }
    })
}

function searchcentercode(level, year) {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        progressSteps: ['1'],
        padding: '2em',
    }).queue([ 
        {
        title: 'Center Number',
        text: 'Eg: P0123 or S0123'
    } 
    ]).then(function (result) {
        if (result.value) {
			 info(year, result.value[0], "", level, "");
			 changepage('info', 'school&year='+year+`&school=`+ result.value[0] +`&level=`+ level);
          }
    })
}

function searchcentername(level, year) {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        progressSteps: ['1'],
        padding: '2em',
    }).queue([ 
        {
        title: 'Center Name',
        text: 'Eg: Dakawa'
    } 
    ]).then(function (result) {
        if (result.value) { 
		 changepage("search", "centernames&level=" + level + "&year=" + year + "&center=" + result.value[0]); 
          }
    })
}

function searchcompare(level, year, compare) {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        progressSteps: ['1'],
        padding: '2em',
    }).queue([ 
        {
        title: 'Compare With',
        text: 'Eg: Dakawa'
    } 
    ]).then(function (result) {
        if (result.value) {
         //centernamelist (level, year, result.value[0]);
		 centercompare(level, year, compare, result.value[0]);
			// info(year, "", "", level, result.value[0]);
          }
    })
}

function centernamelist (level, year, name){
        
        output = `  <div class="container mt-3 mb-4 text-center"> 
            <h3 class="text-white">`+name.toString().toUpperCase()+`</h3>
                                <p class="text-white mb-4">Search Results...</p>
        </div> 
<div class="card container ">
    <div class="card-body">
                <div class="row layout-spacing layout-top-spacing">
                    <div class="col-lg-12"> 
                     <div class="input-group mb-1">
                                    <input type="text" id="searchin" class="form-control" placeholder="Centre Name..." aria-label="Centre Name...">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button" onclick="changepage('search', 'centernames&level=` + level + `&year=` + year + `&center='+$('#searchin').val());">Search</button>
                                    </div>
                                </div>
                                    <table id="data-table" class="table style-3 table-hover non-hover text-default text-strong">
                                          <tbody>`;
                                          
        var regex = new RegExp(name, "i"); 
        if (level == "csee"){
               schoolname = cseename;
            }
            else if (level == "acsee"){
                schoolname = acseename;
            }
            else if (level == "psle"){
                schoolname = []; 
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});

            }
            else if (level == "sfna"){
                schoolname = [];
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});
            }
        for(l = 0; l< schoolname.length; l++){
            if ((schoolname[l].name.search(regex) != -1)) { 
				if (level == "psle" || level == "sfna") {
					schoolname[l].no = schoolname[l].code;
				}
                output += ` <tr onclick="changepage('info', 'school&year=`+year+`&school=`+schoolname[l].no +`&level=`+ level+`');" > <td class="user-name  align-self-center "><strong> ` + schoolname[l].name + `</strong>`;
				if (level == "psle" || level == "sfna") {
					output += ` <br class=" pt-0 pb-0"> <small class="text-gray pt-0  pb-0"> <i> Centre Code:  - ` + schoolname[l].code + ` </i></small><br class=" pt-0"> <small class="text-gray pt-0  pb-0"> <i> ` + schoolname[l].region + ` - ` + schoolname[l].district + `  </i></small> `;
				}
				else {
					output += ` <br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> Centre Code:  - ` + schoolname[l].no + ` </i></small> `;
				}
				output += `</td> <td class="text-center   no-gutters justify-content-center"> <div class="icon icon-50 rounded-circle  bg-default-light text-default">    <span class="fa fa-university fa-lg">    </span>  </div>  </td> </tr> `; 
            }  
        }
        
        output += ` </tbody>
                   </table>  
                    </div>
                    </div>
                    </div>
                </div>`;
            $("#datacontent").html(output);  
        
    
}


function  candidatesearch(level){
   if (level == "csee"){
       limit = 2003;
   }
   else if (level == "acsee"){
       limit = 2005;
   }
   else if (level == "sfna"){
       limit = 2015;
   }
   else if (level == "psle"){
       limit = 2014;
   }
   else {
       limit = 2020;
   }
   current = new Date().getFullYear();
   years = "";
   for (lup = current ; lup >= limit; lup--){
 years += `<div class="col-3 col-md-3 mb-3" onclick="searchstudent('`+level+`', '` + lup +`');" data-dismiss="modal"aria-label="Close">
            <div class="icon icon-60 rounded-circle mb-1 bg-default-light text-default">
                <span class="fa fa-calendar fa-2x">
                     
                </span>
            </div>
            <p class="text-secondary">
                <small>
                   <strong> ` + lup +`  </strong>
                </small>
            </p>
        </div>`;
   }
    $("#candidateyearavailable").html(years);
     $("#candidateyear").modal("show");
}
 
function  centercodesearch(level){
   if (level == "csee"){
       limit = 2003;
   } 
   else if (level == "acsee"){
       limit = 2005;
   }
   else if (level == "sfna"){
       limit = 2015;
   }
   else if (level == "psle"){
       limit = 2014;
   }
   else {
       limit = 2020;
   }
   current = new Date().getFullYear();
   years = "";
   for (lup = current ; lup >= limit; lup--){
 years += `<div class="col-3 col-md-3 mb-3" onclick="searchcentercode('`+level+`', '` + lup +`');" data-dismiss="modal"aria-label="Close">
            <div class="icon icon-60 rounded-circle mb-1 bg-default-light text-default">
                <span class="fa fa-calendar fa-2x">
                     
                </span>
            </div>
            <p class="text-secondary">
                <small>
                   <strong> ` + lup +`  </strong>
                </small>
            </p>
        </div>`;
   }
    $("#candidateyearavailable").html(years);
     $("#candidateyear").modal("show");
}
 
function  centrenamesearch(level){
   if (level == "csee"){
       limit = 2003;
   }
   else if (level == "acsee"){
       limit = 2005;
   }
   else if (level == "sfna"){
       limit = 2015;
   }
   else if (level == "psle"){
       limit = 2014;
   }
   else {
       limit = 2020;
   }
   
   current = new Date().getFullYear();
   years = "";
   for (lup = current ; lup >= limit; lup--){
 years += `<div class="col-3 col-md-3 mb-3" onclick="searchcentername('`+level+`', '` + lup +`');" data-dismiss="modal"aria-label="Close">
            <div class="icon icon-60 rounded-circle mb-1 bg-default-light text-default">
                <span class="fa fa-calendar fa-2x">
                     
                </span>
            </div>
            <p class="text-default">
                <small>
                   <strong> ` + lup +`  </strong>
                </small>
            </p>
        </div>`;
   }
    $("#candidateyearavailable").html(years);
     $("#candidateyear").modal("show");
}

function  resultyearmodal(level, center, year, page = ''){
       if (level == "csee"){
           limit = 2003;
       }
   else if (level == "acsee"){
       limit = 2005;
   }
   else if (level == "sfna"){
       limit = 2015;
   }
   else if (level == "psle"){
       limit = 2014;
   }
   else {
       limit = 2020;
   }
       current = new Date().getFullYear();
       years = "";
       for (lup = current ; lup >= limit; lup--){
		   if (page == "cinfo") {
			    years += `<div class="col-3 col-md-3 mb-3"  onclick="changepage('info', 'cinfo&year=`+lup+`&school=`+center +`&level=`+ level+`');" data-dismiss="modal"aria-label="Close">`;
		   }
		   else {
			    years += `<div class="col-3 col-md-3 mb-3"  onclick="changepage('info', 'school&year=`+lup+`&school=`+center +`&level=`+ level+`');" data-dismiss="modal"aria-label="Close">`;
		   }
    
           years += `      <div class="icon icon-60 rounded-circle mb-1 bg-default-light text-default">
                    <span class="fa fa-calendar fa-2x">
                         
                    </span>
                </div>
                <p class="text-secondary">
                    <small>
                       <strong> ` + lup +`  </strong>
                    </small>
                </p>
            </div>`;
       }
        $("#candidateyearavailableresult").html(years);
         $("#resultsyearmodal").modal("show");
    }
   
function clearshow(name){ 
	$("#homefooter").removeClass('active'); 
	$("#resultsfooter").removeClass('active'); 
	$("#notesfooter").removeClass('active'); 
	$("#aboutfooter").removeClass('active'); 
	$("#homefooter").removeClass('active'); 
	$('#resultyearchange').attr('hidden' , "hidden" );
	$('#resultcenterchange').attr('hidden' , "hidden" );
	 
	$("#"+name).addClass('active');
}

function findcentername(level, centercode) {
	var centerrenaem = "";
	var regex = new RegExp(centercode, "i"); 
	if (level == "csee"){
	   schoolname = cseename;
	}
	else if (level == "acsee"){
                schoolname = acseename;
            }
            else if (level == "psle"){ 
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + centercode + '&b=mylink&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});

            }
            else if (level == "sfna"){ 
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + centercode + '&b=mylink&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});
            }	
			 
		var	schoolnamex;
	for(l = 0; l < schoolname.length; l++){
		if (level == "sfna" || level == "psle"){
			schoolnamex = schoolname[l].code;
		}
		else {
			schoolnamex = schoolname[l].no;
		} 
		if ((schoolnamex.search(regex) != -1)) {  
		centerrenaem = schoolname[l].name;
		}  
	}
	return centerrenaem;
}

function history(level, year, center) {
	if (level == "sfna" || level == "psle") {
		infomylink = "historyp";
	}
	else {
		infomylink = "history";
	}
    $.ajax({
        url: mylink + infomylink +".php?" + "l=" + level + "&y=" + year + "&c=" + center, 
                success: function (data, status, xhr) {
	htmll = "";
	limit = data.length; 
	
	for(z = 0; z < limit; z++) {
	var centerrenaem;
			if (level == "sfna" || level == "psle" ) {
				if (data[z]['info'] == null){
					centerrenaem = "";
				}
				else {
					centerrenaem = data[z]['info']['name'];
				}
				
			}
			else {
				centerrenaem = findcentername(level, center);
			}
             	
	htmll += `<div class="container mt-2 mb-1 text-center">
    <h3 class="text-white mb-1">
        `+data[z].center.toString().toUpperCase()+` - `+data[z].year+`
    </h3>
    <h6 class="text-white">`+centerrenaem+`</h6>`;
			if ((level == "sfna" || level == "psle" ) && data[z]['info'] != null) {
				htmll +=`<h6 class="text-white">`+data[z]['info']['region'] +` - `+ data[z]['info']['district'] +`</h6>`;
			}
            htmll +=`
	<p  class="text-white mb-1"> With <strong>` + ( data[z].boys + data[z].girls ) + `</strong> Candidates...</p>
</div>
		<div class="card container mb-3"> 
        <div class="card-body text-center "> 
            <div class="row justify-content-equal no-gutters">
                <div class="col-4 col-md-4" onclick="changepage('pages', 'school&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-graduation-cap fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              Candidates
                        </small>
                    </p>
                </div>
                <div class="col-4 col-md-4" onclick="changepage('pages', 'history&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-line fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              History
                        </small>
                    </p>
                </div>
                <div class="col-4 col-md-4 " onclick="searchcompare('`+ level+`','`+data[z].year+`','`+ data[z].center +`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-pie fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Compare  
                        </small>
                    </p>
                </div>
                
             </div>
        </div>
    </div> 
<div class="row">
    <div class="col-6 pt-1 pb-1">
        <div class="card pt-0 pb-0  mb-3">
            <div class="card-body pt-1 pb-1 text-center">
                <div class="d-flex justify-content-between align-items-center ">
                   <h2 class="text-default">
                    ` + data[z].boys +`
					</h2> 
                     <img src="resources/assets/img/M.png " width="50px" alt=" product ">  
                </div>
                <hr class="bg-default">
                <h5 class="text-default">
                    Boys
                </h5>
            </div>
        </div>
    </div>
    <div class="col-6 pt-1 pb-1">
        <div class="card  pt-0 pb-0 mb-3">
            <div class="card-body text-center pt-1 pb-1">
                <div class="d-flex justify-content-between align-items-center ">
                    <h2 class="text-default ">
                    ` + data[z].girls +`
					</h2> 
                     <img src="resources/assets/img/F.png " width="50px" alt=" product "> 
                </div>
                <hr class="bg-default ">
                <h5 class="text-default ">
                    Girls
                </h5>
            </div>
        </div>
    </div>
</div>
<div class="card pt-0 pb-0  mb-3">
    <div class="card-body text-center">
        <div id="s-line-area`+data[z].year+`" class=" justify-content-between align-items-center text-default ">
        </div>
    </div>
</div>
 <hr class="bg-white">   
<script>
Apex.grid={
    borderColor: '#ffbfbf'
}
Apex.track={
    background: '#ff7396',
}
Apex.tooltip={
    theme: 'dark'
}
// Simple Line Area
var sLineArea={
    chart: {
        height: 300,
        type: 'area',
        toolbar: {
            show: false,
        }
    },  
    dataLabels: {
        enabled: false, 
    }, 
    stroke: {
        curve: 'smooth', 
    },
    series: [{
        name: 'Boys',
        data: ` + data[z].graph.boys +` ,
    }, {
        name: 'Girls',
        data:  ` + data[z].graph.girls +` ,
    }],
    xaxis: {`;
		if (level == "psle" || level == "sfna"){
			htmll +=    `categories: ["A", "B", "C", "D", "F", "Others"],`;
		}
		else{
			htmll += 	`categories: ["Div - I", "Div - II", "Div - III", "Div - IV", "Failed", "Others"],`;
		}
	htmll +=  `}
}
var chart=new ApexCharts(
document.querySelector("#s-line-area`+data[z].year+`"), sLineArea);
chart.render(); 
</script>	 
`;
	}
$("#datacontent").html(htmll);
$('#resultcenterchange').attr('onclick' , "historycentername('history', '"+ level +"' ,'"+year+"')");   
$('#resultcenterchange').attr('hidden' , false);
 }
            })
}


function historyinfo(level, year, center) {
	if (level == "sfna" || level == "psle") {
		infomylink = "historyinfop";
	}
	else {
		infomylink = "historyinfo";
	}
    $.ajax({
        url: mylink + infomylink +".php?" + "l=" + level + "&y=" + year + "&c=" + center, 
                success: function (data, status, xhr) {
	htmll = "";
	limit = data.length; 
	for(z = 0; z < limit; z++) {
		var centerrenaem;
			if (level == "sfna" || level == "psle" ) {
				if (data[z]['info'] == null){
					centerrenaem = "";
				}
				else {
					centerrenaem = data[z]['info']['name'];
				}
				
			}
			else {
				centerrenaem = findcentername(level, center);
			}
             	
	htmll += `<div class="container mt-2 mb-1 text-center">
    <h3 class="text-white mb-1">
        `+data[z].center.toString().toUpperCase()+` - `+data[z].year+`
    </h3>
    <h6 class="text-white">`+centerrenaem+`</h6>`;
			if ((level == "sfna" || level == "psle" ) && data[z]['info'] != null) {
				htmll +=`<h6 class="text-white">`+data[z]['info']['region'] +` - `+ data[z]['info']['district'] +`</h6>`;
			}
            htmll +=`
	<p  class="text-white mb-1"> With <strong>` + ( data[z].boys + data[z].girls ) + `</strong> Candidates...</p>
</div> 

		<div class="card container mb-3"> 
        <div class="card-body text-center "> 
            <div class="row justify-content-equal no-gutters">
                <div class="col-3 col-md-3" onclick="changepage('pages', 'school&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-graduation-cap fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              Candidates
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3" onclick="changepage('pages', 'history&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-line fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              History
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3 " onclick="searchcompare('`+ level+`','`+data[z].year+`','`+ data[z].center +`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-pie fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Compare  
                        </small>
                    </p>
                </div>
                <div class="col-3 col-md-3 " onclick="resultyearmodal('`+ level+`','`+ data[z].center +`','`+data[z].year+`', 'cinfo')"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-calendar fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Change Year
                        </small>
                    </p>
                </div>
             </div>
        </div>
    </div> 
<div class="row">
    <div class="col-6 pt-1 pb-1">
        <div class="card pt-0 pb-0  mb-3">
            <div class="card-body pt-1 pb-1 text-center">
                <div class="d-flex justify-content-between align-items-center ">
                   <h2 class="text-default">
                    ` + data[z].boys +`
					</h2> 
                     <img src="resources/assets/img/M.png " width="50px" alt=" product ">  
                </div>
                <hr class="bg-default">
                <h5 class="text-default">
                    Boys
                </h5>
            </div>
        </div>
    </div>
    <div class="col-6 pt-1 pb-1">
        <div class="card  pt-0 pb-0 mb-3">
            <div class="card-body text-center pt-1 pb-1">
                <div class="d-flex justify-content-between align-items-center ">
                    <h2 class="text-default ">
                    ` + data[z].girls +`
					</h2> 
                     <img src="resources/assets/img/F.png " width="50px" alt=" product "> 
                </div>
                <hr class="bg-default ">
                <h5 class="text-default ">
                    Girls
                </h5>
            </div>
        </div>
    </div>
</div>
<div class="card pt-0 pb-0  mb-3">
    <div class="card-body text-center">
        <div id="s-line-area`+data[z].year+`" class=" justify-content-between align-items-center  text-default">
        </div>
    </div>
</div>
 <hr class="bg-white">   
<script>
Apex.grid={
    borderColor: '#ffbfbf'
}
Apex.track={
    background: '#ff7396',
}
Apex.tooltip={
    theme: 'dark'
}
// Simple Line Area
var sLineArea={
    chart: {
        height: 300,
        type: 'area',
        toolbar: {
            show: false,
        }
    },  
    dataLabels: {
        enabled: false, 
    }, 
    stroke: {
        curve: 'smooth', 
    },
    series: [{
        name: 'Boys',
        data: ` + data[z].graph.boys +` ,
    }, {
        name: 'Girls',
        data:  ` + data[z].graph.girls +` ,
    }],
    xaxis: {`;
		if (level == "psle" || level == "sfna"){
			htmll +=    `categories: ["A", "B", "C", "D", "F", "Others"],`;
		}
		else{
			htmll += 	`categories: ["Div - I", "Div - II", "Div - III", "Div - IV", "Failed", "Others"],`;
		}
	htmll +=  `}
}
var chart=new ApexCharts(
document.querySelector("#s-line-area`+data[z].year+`"), sLineArea);
chart.render(); 
</script>	 
`;
	}
$("#datacontent").html(htmll); 
$('#resultcenterchange').attr('onclick' , "historycentername('info', '"+ level +"' ,'"+year+"')");   
$('#resultcenterchange').attr('hidden' , false);
 }
            })
}


function compare(level, year, centerto, center) {
	if (level == "sfna" || level == "psle") {
		infomylink = "comparep";
	}
	else {
		infomylink = "compare";
	}
    $.ajax({
        url: mylink + infomylink +".php?" + "l=" + level + "&y=" + year + "&c=" + center+ "&cto=" + centerto, 
                success: function (data, status, xhr) {
	htmll = "";
	limit = data.length; 
	for(z = 0; z < limit; z++) {
	var centerrenaem;
			if (level == "sfna" || level == "psle" ) {
				if (data[z]['info'] == null){
					centerrenaem = "";
				}
				else {
					centerrenaem = data[z]['info']['name'];
				}
				
			}
			else {
				centerrenaem = findcentername(level, center);
			}
             	
	htmll += `<div class="container mt-2 mb-1 text-center">
    <h3 class="text-white mb-1">
        `+data[z].center.toString().toUpperCase()+` - `+data[z].year+`
    </h3>
    <h6 class="text-white">`+centerrenaem+`</h6>`;
			if ((level == "sfna" || level == "psle" ) && data[z]['info'] != null) {
				htmll +=`<h6 class="text-white">`+data[z]['info']['region'] +` - `+ data[z]['info']['district'] +`</h6>`;
			}
            htmll +=`
	<p  class="text-white mb-1"> With <strong>` + ( data[z].boys + data[z].girls ) + `</strong> Candidates...</p>
</div> 
		<div class="card container mb-3"> 
        <div class="card-body text-center "> 
            <div class="row justify-content-equal no-gutters">
                <div class="col-4 col-md-4" onclick="changepage('pages', 'school&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');"  >
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-graduation-cap fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              Candidates
                        </small>
                    </p>
                </div>
                <div class="col-4 col-md-4" onclick="changepage('pages', 'history&year=`+data[z].year+`&school=`+ data[z].center +`&level=`+ level+`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-line fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                              History
                        </small>
                    </p>
                </div>
                <div class="col-4 col-md-4 " onclick="searchcompare('`+ level+`','`+data[z].year+`','`+ data[z].center +`');">
                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                        <span class="fa fa-chart-pie fa-lg">
                            
                        </span>
                    </div>
                    <p class="text-default">
                        <small>
                            Compare  
                        </small>
                    </p>
                </div>
                
             </div>
        </div>
    </div> 
<div class="row">
    <div class="col-6 pt-1 pb-1">
        <div class="card pt-0 pb-0  mb-3">
            <div class="card-body pt-1 pb-1 text-center">
                <div class="d-flex justify-content-between align-items-center ">
                   <h2 class="text-default">
                    ` + data[z].boys +`
					</h2> 
                     <img src="resources/assets/img/M.png " width="50px" alt=" product ">  
                </div>
                <hr class="bg-default">
                <h5 class="text-default">
                    Boys
                </h5>
            </div>
        </div>
    </div>
    <div class="col-6 pt-1 pb-1">
        <div class="card  pt-0 pb-0 mb-3">
            <div class="card-body text-center pt-1 pb-1">
                <div class="d-flex justify-content-between align-items-center ">
                    <h2 class="text-default ">
                    ` + data[z].girls +`
					</h2> 
                     <img src="resources/assets/img/F.png " width="50px" alt=" product "> 
                </div>
                <hr class="bg-default ">
                <h5 class="text-default ">
                    Girls
                </h5>
            </div>
        </div>
    </div>
</div>
<div class="card pt-0 pb-0  mb-3">
    <div class="card-body text-center">
        <div id="s-line-area`+data[z].year+z+`" class=" justify-content-between align-items-center  text-default">
        </div>
    </div>
</div>
 <hr class="bg-white">   
<script>
Apex.grid={
    borderColor: '#ffbfbf'
}
Apex.track={
    background: '#ff7396',
}
Apex.tooltip={
    theme: 'dark'
}
// Simple Line Area
var sLineArea={
    chart: {
        height: 300,
        type: 'area',
        toolbar: {
            show: false,
        }
    },  
    dataLabels: {
        enabled: false, 
    }, 
    stroke: {
        curve: 'smooth', 
    },
    series: [{
        name: 'Boys',
        data: ` + data[z].graph.boys +` ,
    }, {
        name: 'Girls',
        data:  ` + data[z].graph.girls +` ,
    }],
    xaxis: {`;
		if (level == "psle" || level == "sfna"){
			htmll +=    `categories: ["A", "B", "C", "D", "F", "Others"],`;
		}
		else{
			htmll += 	`categories: ["Div - I", "Div - II", "Div - III", "Div - IV", "Failed", "Others"],`;
		}
	htmll +=  `}
}
var chart=new ApexCharts(
document.querySelector("#s-line-area`+data[z].year+z+`"), sLineArea);
chart.render(); 
</script>	 
`;
	}
$("#datacontent").html(htmll);
 }
            })
}


function centercompare(level, year, compare, name){
        
        output = `  <div class="card mt-0 mb-0 text-center"> 
            <h3 class="text-default">`+name.toString().toUpperCase()+`</h3>
                                <p class="text-default mb-0">Search Results...</p>
        </div>  
    <div class="card-body">  
                     <div class="input-group mb-1">
                                    <input type="text" id="searchin" class="form-control" placeholder="Centre to Compare..." aria-label="Centre Name...">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button" onclick="centercompare('`+ level+`','`+year+`','` +`'+$('#searchin').val());">Search</button>
                                    </div>
                                </div>
                                    <table id="data-table" class="table style-3 table-hover non-hover text-default text-strong">
                                          <tbody>`;
                                          
        var regex = new RegExp(name, "i"); 
        if (level == "csee"){
               schoolname = cseename;
            }
            else if (level == "acsee"){
                schoolname = acseename;
            }
            else if (level == "psle"){
                schoolname = []; 
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});

            }
            else if (level == "sfna"){
                schoolname = [];
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});
            }
        for(l = 0; l< schoolname.length; l++){
            if ((schoolname[l].name.search(regex) != -1)) { 
			if (level == "psle" || level == "sfna") {
					schoolname[l].no = schoolname[l].code;
				}
                output += ` <tr onclick="changepage('pages', 'compare&year=`+year+`&school=`+schoolname[l].no +`&level=`+ level+ `&compare=`+ compare+`');" > <td class="user-name  align-self-center "><strong> ` + schoolname[l].name + `</strong>`;
				if (level == "psle" || level == "sfna") {
					output += ` <br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> Centre Code:  - ` + schoolname[l].code + ` </i></small><br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> ` + schoolname[l].region + ` - ` + schoolname[l].district + `  </i></small> `;
				}
				else {
					output += ` <br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> Centre Code:  - ` + schoolname[l].no + ` </i></small> `;
				}
				output += `</td> <td class="text-center   no-gutters justify-content-center "> <div class="icon icon-50 rounded-circle  bg-default-light text-default">    <span class="fa fa-university fa-lg">    </span>  </div>  </td> </tr> `; 
            }  
        }
        
        output += ` </tbody>
                   </table>  
                    </div> 
                </div>`;
				
            $("#centercomparedata").html(output);
            $("#centercompare").modal("show");  
        
    
}

function aitranslator(lang, word) {
	a = "tran" + "slate";
	aa = "goo" + "gle" + "apis";
	aaa = "sin" + "gle";
	nice = 'ht' + 'tps:' + '//' + a + '.' + aa +'.c' + 'om/' + a + '_' + 'a' + '/' + aaa, 
	$.ajax({    
    url: nice,  
    dataType: 'json', 
    data: { 
			client: "gtx",
			dt: "t", 
			sl: "auto",  // language from eg: en / sw, auto to autodetect
			tl: lang,	// language to eg: en / sw, 
			q: word    // text to translate  
		},    
    success: function(result) {
		limit = result[0].length;
		var data = "";
		for (var z =  0; z < limit; z++) {
			if (z > 0){
				data += " ";
			}
			data += result[0][z][0]; 
		
		}
		
		$("#dictmeaning").html(data);
		$("#dictresults").modal("show"); 
    },  
    error: function(XMLHttpRequest, errorMsg, errorThrown) {
       // alert(errorMsg);
    }  
});

}

function searchtranslate(lang) {
	var langname;
    if (lang == "swa"){
        word = "Tafsiri Sentensi";
        txt = "Mfano: Napenda Kusoma.";
		neXT = "Tafsiri";
    } 
    else{
		if (lang == "en"){
			langname = "English";
		}
		else if (lang == "en") {
			langname = "English";
		}
		else if (lang == "sw") {
			langname = "Swahili";
		}
		else if (lang == "hi") {
			langname = "Hindi";
		}
		else if (lang == "fr") {
			langname = "French";
		}
		else if (lang == "ar") {
			langname = "Arabic";
		} 
		else if (lang == "zh-CN") {
			langname = "Chinese";
		} 
        
		if (lang == "en"){
			txt = "Eg: Napenda Kusoma."; 
		} 
		else {
			 txt = "Eg: I am reading.";
		}
		word = "Translate a Sentence to <br> " + langname; 
		neXT = "Translate";
    }
    swal.mixin({
        input: 'textarea',
        confirmButtonText: 'Translate',
        showCancelButton: true,
        progressSteps: ['1'],
        padding: '2em',
    }).queue([
	{
        title: word,
        text: txt,
    } 
    ]).then(function (result) {
        if (result.value) {
			aitranslator(lang, result.value[0]); 
        }
    })
}


function centrehistory(page) {
	answ = `     <div class="container text-center">
                            <div class="row justify-content-equal no-gutters">
                                <div class="col-6 col-md-6" onclick="centerhistoryyear('` + page + `','sfna');" data-dismiss="modal" aria-label="Close">
                                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                                         <span class="fa fa-stack"> 
            <strong class="fa fa-stack-2x ">4</strong>                       
                        </span>  
                                    </div>
                                    <p class="text-default">
                                        <small>
                                            Standard Four   <strong>( SFNA )</strong>
                                        </small>
                                    </p>
                                </div>
                                <div class="col-6 col-md-6" onclick="centerhistoryyear('` + page + `','psle');" data-dismiss="modal"
                                aria-label="Close">
                                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                                        <span class="fa fa-stack"> 
            <strong class="fa fa-stack-2x ">7</strong>                       
                        </span>  
                                    </div>
                                    <p class="text-default">
                                        <small>
                                             Standard Seven  <strong>( PSLE )</strong>
                                        </small>
                                    </p>
                                </div>
								<div class="col-6 col-md-6" onclick="centerhistoryyear('` + page + `','csee');" data-dismiss="modal" aria-label="Close">
                                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                                         <span class="fa fa-stack"> 
            <strong class="fa fa-stack-2x ">4</strong>                       
                        </span>  
                                    </div>
                                    <p class="text-default">
                                        <small>
                                            Form Four   <strong>( CSEE )</strong>
                                        </small>
                                    </p>
                                </div>
                                <div class="col-6 col-md-6" onclick="centerhistoryyear('` + page + `','acsee');" data-dismiss="modal"
                                aria-label="Close">
                                    <div class="icon icon-50 rounded-circle mb-1 bg-default-light text-default">
                                        <span class="fa fa-stack"> 
            <strong class="fa fa-stack-2x ">6</strong>                       
                        </span>  
                                    </div>
                                    <p class="text-default">
                                        <small>
                                             Form Six  <strong>( ACSEE )</strong>
                                        </small>
                                    </p>
                                </div>
                                 </div>
                        </div>
                   `;
				  if (page == "info") { 
					  answfooter = `<b>Centre Info:</b> <br> Shows you the <b>Number of Candidates Examed</b> and their <b>Performance</b> in <b>Graph</b> for the selected year.`;
				  }
				  else if (page == "history") {
					  answfooter = "<b>Centre History:</b> <br> Shows you the <b>Number of Candidates Examed</b> and their <b>Performance</b> in <b>Graph</b> For Five ( 5 ) years from selected year.";
				  }
				  else if (page == "compare") {
					  answfooter = "<b>Centre Compare:</b> <br> Here you compare two Exam Centres and get to see their <b>Number of Candidates Examed</b> and their <b>Performance</b> in <b>Graph</b> for the selected year.";
				  }
				  else {
					  answfooter = "";
				  }
		//answfooter = ` <p Class="modal-text text-default   pt-0 pb-0"><small>  ` + answfooter + `</small></p> `;

answfooter = `<style> 
                    .tooltip-inner {
                    min-width: 100px;
                    max-width: 300px; 
                    align: center;
                    text-align: left; 
                    }
                    </style>
					<div class="icon icon-40 rounded-circle mb-1 bg-default-light text-default" data-toggle="tooltip" data-placement="bottom" data-html="true" title="" data-original-title="<p Class='modal-text pt-0 pb-0'><small>  ` + answfooter + `</small></p>"> <span class="fa fa-info "> </span></div>`;		
		$("#centertrackdetail").html(answ);
		$("#centertrackdetailfooter").html(answfooter);
		$("#centertrack").modal("show"); 
}


function  centerhistoryyear(page, level){
   if (level == "csee"){
       limit = 2003;
   }
   else if (level == "acsee"){
       limit = 2005;
   }
   else if (level == "sfna"){
       limit = 2015;
   }
   else if (level == "psle"){
       limit = 2014;
   }
   else {
       limit = 2020;
   }
   current = new Date().getFullYear();
   years = "";
   for (lup = current ; lup >= limit; lup--){
 years += `<div class="col-3 col-md-3 mb-3" onclick="historycentername('`+page+`','`+level+`', '` + lup +`');" data-dismiss="modal"aria-label="Close">
            <div class="icon icon-60 rounded-circle mb-1 bg-default-light text-default">
                <span class="fa fa-calendar fa-2x">
                     
                </span>
            </div>
            <p class="text-secondary">
                <small>
                   <strong> ` + lup +`  </strong>
                </small>
            </p>
        </div>`;
   }
    $("#candidateyearavailable").html(years);
     $("#candidateyear").modal("show");
}

function historycentername(page, level, year) {
    swal.mixin({
        input: 'text',
        confirmButtonText: 'Next',
        showCancelButton: true,
        progressSteps: ['1'],
        padding: '2em',
    }).queue([ 
        {
        title: 'Center Name',
        text: 'Eg: Dakawa'
    } 
    ]).then(function (result) {
        if (result.value) { 
			changepage("search", "centerold&page2=" + page + "&level=" + level + "&year=" + year + "&school=" + result.value[0]);
          }
    })
}


function centeroldnamelist (page, level, year, name){        
        output = `  <div class="container mt-3 mb-4 text-center"> 
            <h3 class="text-white">`+name.toString().toUpperCase()+`</h3>
                                <p class="text-white mb-4">Search Results...</p>
        </div> 
<div class="card container ">
    <div class="card-body">
                <div class="row layout-spacing layout-top-spacing">
                    <div class="col-lg-12"> 
                     <div class="input-group mb-1">
                                    <input type="text" id="searchin" class="form-control" placeholder="Centre Name..." aria-label="Centre Name...">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button" onclick="changepage('search', 'centerold&page2=` + page +`&level=` + level + `&year=` + year + `&center='+$('#searchin').val());">Search</button>
                                    </div>
                                </div>
                                    <table id="data-table" class="table style-3 table-hover non-hover text-default text-strong">
                                          <tbody>`;
                                         
	if (page == "info"){
		homepage = "cinfo";
	}
	else if (page == "history") {
		homepage = "history";
	}
	else if (page == "compare") {
		homepage = "compare";
	}
	else {
		homepage = "";
	} 
        var regex = new RegExp(name, "i"); 
		
        if (level == "csee"){
               schoolname = cseename;
            }
            else if (level == "acsee"){
                schoolname = acseename;
            }
            else if (level == "psle"){
                schoolname = []; 
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});

            }
            else if (level == "sfna"){
                schoolname = [];
				$.ajax({
					url: mylink +'primaryinfo.php?s=' + name + '&b=name&y=' + year + '&l=' + level,
					dataType: 'json', 
					async: false,
					success: function (datavs, status, xhr) { 
					schoolname = datavs;
				   }
				});
            }
        for(l = 0; l< schoolname.length; l++){
            if ((schoolname[l].name.search(regex) != -1)) { 
                if (level == "psle" || level == "sfna") {
					schoolname[l].no = schoolname[l].code;
				}
				if (page == "compare") {
					output += ` <tr  onclick="searchcompare('`+ level+`','`+year+`','`+ schoolname[l].no +`');" > `;
				}
				else {
					output += ` <tr onclick="changepage('info', '` + homepage +`&year=`+year+`&school=`+schoolname[l].no +`&level=`+ level+`');" > `;
				}
				output += `<td class="user-name  align-self-center "><strong> ` + schoolname[l].name + `</strong>`;
				if (level == "psle" || level == "sfna") {
					output += ` 
					<br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> Centre Code:  - ` + schoolname[l].code + ` </i></small>
					<br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> ` + schoolname[l].region + ` - ` + schoolname[l].district + `  </i></small> `;
				}
				else {
					output += ` <br class=" pt-0 pb-0"> <small class="text-gray pt-0 pb-0"> <i> Centre Code:  - ` + schoolname[l].no + ` </i></small> `;
				}
				output += `</td> <td class="text-center   no-gutters justify-content-center"> <div class="icon icon-50 rounded-circle  bg-default-light text-default">    <span class="fa fa-university fa-lg">    </span>  </div>  </td> </tr> `; 
            }  
        }
        
        output += ` </tbody>
                   </table>  
                    </div>
                    </div>
                    </div>
                </div>`;
            $("#datacontent").html(output);  
        
    
}


switch (pagename)   {
	case "school": 
		
	var level = getURLParameters("level");
	var school = getURLParameters("school");
	var year = getURLParameters("year"); 
	
	info(year, school,'', level , '');
	break
	
	case "centernames":
	var level = getURLParameters("level");
	var school = getURLParameters("center");
	var year = getURLParameters("year"); 
	
	centernamelist(level, year, school);
	break
	
	case "history":
	var level = getURLParameters("level");
	var school = getURLParameters("school");
	var year = getURLParameters("year");  
	history(level, year, school);
	
    clearshow("resultsfooter");  
	break
	
	case "cinfo":
	var level = getURLParameters("level");
	var school = getURLParameters("school");
	var year = getURLParameters("year");  
	historyinfo(level, year, school);
	
    clearshow("resultsfooter");  
	break
	
	case "compare":
	var level = getURLParameters("level");
	var school = getURLParameters("school");
	var year = getURLParameters("year");  
	var comparewith = getURLParameters("compare");  
	compare(level, year, school, comparewith);
	clearshow("resultsfooter");  
	break
	
	case "centerold":
	var level = getURLParameters("level");
	var school = getURLParameters("school");
	var year = getURLParameters("year");  
	var page = getURLParameters("page2");  
	
	centeroldnamelist(page, level, year, school);
	  
	clearshow("resultsfooter");  
	break
	
	default:
	pages(pagename);
	
}   
 