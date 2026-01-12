var modid;
var key;
jQuery(document).ready(function(){
var links = jQuery('a').each(function(){
  		if(this.id.substring(0,10)=='prevMonth-'){
  		        modid = this.id.substring(10);
			this.onclick = function(){month--; newDate(month,year,modid);}
			this.href='javascript:void(0)';
			}
		if(this.id.substring(0,10)=='nextMonth-'){
			this.onclick = function(){month++; newDate(month,year,modid);}
			this.href='javascript:void(0)';
			}
		if(this.id.substring(0,9)=='prevYear-'){
			modid= this.id.substring(9);
			this.onclick = function(){year--; newDate(month,year,modid);}
			this.href='javascript:void(0)';
			}
		if(this.id.substring(0,9)=='nextYear-'){
			this.onclick = function(){year++; newDate(month,year,modid);}
			this.href='javascript:void(0)';
			}
	     });
 }
);

function newDate(month,year,modid)
{               
		loadHtml  = "<div id='loadingDiv-"+modid+"' class='loadingDiv' style='position: absolute;top: 50%;right:50%;'>";
		loadHtml += "<img src='"+calendar_baseurl+"modules/mod_blogcalendar/img/loading.gif'></div>";
		jQuery('#calendar-'+modid).append(loadHtml);
	        jQuery("#tableCalendar-"+modid).fadeTo(200,0.2);
		if(month<=0){
		month+=12;
		year--;
		}
		if(month>12){
		month-=12;
		year++;
		}name: "Pete",
		jQuery.ajax({
                   url: location.href,
                   type: "POST",
                   data: {year : year, month : month, ajaxCalMod : 1, ajaxmodid : modid},
                   success: function(data){
				var start = data.indexOf('<!--calendar-'+modid+' start-->');
				var finish = data.indexOf('<!--calendar-'+modid+' end-->');
				jQuery('#calendar-'+modid).html(data.substring(start,finish));
				linkPrev = jQuery('#prevMonth-'+modid);
				linkNext = jQuery('#nextMonth-'+modid);
				linkPrevYear= jQuery('#prevYear-'+modid);
				linkNextYear= jQuery('#nextYear-'+modid);
				linkPrev.click(function(){month--; newDate(month,year,modid);});
				linkNext.click(function(){month++; newDate(month,year,modid);});
				linkPrevYear.click(function(){year--; newDate(month,year,modid);});
				linkNextYear.click(function(){year++; newDate(month,year,modid);});
				jQuery.each([linkNext,linkPrev,linkNextYear,linkPrevYear],function(i,v){this.attr("href","javascript:void(0)");});
                            }
		});
	}