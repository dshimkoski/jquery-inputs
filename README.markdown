# jquery-inputs plugin

jquery-inputs is a jQuery plugin that allows set/get on form inputs using hierarchical JSON structures

## Form Element Names

Supports various naming conventions, e.g., demo_field_key, demo.field[key], and demo[field].key
will all be treated as synonymous references to the same value.

Empty brackets will automatically generate a 0-based index.

## Usage

Include jQuery and the plugin:

    <script src="jquery.inputs.js"></script>

Create a demo form:

	<form id="demo-form">

		<input type="text" name="demo_text" value="textval" />

		<textarea name="demo_textarea">textareaval</textarea>

		<select name="demo_select" multiple="multiple">
			<option value="option_a" selected="selected">Option A</option>
			<option value="option_b" selected="selected">Option B</option>
		</select>

		<label><input type="radio" name="demo_radio" value="1" />1</label>
		<label><input type="radio" name="demo.radio" value="2" />2</label>

		<label><input type="checkbox" name="demo_checkbox" value="1" checked="checked" />1</label>
		<label><input type="checkbox" name="demo[checkbox]" value="2" checked="checked" />2</label>

	</form>

Set/get values via javascript:

    <script>
      jQuery(document).ready(function($) {
		
        $('#demo-form').inputs('set', {
			demo: {
				text: 'text',
				textarea: 'text',
				radio: 2,
				checkbox: 2, // [1,2]
				select: ['option_a', 'option_b']
			}
		});
		
		console.log( $('#demo-form').inputs('get') );
		
      });
    </script>

See [QUnit tests](https://github.com/dshimkoski/jquery-inputs/blob/master/tests.html) for further examples.

## Author

[Denny Shimkoski](http://twitter.com/dennyshim)

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2011, Denny Shimkoski (denny.webdev -[at]- gmail -[dot]- com)