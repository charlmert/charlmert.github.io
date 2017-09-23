/*
The MIT License

Copyright (c) 2017 Charl Joseph Mert, Inc. https://github.com/charljmert/select2gtree

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
			showUseButton: true
		};

        //TODO: set_selected from js via $('timezone').val(1).change();
		//TODO: scroll to selected item
		//TODO: fix back button on nested default selected
        //TODO: add options for decorator callbacks
        //TODO: enable multi select
        //TODO: option to display breadcrumbs in main input text box
        //TODO: support ajax loaded menu items

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
            $(this).select2(opts).on("select2:open", open);
        }
	};

    var instance_count = 0;
    var display_ids = [];
    var parent_ids = [];
    var select_ptr = null;
    var open_counter = [];
    var breadcrumb = [];
    var selectOriginalEvent = null;

    //TODO: decorate and bind elements once
	function open() {
        var opts = $(this).data('options');

		instance_id = $(this).data('select2gtree_id');
        $('.select2-search').css('display', 'block');
        $('.select2-results').css('display', 'block');

        select_ptr = this;
        $(this).children().each(function(i, o){
            parent_ids.push({
                id : $(o).attr('value'),
                parent_id: ($(o).attr('parent'))? $(o).attr('parent') : null,
                selected: ($(o).attr('selected'))? true : false
            });
        });

		if (open_counter[instance_id] == 0) {
			$('.select2-search').append('<div id="select2tree_back_container" class="input-group"><span id="select2tree_back" class="btn btn-default input-group-addon"> <i class="fa fa-angle-left"> </i> </span> </div>');
			$('.select2-search__field').appendTo('#select2tree_back_container');
            $('.select2-search').find('input').addClass('form-control');
            $('.select2-search').find('input').removeClass('select2-search__field');
            $('.select2-search').find('input').css('border-radius-left', '0px');

			$('#select2tree_back').unbind('mousedown');
			$('#select2tree_back').on('mousedown', function(){
				parent_id = breadcrumb.pop();
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

                if (id && id.match(/-\d*$/) && display_ids.indexOf(id.match(/-\d*$/)[0].replace('-','')) > -1) {

					if (has_children(id.match(/-\d*$/)[0].replace('-',''))) {
                        //TODO: callback to decorate bold items
						//$(this).decorateBold($this); 
						////console.log($(this).text());
						$(this).css('font-weight', 'bold');

                        // use button
                        if (opts.showUseButton) {
                            $(this).data('mouseover_counter', 0);
                            var item = $(this);
                            $('#' + id).on('mouseover', function() {
                                $(this).data('mouseover_counter', $(this).data('mouseover_counter') + 1);
                                if ($(this).data('mouseover_counter') == 1) {
                                    $(this).append('<span id="' + id + '_use" class="btn btn-default pull-right" style="width:30%; margin:0px; padding: 0px">Use</span>');

                                    $('#' + id + '_use').on('mousedown', function(e){
                                        //console.log('mousedown: click: button use');

                                        $('#' + id + '_use').remove();
                                        select(item);

                                        e.preventDefault();
                                        e.stopPropagation();
                                    });
                                }
                            });
                            $('#' + id).on('mouseleave', function() {
                                $(this).data('mouseover_counter', 0);
                                $('#' + id + '_use').remove();
                            });
                        }

                        $(this).bind('mouseup', function(e) {
                            var id = $(this).attr('id').match(/-\d*$/)[0].replace('-','');

                            $(this).css('display', 'none');
                            $(this).css('visibility', 'hidden');

                            parent_id = get_parent_id(id);
                            breadcrumb.push(parent_id);

                            open_children(id);
							e.preventDefault();
							e.stopPropagation();
                        });
					} else {

                        $(this).bind('mouseup', function(e) {
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

            for (x = 0; (x < parent_ids.length); x++) {
                if (id && id.match(/-\d*$/) && parent_ids[x].id == id.match(/-\d*$/)[0].replace('-','') && parent_ids[x].parent_id == parent_id) {
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
                            $('#' + id).on('mouseover', function() {
                                $(this).data('mouseover_counter', $(this).data('mouseover_counter') + 1);
                                if ($(this).data('mouseover_counter') == 1) {
                                    $(this).append('<span id="' + id + '_use" class="btn btn-default pull-right" style="width:30%; margin:0px; padding: 0px">Use</span>');

                                    $('#' + id + '_use').on('mousedown', function(e){
                                        //console.log('mousedown: click: button use');

                                        $('#' + id + '_use').remove();
                                        select(item);

                                        e.preventDefault();
                                        e.stopPropagation();
                                    });
                                }
                            });
                            $('#' + id).on('mouseleave', function() {
                                $(this).data('mouseover_counter', 0);
                                $('#' + id + '_use').remove();
                            });
                        }

                        $(this).bind('mouseup', function(e) {
                            var id = $(this).attr('id').match(/-\d*$/)[0].replace('-','');

                            $(this).css('display', 'none');
                            $(this).css('visibility', 'hidden');

                            parent_id = get_parent_id(id);
                            breadcrumb.push(parent_id);

                            open_children(id);
                        });

					}

                    $(this).css('display', 'block');
                    $(this).css('visibility', 'visible');

                    $(this).bind('mouseup', function(e) {
                        var cid = $(this).attr('id').match(/-\d*$/)[0].replace('-','');
                        var cparent_id = get_parent_id(cid);
                        breadcrumb.push(cparent_id);
                        if (has_children(cid)) {
                            open_children(cid);
							e.preventDefault();
							e.stopPropagation();
                        } else {
                            //select(this);
                        }
                    });

                    break;
                }
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

    }

	//TODO: implement set_selected
    function set_selected(obj, val) {
        select_id = $(obj).attr('id');
        target_id = 'select2-' + select_id + '-container';

        $('#' + select_id).val(val);
        $('#' + target_id).attr('title', $('#' + select_id).text());
        $('#' + target_id).text($('#' + select_id).text());
    }

})(jQuery);
