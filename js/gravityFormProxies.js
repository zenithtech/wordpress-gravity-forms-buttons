/*
 * Github: https://github.com/zenithtech/wordpress-gravity-forms-buttons
 */

window.gravityFormProxies = function(dropdowns, radios, checkboxes) {

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
                if(checkboxes) {
                    t.replaceCheckboxes(checkboxes);
                }

            },
            replaceDropdowns: function(el){
                if(el){
                    if(typeof el == 'string') {
                        element = el + ' .ginput_container_select';
                    }
                    if(typeof el == 'boolean') {
                        element = 'li.gfield .ginput_container_select';
                    }
                    if(typeof el == 'object') {
                        if(typeof el[0] == 'string' && typeof el[1] == 'number') {
                            element = el[0] + ' .ginput_container_select';
                        }
                        if(typeof el[0] == 'boolean') {
                            element = 'li.gfield .ginput_container_select';
                        }
                    }


                    jQuery(element).each(function(){
                        var t = this,
                            id = jQuery(this).parent().attr('id'),
                            target = jQuery(this).children('select').children('option'),
                            processEls = function(t, id, target){
                                var html = '',
                                    html_choices = '',
                                    select_id = jQuery(t).children('select').attr('id'),
                                    val = jQuery(t).children('select').val(),
                                    onchange = jQuery(t).attr('onchange') ? jQuery(t).attr('onchange') : '',
                                    select_value = jQuery('#'+select_id).val();

                                target.each(function(index){
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

                                jQuery(t).addClass('_proxy_hidden');
                                jQuery(t).parent().append(html);
                            }

                        if(typeof el == 'string') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'boolean') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'object') {
                            if(typeof el[0] == 'string' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                            if(typeof el[0] == 'boolean' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                        }

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
                        element = el + ' .ginput_container_radio';
                    }
                    if(typeof el == 'boolean') {
                        element = 'li.gfield .ginput_container_radio';
                    }
                    if(typeof el == 'object') {
                        if(typeof el[0] == 'string' && typeof el[1] == 'number') {
                            element = el[0] + ' .ginput_container_radio';
                        }
                        if(typeof el[0] == 'boolean') {
                            element = 'li.gfield .ginput_container_radio';
                        }
                    }

                    jQuery(element).each(function(){
                        var t = this,
                            id = jQuery(this).parent().attr('id'),
                            target = jQuery(this).children('ul.gfield_radio').children('li'),
                            processEls = function(t, id, target){
                                var html = '',
                                    html_choices = '';

                                target.each(function(){
                                    var dataVal = jQuery(this).children('input').val(),
                                        inputid = jQuery(this).children('input').attr('id'),
                                        choiceLabel = jQuery(this).children('label')[0].innerHTML,
                                        onclick = jQuery(this).children('input').attr('onclick') ? jQuery(this).children('input').attr('onclick') : '',
                                        checked = jQuery(this).children('input').attr('checked') && jQuery(this).children('input').attr('checked') == 'checked' ? 'checked="checked"' : '';

                                    html_choices += '\
                                    <div class="item" ' + checked + ' data-val="' + dataVal + '" data-inputid="' + inputid + '" data-onclick="' + onclick + '">\
                                        <div class="item_table">\
                                            <div class="item_cell">\
                                                <div class="item"></div>\
                                            </div>\
                                            <div class="item_cell">\
                                                <span class="text">' + choiceLabel + '</span>\
                                            </div>\
                                        </div>\
                                    </div>';
                                });
                                
                                html = '\
                                    <li id="' + id + '_proxy" class="gfield proxy_item" data-id="' + id + '">\
                                        <div class="ginput_container">\
                                            <div class="gfield_item">' + 
                                                html_choices +
                                            '</div>\
                                        </div>\
                                    </li>';

                                jQuery(t).addClass('_proxy_hidden');
                                jQuery(t).parent().append(html);
                            }

                        if(typeof el == 'string') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'boolean') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'object') {
                            if(typeof el[0] == 'string' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                            if(typeof el[0] == 'boolean' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                        }

                    });

                    jQuery('.gfield.proxy_item .item').on('click', function(){
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

            },
            replaceCheckboxes: function(el){
                if(el){
                    if(typeof el == 'string') {
                        element = el + ' .ginput_container_checkbox';
                    }
                    if(typeof el == 'boolean') {
                        element = 'li.gfield .ginput_container_checkbox';
                    }
                    if(typeof el == 'object') {
                        if(typeof el[0] == 'string' && typeof el[1] == 'number') {
                            element = el[0] + ' .ginput_container_checkbox';
                        }
                        if(typeof el[0] == 'boolean') {
                            element = 'li.gfield .ginput_container_checkbox';
                        }
                    }

                    jQuery(element).each(function(){
                        var t = this,
                            id = jQuery(this).parent().attr('id'),
                            target = jQuery(this).children('ul.gfield_checkbox').children('li'),
                            processEls = function(t, id, target){
                                var html = '',
                                    html_choices = '';

                                target.each(function(){
                                    var dataVal = jQuery(this).children('input').val(),
                                        inputid = jQuery(this).children('input').attr('id'),
                                        choiceLabel = jQuery(this).children('label')[0].innerHTML,
                                        onclick = jQuery(this).children('input').attr('onclick') ? jQuery(this).children('input').attr('onclick') : '',
                                        checked = jQuery(this).children('input').attr('checked') && jQuery(this).children('input').attr('checked') == 'checked' ? 'checked="checked"' : '';

                                    html_choices += '\
                                    <div class="item" ' + checked + ' data-val="' + dataVal + '" data-inputid="' + inputid + '" data-onclick="' + onclick + '">\
                                        <div class="item_table">\
                                            <div class="item_cell">\
                                                <div class="item"></div>\
                                            </div>\
                                            <div class="item_cell">\
                                                <span class="text">' + choiceLabel + '</span>\
                                            </div>\
                                        </div>\
                                    </div>';
                                });
                                
                                html = '\
                                    <li id="' + id + '_proxy" class="gfield proxy_checkbox" data-id="' + id + '">\
                                        <div class="ginput_container">\
                                            <div class="gfield_item">' + 
                                                html_choices +
                                            '</div>\
                                        </div>\
                                    </li>';

                                jQuery(t).addClass('_proxy_hidden');
                                jQuery(t).parent().append(html);

                            }

                        if(typeof el == 'string') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'boolean') {
                            processEls(t, id, target);
                        }
                        if(typeof el == 'object') {
                            if(typeof el[0] == 'string' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                            if(typeof el[0] == 'boolean' && typeof el[1] == 'number' && target.length == el[1]) {
                                processEls(t, id, target);
                            }
                        }

                    });

                    jQuery('.gfield.proxy_checkbox .item').on('click', function(){
                        if( typeof jQuery(this).attr('checked') == 'undefined' || 
                            jQuery(this).attr('checked') != 'checked'
                            ){

                            var inputid = jQuery(this).data('inputid'),
                                onclick = jQuery(this).data('onclick') ? "window." + jQuery(this).data('onclick') : false,
                                id = jQuery(this).parent().parent().parent().data('id');

                            jQuery('#'+id+' ul.gfield_checkbox li').each(function(){
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
