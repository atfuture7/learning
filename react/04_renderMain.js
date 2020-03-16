if (1) {
	class Hello extends React.Component {
		render() {
			return "<h1>Hello World!</h1>";
		}
	}
	var item = new Hello();
	ReactDOM.render( item.render(), document.getElementById('textFrame'));
} else {
	document.getElementById("textFrame").innerHTML = "123";
}
