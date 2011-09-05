/*
 * jquery-inputs is a jQuery plugin that allows set/get on form inputs using hierarchical JSON structures
 *
 * For usage and examples, visit: http://github.com/dshimkoski/jquery-inputs/
 *
 * MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Denny Shimkoski (denny.webdev -[at]- gmail -[dot]- com )
 */
 (function($, undefined){
	
	var methods = {
		set: function(values) {
			
			// jquery form (technically could be any element with nested inputs)
			var $form = $(this);
			
			// scope for processInput() writes
			var scope = {};
			
			// loop through form inputs
			$form.find(':input[name]').each(function(){
				
				// jquery input
				var $input = $(this);
				
				// reference value structure
				var lookup = values;
				
				// set update flag to true
				var update = true;
				
				// clear input
				clearInput( $input );
				
				// array of keys representing fully qualified value in json tree
				var keys = processInput( $input.attr('name'), null, scope );
				
				// use keys for hierarchical lookup
				for( var i = 0, len = keys.length; i < len; i++ ) {
					var key = keys[i];
					// no need to hunt further
					if( !lookup[key] ) {
						// set update to false to indicate failed lookup
						update = false;
						break;
					}
					// drill down into value structure
					lookup = lookup[key];
				}
				
				// lookup succeeded
				if( update ) {
					
					//console.log('setting value', keys.slice(0, i + 1).join('_'), lookup);
					
					if( $input.is(':checkbox, :radio') ) {
						if( $.isArray(lookup) ) {
							for( var i = 0, len = lookup.length; i < len; i++ ) {
								$input.filter('[value='+lookup[i]+']').attr('checked', true);
							}
						} else {
							$input.filter('[value='+lookup+']').attr('checked', true);
						}
					} else {
						$input.val(lookup);
					}
					
				}
				
			});
			
		},
		get: function() {
			
			// scope for processInput() writes
			var scope = {};
			
			// serialize form values
			$.each($(this).serializeArray(), function(){
				// expands values in scope
				processInput( this.name, this.value, scope );
			});
			
			// scope will return value structure
			return scope;
			
		}
	};
	
	function clearInput($input) {
		
		if( $input.is(':checkbox, :radio') ) {
			$input.attr('checked', false);
		} else {
			$input.val('');
		}
		
	}
	
	function processInput(name, value, scope) {
		
		// keys used to build normalized name
		var keys = [];
		
		// index into name
		var p = 0;
		
		// current char
		var c;
		
		// key accumulator
		var key = '';
		
		// last scope
		var last;
		
		// loop over chars in var name
		while( c = name[p++] ) {
			
			switch( c ) {
				
				case ' ':
				case '_':
				case '.':
				case '[':
				case ']':
					
					// empty brackets
					if( c === ']' && !key.length ) {
						// generate key...
						key = 0;
						// find largest int index
						for( var j in scope ) {
							if( scope.hasOwnProperty(j) && j % 1 === 0 ) {
								key = Math.max( parseInt(j, 10) + 1, key );
							}
						}
					}
					
					// 0 index or key
					if( key === 0 || key ) {
						// save last scope
						last = {scope: scope, key: key};
						// push new scope if necessary
						if( scope[key] === undefined ) {
							scope[key] = {};
						}
						// descend into scope
						scope = scope[key];
						// push key
						keys.push(key);
					}
					
					// clear key
					key = '';
					
					break;
					
				default:
					
					// add char to key
					key += c;
					
			}
			
		}
		
		// leftover key from parse, e.g., key in form_key, form.key, and form[field].key
		if( key.length ) {
			// push key
			keys.push(key);
		} else {
			// form[key] requires us to backup since ] pushes new scope
			scope = last.scope;
			key = last.key;
		}
		
		// set value
		if( !scope[key] || $.isEmptyObject(scope[key]) ) {
			scope[key] = value;
		} else {
			if( !$.isArray(scope[key]) ) {
				scope[key] = [scope[key]];
			}
			scope[key].push(value);
		}
		
		return keys;
		
	}
	
	$.fn.inputs = function(method) {
		
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.inputs' );
		}
		
	};
	
})(jQuery);
