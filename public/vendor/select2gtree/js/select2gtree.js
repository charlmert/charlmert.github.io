/*
The MIT License

Copyright (c) 2017 Charl Joseph Mert, Inc. http://charl.faceclues.co.za/select2gtree/

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

(function($) {
	$.fn.select2gtree = function(options) {
		var defaults = {
			language: "en",
			theme: "bootstrap",
			showUseButton: true,
			showBreadcrumb: true
		};

		//DONE: fix back button not going back to root when selecting a 2nd level child and clicking back twice
		//DONE: fix speed issue, back button child select
		//TODO: fix back button on nested default selected
		//TODO: scroll to selected item
		//TODO: add showBreadcrumb option
        //TODO: demo templateResult styling
        //TODO: enable multi select
        //TODO: option to display breadcrumbs in main input text box
        //TODO: support ajax loaded menu items
        //DONE: set_selected from js via $('timezone').val(1).change();

        var opts = $.extend(defaults, options);

		$(this).each(function() {

			if ($('body').data('select2gtree_instance_count') == undefined) {
				$('body').data('select2gtree_instance_count', 0);
			} else {
				$('body').data('select2gtree_instance_count', $('body').data('select2gtree_instance_count') + 1);
			}

			instance_count = $('body').data('select2gtree_instance_count');
			open_counter[instance_count] = 0;

			$(this).data('select2gtree_id', instance_count);

            if (opts.setSelected !== undefined) {
                set_selected(this, opts.setSelected);
            }
		});

		instance_id = $(this).data('select2gtree_id');
		if (open_counter[instance_id] == 0) {
            $(this).data('options', opts);
            //$(this).select2(opts);

            $(this).select2(opts).on("select2:open", open);

            select2_obj = $(this).data('select2');
            select2_core(this);

            //console.log(jQuery._data( $(this).get(0), "events" ));
        }
	};

    var instance_count = 0;
    var display_ids = [];
    var parent_ids = [];
    var parent_idsx = [];
    var select_ptr = null;
    var open_counter = [];
    var breadcrumb = [];
    var breadcrumb_texts = [];
    var selectOriginalEvent = null;
    var select2_obj = null;
    var prev_selected_text = null;
    var selected_text = null;
    var target_id = null;

    function select2_core(obj) {
        //console.log(select2_obj);
        var opts = $(obj).data('options');

        select2_obj.on('select', function (e) {
            if (opts.showBreadcrumb) {
                clear_breadcrumbs();
                $('#' + target_id).text(selected_text);
            }
        });

        select2_obj.on('close', function (params) {
            if (opts.showBreadcrumb) {
                clear_breadcrumbs();
                $('#' + target_id).text(prev_selected_text);
            }
        });

        /*
        select2_obj.on('open', function (params) {
            console.log('open:message [' + params + ']');
        });

        select2_obj.$container.trigger('results:message', {
          message: 'noResults' 
        });

        console.log(select2_obj.results);
        //*/
    }

    //TODO: decorate and bind elements once
	function open() {
        var opts = $(this).data('options');

		instance_id = $(this).data('select2gtree_id');
        $('.select2-search').css('display', 'block');
        $('.select2-results').css('display', 'block');

        select_id = $(this).attr('id');
        target_id = 'select2-' + select_id + '-container';
        prev_selected_text = $('#' + target_id).attr('title');

        select_ptr = this;
        $(this).children().each(function(i, o){
            parent_ids.push({
                id : $(o).attr('value'),
                parent_id: ($(o).attr('parent'))? $(o).attr('parent') : null,
                selected: ($(o).attr('selected'))? true : false
            });
        });

		if (open_counter[instance_id] == 0) {
            // Breadcrumb
            /*
            if (opts.showBreadcrumb) {
                if ($('.select2gtree-breadcrumb')) {
                    $('.select2gtree-breadcrumb').remove();
                }
                $('.select2').prepend('<div class="select2gtree-breadcrumb"></div>');
                $('.select2gtree-breadcrumb').hide('fast');
                $('.select2gtree-breadcrumb').text('');
            }
            */

            // Back button
			$('.select2-search').append('<div id="select2tree_back_container" class="input-group"><span id="select2tree_back" class="btn btn-default input-group-addon"> <i class="fa fa-angle-left"> </i> </span> </div>');
			$('.select2-search__field').appendTo('#select2tree_back_container');
            $('.select2-search').find('input').addClass('form-control');
            $('.select2-search').find('input').removeClass('select2-search__field');
            $('.select2-search').find('input').css('border-radius-left', '0px');

			$('#select2tree_back').unbind('mousedown');
			$('#select2tree_back').on('mousedown', function(){
				parent_id = breadcrumb.pop();

                if (opts.showBreadcrumb) {
                    breadcrumb_texts.pop();
                    update_breadcrumb(breadcrumb_texts);
                }

				//console.log(breadcrumb);

				open_children(parent_id);
			});

        }

        $(this).children().each(function(i, o) {
            if (!$(o).attr('parent') || $(o).attr('parent') == '' || $(o).attr('parent') == '0') {
                ////console.log($(o).text());
                ////console.log($(o).val());
                display_ids.push($(o).val());
            }
        });

		setTimeout(function() {

            $(".select2-results__options li").each(function() {
                id = $(this).attr('id');

                var parent_id;
                var text;
                if (typeof $(this).data('data') !== undefined && typeof $(this).data('data').element !== undefined) {
                    parent_id = $($(this).data('data').element).attr('parent')
                    text = $($(this).data('data').element).text();
                } else {
                    return;
                }

                if (opts.showBreadcrumb) {
                    $(this).on('mouseover', function() {
                        breadcrumb_texts.push(text);
                        update_breadcrumb(breadcrumb_texts);
                        selected_text = text;
                    });

                    $(this).on('mouseout', function() {
                        breadcrumb_texts.pop();
                        update_breadcrumb(breadcrumb_texts);
                        selected_text = '';
                    });
                }

                if (id && id.match(/-\d*$/) && display_ids.indexOf(id.match(/-\d*$/)[0].replace('-','')) > -1) {

					if (has_children(id.match(/-\d*$/)[0].replace('-',''))) {
                        if (opts.showBreadcrumb) {
                            if ($('.select2gtree-breadcrumb')) {
                                $('.select2gtree-breadcrumb').show('fast');
                            }
                        }

                        //TODO: callback to decorate bold items
						//$(this).decorateBold($this);
						////console.log($(this).text());
						$(this).css('font-weight', 'bold');

                        // use button
                        if (opts.showUseButton) {
                            $(this).data('mouseover_counter', 0);
                            var item = $(this);
                            $('#' + id).off('mouseover.s2gt_use');
                            $('#' + id).on('mouseover.s2gt_use', function() {
                                $(this).data('mouseover_counter', $(this).data('mouseover_counter') + 1);
                                if ($(this).data('mouseover_counter') == 1) {
                                    $(this).append('<span id="' + id + '_use" class="btn btn-default pull-right" style="width:30%; margin:0px; padding: 0px">Use</span>');

                                    $('#' + id + '_use').off('mousedown.s2gt_use');
                                    $('#' + id + '_use').on('mousedown.s2gt_use', function(e) {
                                        //console.log('mousedown: click: button use');

                                        $('#' + id + '_use').remove();
                                        select(item);

                                        e.preventDefault();
                                        e.stopPropagation();
                                    });
                                }
                            });
                            $('#' + id).off('mouseleave.s2gt_use');
                            $('#' + id).on('mouseleave.s2gt_use', function() {
                                $(this).data('mouseover_counter', 0);
                                $('#' + id + '_use').remove();
                            });
                        }

                        $(this).off('mouseup.s2gt_treeitem');
                        $(this).on('mouseup.s2gt_treeitem', function(e) {
                            var id = $(this).attr('id').match(/-\d*$/)[0].replace('-','');

                            $(this).css('display', 'none');
                            $(this).css('visibility', 'hidden');

                            breadcrumb.push(parent_id);

                            if (opts.showBreadcrumb) {
                                breadcrumb_texts.push($(this).text());
                                update_breadcrumb(breadcrumb_texts);
                            }

                            open_children(id);
							e.preventDefault();
							e.stopPropagation();
                        });
					} else {

                        $(this).off('mouseup.s2gt_treeitem');
                        $(this).on('mouseup.s2gt_treeitem', function(e) {
                            var id = $(this).attr('id').match(/-\d*$/)[0].replace('-','');

                            $(this).css('display', 'none');
                            $(this).css('visibility', 'hidden');

                            select(this);
                        });
                    }

                } else {
                    $(this).css('display', 'none');
                    $(this).css('visibility', 'hidden');
                }

                // Scroll to selected
                /*
                for (x = 0; (x < parent_ids.length); x++) {
                    if (id && parent_ids[x].id == id.match(/-\d*$/)[0].replace('-','')) {
                        if (parent_ids[x].selected) {
                            console.log("$('#" + id + "').offset().top");
                            console.log($(this).offset());
                            console.log($('.select2-results__options').outerHeight(false));
                            $('.select2-results__options').animate({
                                scrollTop: $(this).offset().top - $('.select2-results__options').outerHeight(false) - 55
                            }, 1);
                        }
                    }
                }
                */

            });

        }, 0);

        open_counter[instance_id]++;
	}

	function open_children(parent_id) {
        orig_id = $(this).attr('id');
        select_id = orig_id.replace(/select2-(.*)-result-.*$/, '$1');

        var opts = $('#' + select_id).data('options');

		if (parent_id == undefined) {
			parent_id = 0;
		}

        $(".select2-results__options li").each(function() {
            $(this).css('display', 'none');
            $(this).css('visibility', 'hidden');
        });

        $(".select2-results__options li").each(function() {
            id = $(this).attr('id');

            var c_parent_id;
            var c_id;
            if (typeof $(this).data('data') !== undefined && typeof $(this).data('data').element !== undefined) {
                c_parent_id = $($(this).data('data').element).attr('parent')
                c_id = $($(this).data('data').element).attr('parent')
            } else {
                return;
            }

            if (id && id.match(/-\d*$/) && c_parent_id == parent_id) {
                if (has_children(id.match(/-\d*$/)[0].replace('-',''))) {
                    $(this).css('font-weight', 'bold');

                    //TODO: callback to decorate bold items
                    //$(this).decorateBold($this); 
                    ////console.log($(this).text());
                    $(this).css('font-weight', 'bold');

                    // use button
                    if (opts.showUseButton) {
                        $(this).data('mouseover_counter', 0);
                        var item = $(this);
                        $('#' + id).off('mouseover.s2gt_use');
                        $('#' + id).on('mouseover.s2gt_use', function() {
                            $(this).data('mouseover_counter', $(this).data('mouseover_counter') + 1);
                            if ($(this).data('mouseover_counter') == 1) {
                                $(this).append('<span id="' + id + '_use" class="btn btn-default pull-right" style="width:30%; margin:0px; padding: 0px">Use</span>');

                                $('#' + id + '_use').off('mousedown.s2gt_use');
                                $('#' + id + '_use').on('mousedown.s2gt_use', function(e){
                                    //console.log('mousedown: click: button use');

                                    $('#' + id + '_use').remove();
                                    select(item);

                                    e.preventDefault();
                                    e.stopPropagation();
                                });
                            }
                        });
                        $('#' + id).off('mouseleave.s2gt_use');
                        $('#' + id).on('mouseleave.s2gt_use', function() {
                            $(this).data('mouseover_counter', 0);
                            $('#' + id + '_use').remove();
                        });
                    }

                }

                $(this).css('display', 'block');
                $(this).css('visibility', 'visible');

                $(this).off('mouseup.s2gt_treeitem');
                $(this).on('mouseup.s2gt_treeitem', function(e) {
                    var cid = $(this).attr('id').match(/-\d*$/)[0].replace('-','');
                    var cparent_id = get_parent_id(cid);
                    breadcrumb.push(cparent_id);

                    if (opts.showBreadcrumb) {
                        breadcrumb_texts.push($(this).text());
                        update_breadcrumb(breadcrumb_texts);
                    }

                    if (has_children(cid)) {
                        open_children(cid);
                        e.preventDefault();
                        e.stopPropagation();
                    } else {
                        // Default select handler will handle this
                        //select(this);
                    }
                });
            }
        });

	}

    function get_parent_id(id) {
        for (x = 0; (x < parent_ids.length); x++) {

            if (id && parent_ids[x].id == id) {
                return parent_ids[x].parent_id;
            }
        }

        return null;
    }

    function has_children(parent_id) {
		var counter = 0;

        for (x = 0; (x < parent_ids.length); x++) {
            if (parent_ids[x].parent_id == parent_id) {
				return true;
            }
        }

        return false;
    }

    function count_children(id) {
		var counter = 0;
		parent_id = get_parent_id(id);

        for (x = 0; (x < parent_ids.length); x++) {
            if (id && parent_ids[x].parent_id == parent_id) {
				counter++;
            }
        }

        return counter;
    }

    function select(obj) {
        orig_id = $(obj).attr('id');
        target_id = orig_id.replace(/select2-(.*)-result-.*$/, 'select2-$1-container');

        select_id = orig_id.replace(/select2-(.*)-result-.*$/, '$1');
        value = orig_id.match(/-\d*$/)[0].replace('-','');

        $('#' + select_id).val(value);

        // that prints 'select2-timezone-result-h70q-253_use'
        // if for 'select2-test' becomes 'select2-test-select2-container'
        $('#' + target_id).attr('title', $(obj).text());
        $('#' + target_id).text($(obj).text());

        // from new select2 impl
        $('.select2-selection').attr('aria-expanded', 'false');
        $('.select2-selection').attr('aria-hidden', 'true');
        $('.select2-selection').removeAttr('aria-activedescendant');

		// bug with more than one select tree in view, need to clean up the previous search div
		// search and back button for 1st select list displays when 2nd select list opened
		if ($('.select2-container.select2-container--bootstrap.select2-container--open')[1]) {
			$('.select2-container.select2-container--bootstrap.select2-container--open')[1].remove()
		}

        $('.select2-search').css('display', 'none');
        $('.select2-results').css('display', 'none');

        $('.select2').removeClass('select2-container--open');
        $('.select2').addClass('select2-container--below');

        clear_breadcrumbs();
    }

    function set_selected(obj, val) {
        select_id = $(obj).attr('id');
        target_id = 'select2-' + select_id + '-container';

        $('#' + select_id).val(val);
        $('#' + target_id).attr('title', $('#' + select_id).text());
        $('#' + target_id).text($('#' + select_id).text());

        clear_breadcrumbs();
    }

    function update_breadcrumb(breadcrumb_texts) {
        if (breadcrumb_texts.length > 0) {
            $('#' + target_id).text(breadcrumb_texts.join(' / '));
        } else {
            $('#' + target_id).text(prev_selected_text);
        }
    }

    function clear_breadcrumbs() {
        breadcrumb = [];
        breadcrumb_texts = [];
    }
})(jQuery);
