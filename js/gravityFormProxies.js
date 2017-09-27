/*
 * Github: https://github.com/zenithtech/wordpress-gravity-forms-buttons
 *
 * This is a jQuery-based script and CSS that enables customizing the interface of WordPress Gravity Form radio options and dropdown select fields
 * by creating proxy interfaces that convey the user choices to the original fields
 * and also trigger any related field rules that handle conditional logic.
 *
 * Usage: window.gravityFormProxies(
 * 		[string/boolean: either the classname of a target 'Drop Down' type Gravity form field, or a boolean to target all the fields 'Drop Down' type Gravity form fields],
 * 		[string/boolean: either the classname of a target 'Radio' type Gravity form field, or a boolean to target all 'Radio' type Gravity form fields]
 * 	);
 *
 * If you want to turn all dropdowns in to horizontal buttons, enter true, such as:
 * Example: window.gravityFormProxies(true);
 *
 * Or target a single dropdown by adding a 'Custom CSS Class' to a 'Drop Down' type Gravity form field to turn it into horizontal buttons:
 * Example: window.gravityFormProxies('.gfield.dropdown_buttons');
 *
 * You may also choose to only turn all radio buttons to custom horizontal buttons by adding a second value as true:
 * Example: window.gravityFormProxies(false, true);
 *
 * Or target a single radio group by adding a 'Custom CSS Class' to a 'Radio' type Gravity form field to turn it into horizontal buttons:
 * Example: window.gravityFormProxies(false, 'myVerticalRadios');
 *
 * Or turn all dropdowns and radio buttons into cutom horizontal buttons by passing both values as true:
 * Example: window.gravityFormProxies(true, true);
 *
 */

window.gravityFormProxies = function(dropdowns, radios) {

	var t = this;

	t.gfObj = Object.create({
			init: function(){

				var t = this;

				if(dropdowns) {
					t.replaceDropdowns(dropdowns);
				}
				if(radios) {
					t.replaceRadios(radios);
				}

			},
			replaceDropdowns: function(el){
				if(el){
					if(typeof el == 'string') {
						el = el + ' .ginput_container_select';
					}
					if(typeof el == 'boolean') {
						el = 'li.gfield .ginput_container_select';
					}
					jQuery(el).each(function(){
					    var html = '',
					        html_choices = '',
					        id = jQuery(this).parent().attr('id'),
					        select_id = jQuery(this).children('select').attr('id'),
					        val = jQuery(this).children('select').val(),
				            onchange = jQuery(this).attr('onchange') ? jQuery(this).attr('onchange') : '',
				            select_value = jQuery('#'+select_id).val();

					    jQuery(this).children('select').children('option').each(function(index){
					        var dataVal = jQuery(this).val(),
					        	selected = select_value == dataVal ? ' selected' : '',
					            choiceLabel = jQuery(this)[0].innerHTML;

					        html_choices += '\
					        <div class="item'+ selected + '" data-index="' + index + '" data-val="' + dataVal + '">\
					        	<div class="item_table">\
					        		<div class="item_cell">\
							            <span class="text">' + choiceLabel + '</span>\
						            </div>\
					            </div>\
					        </div>';
					    });
					    
					    html = '\
					        <li id="' + id + '_proxy" class="gfield proxy_select" data-id="' + id + '" data-onchange="' + onchange + '">\
					            <div class="ginput_container">\
					                <div class="gfield_select" data-select_id="' + select_id + '">' + 
					                    html_choices +
					                '</div>\
					            </div>\
					        </li>';

						jQuery(this).addClass('_proxy_hidden');
						jQuery(this).parent().append(html);

					});

					jQuery('.gfield.proxy_select .item .text').on('click', function(){
						if(!jQuery(this).parent().parent().parent().hasClass('selected')){
							var val = jQuery(this).parent().parent().parent().data('val'),
								select_id = jQuery(this).parent().parent().parent().parent().data('select_id'),
								onchange = jQuery(this).parent().parent().parent().data('onchange') ? "window." + jQuery(this).parent().parent().parent().data('onchange') : false;

							jQuery('#'+select_id).val(val).change();
							jQuery(this).parent().parent().parent().siblings('.item').removeClass('selected');
							jQuery(this).parent().parent().parent().addClass('selected');

							if(onchange){
								eval(onchange);
							}
						}
					});

				} else {

					return false;

				}
			},
			replaceRadios: function(el){
				if(el){
					if(typeof el == 'string') {
						el = el + ' .ginput_container_radio';
					}
					if(typeof el == 'boolean') {
						el = 'li.gfield .ginput_container_radio';
					}
					jQuery(el).each(function(){
					    var html = '',
					        html_choices = '',
					        id = jQuery(this).parent().attr('id');

					    jQuery(this).children('ul.gfield_radio').children('li').each(function(){
					        var dataVal = jQuery(this).children('input').val(),
						        inputid = jQuery(this).children('input').attr('id'),
					            choiceLabel = jQuery(this).children('label')[0].innerHTML,
					            onclick = jQuery(this).children('input').attr('onclick') ? jQuery(this).children('input').attr('onclick') : '',
					            checked = jQuery(this).children('input').attr('checked') && jQuery(this).children('input').attr('checked') == 'checked' ? 'checked="checked"' : '';

					        html_choices += '\
					        <div class="item" ' + checked + ' data-val="' + dataVal + '" data-inputid="' + inputid + '" data-onclick="' + onclick + '">\
					        	<div class="item_table">\
					        		<div class="item_cell">\
							            <div class="radio"></div>\
						            </div>\
					        		<div class="item_cell">\
							            <span class="text">' + choiceLabel + '</span>\
						            </div>\
					            </div>\
					        </div>';
					    });
					    
					    html = '\
					        <li id="' + id + '_proxy" class="gfield proxy_radio" data-id="' + id + '">\
					            <div class="ginput_container">\
					                <div class="gfield_radio">' + 
					                    html_choices +
					                '</div>\
					            </div>\
					        </li>';

					    jQuery(this).addClass('_proxy_hidden');
					    jQuery(this).parent().append(html);

					});

					jQuery('.gfield.proxy_radio .item').on('click', function(){
						if( typeof jQuery(this).attr('checked') == 'undefined' || 
							jQuery(this).attr('checked') != 'checked'
							){

							var inputid = jQuery(this).data('inputid'),
								onclick = jQuery(this).data('onclick') ? "window." + jQuery(this).data('onclick') : false,
								id = jQuery(this).parent().parent().parent().data('id');

							jQuery('#'+id+' ul.gfield_radio li').each(function(){
								jQuery(this).children('input').removeAttr('checked');
							});
							jQuery('#'+inputid).attr('checked', 'checked');
							jQuery(this).siblings().removeAttr('checked');
							jQuery(this).attr('checked', 'checked');

							if(onclick){
								eval(onclick);
							}

						}
					});
				}

			}
		});

	t.gfObj.init();

}
