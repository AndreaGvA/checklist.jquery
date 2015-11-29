// checklist.jquery - v1.3.1 - 2015-11-29 
//------------------------
// checklist.jquery.js
// @author AndreaG
//------------------------

//---------------------------------------------------------------------------------
// Copyright (c) 2015 Andrea Gava
//
//
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//---------------------------------------------------------------------------------

(function( $ ){
  "use strict";
  
  //private method checkbox
  //This method is used to check the checkboxes(and select)
  function checkbox($this, o){
    
    var $label, $checkbox, isSelected;
    //option firstCheckAll 
    //[1=checks all checkboxes] 
    //[2=checks only firs checkbox but works like all are checked - default option]
    //[false=normal behavior]
    
    //if option firstCheckAll==1
    if(o.firstCheckAll==1){
        
        $checkbox=$this.next("."+o.prefix+"checklist").find("li:not(:first-child) input[type=checkbox]");
        $this.next("."+o.prefix+"checklist").find("li:first-child input[type=checkbox]").change(function() {
            
            if($(this).is(":checked")){
                
                $this.find('option').each(function(){
                    $(this).attr("selected", "selected");
                });
                $this.next("."+o.prefix+"checklist").find("li:not(:first-child) input[type=checkbox]").each(function(){
                    $(this).prop("checked", true); 
                });
                $label=$this.next("."+o.prefix+"checklist").find("li:first-child").text();
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
                isSelected=true;
            } else {
                $this.find('option').each(function(){
                    $(this).removeAttr("selected");
                });
                $this.next("."+o.prefix+"checklist").find("input[type=checkbox]").each(function(){
                    $(this).prop("checked", false);
                });
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html("");
                isSelected=false;
            }
            
            //provides a callback for first element click and transports the select selector and a boolean for selected checkbox
            o.first($this, isSelected);
        });
    //else  if option firstCheckAll=2
    } else if(o.firstCheckAll==2){
        
        $checkbox=$this.next("."+o.prefix+"checklist").find("li:not(:first-child) input[type=checkbox]");
        
        $this.next("."+o.prefix+"checklist").find("li:first-child input[type=checkbox]").change(function() {
            isSelected=false;
            if(!$(this).is(":checked") && $checkbox.find(":checked").length === 0) {
                
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html("");
                isSelected=false;
            } else {
                $this.find('option:not(:first-child)').each(function(){
                    $(this).removeAttr("selected");
                });
                $this.next("."+o.prefix+"checklist").find("li:not(:first-child) input[type=checkbox]").each(function(){
                    $(this).prop("checked", false);
                });
                $label=$this.next("."+o.prefix+"checklist").find("li:first-child").text();
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
                isSelected=true;
            }
            //provides a callback for first element click and transports the select selector and a boolean for selected checkbox
            o.first($this, isSelected);
        }); 
    // else i define the normal behavior    
    } else {
        $checkbox=$this.next("."+o.prefix+"checklist").find("input[type=checkbox]");
    }
    
    // for each checkbox created 
    $checkbox.each(function(){
        // i listen when the checkbox change value
        $(this).change(function(){
            var $selector=$(this);
            var $value=$selector.val();
            
            
            // if the user checked the checkbox 
            if($selector.is(":checked")){
                $this.find('option[value="' + $value + '"]').attr("selected", "selected");
                // if is the first checkbox and the firstCheckAll option is set
                if(o.firstCheckAll==2 || o.firstCheckAll==1) {
                    $this.next("."+o.prefix+"checklist").find("li:first-child input[type=checkbox]").prop("checked", false);
                }
            // else if unchecked the checkbox
            } else {
                $this.find('option[value="' + $value + '"]').removeAttr("selected");
                 // if is the first checkbox and the firstCheckAll option is set
                if(o.firstCheckAll==2 || o.firstCheckAll==1) {
                    $this.next("."+o.prefix+"checklist").find("li:first-child input[type=checkbox]").prop("checked", false);
                }
            }
            
            //if i used some optgroups [does'nt work with the option checkedOnTop set to true]
            if(o.optgroup===true) {
                $label="";
                $this.next().find('input:checked').each(function(){
                    if($label!==""){
                        $label+=", "+$(this).parent().text();
                    } else {
                        $label+=$(this).parent().text();
                    }
                });
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
            //else if is a plain selectbox
            } else {
                $label="";
                $this.next().find('input:checked').each(function(){
                    if($label!==""){
                        $label+=", "+$(this).parent().text();
                    } else {
                        $label+=$(this).parent().text();
                    }
                });
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
            }
            //provides a callback for the change event, transports the checkbox selector and the checkbox value
            o.change($selector, $value);
        });
    });
  }
  
  //private method toggle
  //provides the checklist open/close behaviors
  function toggle($this, o) {
    //when the label or the toggle button is clicked
    $this.children("."+o.prefix+"toggle, ."+o.prefix+"label").click(function(){
        // if the checklist is visible it hides it
        if($this.children("."+o.prefix+"list").is(":visible")){
            $this.children("."+o.prefix+"list").fadeOut(function(){
                $this.children("."+o.prefix+"toggle").css("background", "url(img/v.png) no-repeat 3px 0px").css("backgroundSize", "contain");
                $("body").unbind("mouseup");
            });
        //else if the checklist is closed
        } else {
            //if the checkedOnTop option is set to true
            if(o.checkedOnTop===true){
                 // if the firstCheckAll option is set i first clone and remove the first li
                var first;
                if(o.firstCheckAll==2 || o.firstCheckAll==1) {
                    first=$this.find("li:first-child").clone();
                    $this.find("li:first-child").remove();
                }
                var li=$this.find("li");
                //than i sort the li's
                li.sort(function(a,b) {
                    var an = $(a).html().replace(/<(?:.|\n)*?>/gm, ''),
                        bn = $(b).html().replace(/<(?:.|\n)*?>/gm, '');
                    
                    if (an > bn) return 1;
                    else if (an < bn) return -1;
                    else return 0;
                });
                
                $this.find("ul").empty().append( li );
                
                //and move the selected checkboxes li's on top
                $this.find("li").each(function(){
                    if($(this).children('input').is(":checked")) {
                        var clone=$(this).clone();
                        $(this).remove();
                        clone.prependTo($this.find("ul"));
                    }
                });
                
                 // if the firstCheckAll option is set i prepend the first option cloned before
                if(o.firstCheckAll==2 || o.firstCheckAll==1) {
                    first.prependTo($this.find("ul"));
                }
                //finally i invoke the checkbox private method
                checkbox($this.prev("select"), o);
            }
            
            //open the checklist
            $this.children("."+o.prefix+"list").fadeIn(function(){
                $this.children("."+o.prefix+"toggle").css("background", "url(img/x.png) no-repeat 3px 0px").css("backgroundSize", "contain");
                $("body").on("mouseup",function(e){
                    var $cont=$this.children("."+o.prefix+"list");
                     if (!$cont.is(e.target) && $cont.has(e.target).length === 0) {
                        $cont.fadeOut(function(){
                            $("body").unbind("mouseup");
                        });
                    }
                });
            });
            
        } 
    });
  }
  
  //private method template
  //returns the checklist html template
  function template(o){
    var $tpl="<div class='"+o.prefix+"checklist'>";
    $tpl+="<div class='"+o.prefix+"label'>&nbsp;";
    $tpl+="</div>";
    $tpl+="<ul class='"+o.prefix+"list' >";
    $tpl+="</ul>";
    $tpl+="<div class='"+o.prefix+"toggle'>";
    $tpl+="</div>";
    $tpl+="</div>";
    return $tpl;
  }
  
  //private method checkboxTemplate
  //returns the li's with checkboxes html template
  function checkboxTemplate(name, value, label, isChecked){
    var $check;
    if(isChecked===true) $check="checked='checked'"; else $check="";
    var $tpl="<li>";
    $tpl+="<input type='checkbox' "+$check+" name='"+name+"' value='"+value+"' />";
    $tpl+=label;
    $tpl+="</li>";
    return $tpl;
  }
  //private method optgroupTemplate
  //returns the li's for optgrooup html template
  function optgroupTemplate(label, o){
    var $tpl="<li class='"+o.prefix+"group'>";
    $tpl+=label;
    $tpl+="</li>";
    return $tpl;
  }
  
  //private method remove
  //remove the checklist from the dom
  function remove($this, o){
    $this.next("."+o.prefix+"checklist").remove();
  }
  
  //The public methods object
  var methods = {
    //public method $().checklist(); (normal behavior)
    init : function(options) {  
        var o = $.extend({}, $.fn.checklist.defaults, options);
        
        return this.each(function() {
            var $this = $(this);
            //hides the selectbox
            $this.hide().attr('disabled', 'disabled');
            //insert the checlist after the checkbox
            var $tpl=template(o);
            $($tpl).insertAfter($this);
            //get the checklist selector
            var $that=$this.next("."+o.prefix+"checklist");
            //and pass it to the toggle private method invoking it
            toggle($that, o);
            
            //add the checkboxes to the checklist
            var $name=$this.attr("name");
            $this.find("option").each(function(){
                var $label=$(this).html();
                var $value=$(this).val();
                var isChecked;
                if($(this).is(":selected")) {
                    isChecked=true;
                } else {
                    isChecked=false;
                }
                $tpl=checkboxTemplate($name, $value, $label, isChecked);
                $that.children("ul").append($tpl);
                
            });
            var $label="";
            //if i used some optgroups [does'nt work with the option checkedOnTop set to true]
            if(o.optgroup===true) {
                $this.next().find('input:checked').each(function(){
                    if($label!==""){
                        $label+=", "+$(this).parent().text();
                    } else {
                        $label+=$(this).parent().text();
                    }
                });
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
            //else if is a plain selectbox
            } else {
                $this.next().find('input:checked').each(function(){
                    if($label!==""){
                        $label+=", "+$(this).parent().text();
                    } else {
                        $label+=$(this).parent().text();
                    }
                });
                $this.next("."+o.prefix+"checklist").find("."+o.prefix+"label").html($label);
            }
            //pass the select selector to the checkbox private method and invoke it
            checkbox($this, o);
            
            //if option optgroup is true insert the optgroup li's
            if(o.optgroup===true) {
                 $this.find("optgroup").each(function(){
                    var $label=$(this).attr("label");
                    $tpl=optgroupTemplate($label, o);
                    var $before=$(this).children("option:first-child").val();
                    var $ins=$this.next("."+o.prefix+"checklist").find('input[type=checkbox][value=' + $before + ']').closest("li");
                    $($tpl).insertBefore($ins);
                    
                 });
            }
        
          });
    },
    //public method destroy
    destroy : function(options) {
        var o = $.extend({}, $.fn.checklist.defaults, options);
        remove($(this), o);
        $("body").unbind("mouseup");
        $(this).show();   
        
    },
    //public method update
    update : function(options) { 
        var o = $.extend({}, $.fn.checklist.defaults, options);
        remove($(this), o);
        $("body").unbind("mouseup");
        return methods.init.apply( this, arguments );
    },
    //public method select
    select : function(value, options){
        var o = $.extend({}, $.fn.checklist.defaults, options);
        var $checkbox=$(this).next("."+o.prefix+"checklist").find('input[type=checkbox][value=' + parseInt(value) + ']');
        var $select=$(this).children('option[value=' + parseInt(value) + ']');
        
        if($select.is(":selected")) {
            $checkbox.prop("checked", false).trigger("change");
            $select.removeAttr("selected");
        } else { 
            $checkbox.prop("checked", true).trigger("change");
            $select.attr("selected", "selected");
        }
        
    },
    //public method unselectAll
    unselectAll: function(value, options) {
        var o = $.extend({}, $.fn.checklist.defaults, options);
        var $checkboxes=$(this).next("."+o.prefix+"checklist");
        var $that=$(this);
        $checkboxes.find("ul li").each(function(){
            $(this).find("input[type=checkbox]").prop("checked", false).trigger("change");
            var $val=$(this).find("input[type=checkbox]").val();
            var $select=$that.children('option');
            $select.removeAttr("selected");
        });
    }
  };
  
 
  //CHECKLIST MAIN METHOD AND METHOD SWITCH
  $.fn.checklist = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.checklist' );
    }    
    
  };
  
  //THE PLUGIN DEFAULT OPTIONS
  $.fn.checklist.defaults = {
      // the css prefix for the generated html
      prefix:"ckl-",
      // [false=normal behavior, 1=all checked, 2=only first checked but all selected]
      firstCheckAll:2,
      // the callback for first element click and transports the select selector and a boolean for selected checkbox
      first: function(/* this, isSelected */) { /* console.log(this, isSelected);*/ },
      // the selectbox uses optgroups (does'nt work with checkedOnTop)
      optgroup: true,
      // brings the checked elements on top
      checkedOnTop: true,
      //the callback for the change event, transports the checkbox selector and the checkbox value
      change: function(/* $checkbox, value*/){ /*console.log("value: "+ value);*/ }
  };

})( jQuery );