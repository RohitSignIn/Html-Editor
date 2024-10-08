import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";

function App() {

  var editor = grapesjs.init({
    container: '#gjs',
    components: '<div class="txt-red">Hello world!</div>',
    style: '.txt-red{color: red}',
  });


  return (
    <>
      <div id="gjs">
        <h1>Hello World Component!</h1>
      </div>
      <div id="blocks"></div>
    </>
  );
}

export default App;
