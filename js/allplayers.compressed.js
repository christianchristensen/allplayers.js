var allplayers=allplayers||{};(function(){allplayers.base=function(d,a){this.api=d;this.options=a};allplayers.base.prototype.log=function(d){console.log(d)}})(jQuery);allplayers=allplayers||{};
(function(d){allplayers.api=function(a){a=d.extend({api_path:"https://www.ttidwell.allplayers.com/api/v1/rest"},a);allplayers.base.call(this,null,a)};allplayers.api.prototype=new allplayers.base;allplayers.api.prototype.constructor=allplayers.api;allplayers.api.prototype.get=function(a,b,c){a=this.options.api_path+"/"+a;a+=b.uuid?"/"+b.uuid:"";a+=b.filter?"/"+b.filter:"";a+=".jsonp?";a+=b.query?jQuery.param(b.query)+"&":"";d.ajax({url:a,dataType:"jsonp",success:function(a,b){b=="success"?c(a):this.log("Error: "+
b)}})};allplayers.api.prototype.save=function(a,b,c){a=this.options.api_path+"/"+a;a+=b.uuid?"/"+b.uuid:"";a+=".json";d.ajax({url:a,dataType:"json",type:b.uuid?"PUT":"POST",data:b,success:function(a,b){b=="success"?c(a):this.log("Error: "+b)}})};allplayers.api.prototype.searchGroups=function(a,b){this.get("groups",{query:a},b)};allplayers.api.prototype.getGroup=function(a,b,c){this.get("groups",{uuid:a,query:b},c)};allplayers.api.prototype.saveGroup=function(a,b){this.log("Saving Group");this.log(a);
b(a)};allplayers.api.prototype.getGroupAlbums=function(a,b,c){this.get("groups",{uuid:a,query:b,filter:"albums"},c)};allplayers.api.prototype.getGroupEvents=function(a,b,c){this.get("groups",{uuid:a,query:b,filter:"events"},c)};allplayers.api.prototype.getGroupMembers=function(a,b,c){this.get("groups",{uuid:a,query:b,filter:"members"},c)};allplayers.api.prototype.getGroupPhotos=function(a,b){this.get("groups",{query:a,filter:"photos"},b)};allplayers.api.prototype.saveEvent=function(a,b){this.save("events",
a,b)}})(jQuery);allplayers=allplayers||{};(function(d){allplayers.entity=function(a,b){this.description=this.title=this.uuid="";allplayers.base.call(this,a,b)};allplayers.entity.prototype=new allplayers.base;allplayers.entity.prototype.constructor=allplayers.entity;allplayers.entity.prototype.update=function(a){d.extend(true,this,a)};allplayers.entity.prototype.getObject=function(){return{uuid:this.uuid,title:this.title,description:this.description}}})(jQuery);allplayers=allplayers||{};
(function(d){allplayers.date=function(a,b,c){this.newDate=function(a){return typeof a==="string"?new Date(a):typeof a==="Date"?a:new Date};this.date_start=this.newDate(a);this.date_end=this.newDate(b);this.repeat=c?{interval:c.interval?c.interval:1,freq:c.freq?c.freq:"DAILY",until:this.newDate(c.until),bymonth:c.bymonth?c.bymonth:[],bymonthday:c.bymonthday?c.bymonthday:[],byday:c.byday?c.byday:[],exdate:c.exdate?c.exdate:[],rdate:c.rdate?c.rdate:[]}:null};allplayers.date.prototype.update=function(a,
b,c){this.date_start=a?this.newDate(a):this.date_start;this.date_end=b?this.newDate(b):this.date_end;if(c)c.until=this.newDate(c.until),d.extend(this.repeat,c)};allplayers.date.prototype.addDate=function(a,b){b=this.newDate(b);this.repeat[a].push(b)};allplayers.date.prototype.addException=function(a){this.addDate("except",a)};allplayers.date.prototype.addRDate=function(a){this.addDate("rdate",a)};allplayers.date.prototype.getObject=function(){var a=0,b={date_start:this.date_start.toString(),date_end:this.date_end.toString()};
if(this.repeat){b.repeat={interval:this.repeat.interval,freq:this.repeat.freq,until:this.repeat.until.toString(),bymonth:this.repeat.bymonth,bymonthday:this.repeat.bymonthday,byday:this.repeat.byday,exdate:[],rdate:[]};for(a=this.repeat.exdate.length;a--;)b.repeat.exdate.push(this.repeat.exdate[a].toString());for(a=this.repeat.rdate.length;a--;)b.repeat.rdate.push(this.repeat.rdate[a].toString())}return b}})(jQuery);allplayers=allplayers||{};
(function(d){allplayers.event=function(a,b,c){this.gids=[];this.resources=[];this.category=c.category?c.category:"Other";this.competitors={};this.date_time=new allplayers.date(c.start,c.end);allplayers.entity.call(this,a,b);this.update(c)};allplayers.event.prototype=new allplayers.entity;allplayers.event.prototype.constructor=allplayers.event;allplayers.event.prototype.save=function(){this.api.saveEvent(this.getObject(),function(){console.log("Event Saved!!!")})};allplayers.event.prototype.update=
function(a){allplayers.entity.prototype.update.call(this,a);this.date_time.update(a.start,a.end)};allplayers.event.prototype.getObject=function(){return d.extend(allplayers.entity.prototype.getObject.call(this),{gids:this.gids,resources:this.resources,category:this.category,competitors:this.competitors,date_time:this.date_time.getObject()})}})(jQuery);allplayers=allplayers||{};
(function(){allplayers.group=function(d,a,b){this.location=new allplayers.location(d,a);this.list_in_directory=this.activity_level=0;this.active=false;this.secondary_color=this.primary_color=this.accept_amex=this.approved_for_payment=this.registration_fees_enabled="";this.node_status=0;this.url=this.uri=this.logo="";this.groups_above_uuid=[];allplayers.entity.call(this,d,a);this.update(b)};allplayers.group.prototype=new allplayers.entity;allplayers.group.prototype.constructor=allplayers.group;allplayers.group.prototype.save=
function(){this.api.saveGroup(this)}})(jQuery);allplayers=allplayers||{};
(function(){allplayers.groups=function(d,a){allplayers.base.call(this,d,a)};allplayers.groups.prototype=new allplayers.base;allplayers.groups.prototype.constructor=allplayers.groups;allplayers.groups.prototype.getGroups=function(d,a){this.api.getGroups(d,function(b){for(var c=[],d=b.length;d--;)c.push(new allplayers.group(this.options,this.api,b[d]));a(c)})};allplayers.groups.prototype.getGroup=function(d){this.api.getGroup(d,function(a){return new allplayers.group(this.options,this.api,a)})}})(jQuery);
allplayers=allplayers||{};(function(){allplayers.location=function(d,a){this.longitude=this.latitude=this.country=this.zip=this.state=this.city=this.street="";allplayers.entity.call(this,d,a)};allplayers.location.prototype=new allplayers.entity;allplayers.location.prototype.constructor=allplayers.location})(jQuery);allplayers=allplayers||{};
(function(d){var a={dialog:"#calendar-dialog-form"};allplayers.calendars={};if(!d.fn.allplayers_calendar)d.fn.allplayers_calendar=function(a){return d(this).each(function(){allplayers.calendars[d(this).selector]||new allplayers.calendar(d(this),a)})};allplayers.calendar=function(b,c){var g=this,c=d.extend(a,c,{header:{left:"prev,next today",center:"title",right:"month,agendaWeek,agendaDay"},editable:true,dayClick:function(a,b,c,d){console.log(a);console.log(b);console.log(c);console.log(d)},eventClick:function(a,
b,c){console.log(a);console.log(b);console.log(c)},eventDragStop:function(a){a.obj.update(a);a.obj.save()},eventResizeStop:function(a){a.obj.update(a);a.obj.save()},events:function(a,b,c){g.getEvents(a,b,c)}});this.dialog=d(c.dialog,b).hide();allplayers.calendars[c.id]=this;this.uuid="";this.api=new allplayers.api;b.fullCalendar(c)};allplayers.calendar.prototype.onEventClick=function(){console.log("Event has been clicked")};allplayers.calendar.prototype.getUUID=function(a){if(this.uuid)a.call(this);
else{var c=this;this.api.searchGroups({search:"Spring Soccer 2011"},function(d){c.uuid=d[0].uuid;a.call(c)})}};allplayers.calendar.prototype.getEvents=function(a,c,d){var e=a.getFullYear()+"-";e+=a.getMonth()+1+"-";e+=a.getDate();var f=c.getFullYear()+"-";f+=c.getMonth()+1+"-";f+=c.getDate();this.getUUID(function(){var a=this;this.api.getGroupEvents(this.uuid,{start:e,end:f,fields:"*",limit:0,offset:0},function(b){for(var c=b.length,e=null;c--;)e=new allplayers.event(a.api,a.options,b[c]),b[c].obj=
e;d(b)})})}})(jQuery);
