# jquery-inputs plugin

jquery-inputs is a stateless jQuery plugin that allows JSON set/get on HTML forms

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
		<label><input type="radio" name="demo_radio" value="2" />2</label>

		<label><input type="checkbox" name="demo_checkbox" value="1" checked="checked" />1</label>
		<label><input type="checkbox" name="demo_checkbox" value="2" checked="checked" />2</label>

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

## Todo

* Support a variety of naming conventions, e.g., demo_text, demo.text, and demo[text] will all be treated as synonymous references to the same value
* Unit tests

## Author

[Denny Shimkoski](http://twitter.com/dennyshim)

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2011, Denny Shimkoski (denny.webdev -[at]- gmail -[dot]- com)