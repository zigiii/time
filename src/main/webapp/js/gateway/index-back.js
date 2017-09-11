
window.emojiPicker = new EmojiPicker({
  emojiable_selector: '[data-emojiable=true]',
  assetsPath: '../../components/emoji-picker-master/lib/img/',
  popupButtonClasses: 'fa fa-smile-o'
});

window.emojiPicker.discover();

$('#learnId').click(function(){
	var value = $('#inputId').val();
	console.log($('#inputId'));
	console.log($('#inputId').val());
	//alert(value);
});

function getJumbotron(){
	alert($('#jumbotronId'))
}